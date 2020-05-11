import {takeLatest, call, put, all} from 'redux-saga/effects'
import {UserActionTypes} from "./user.types"
import {auth, googleProvider, createUserProfileDocument, getAuthenticatedUser} from "../../firebase/firebase-utils"
import {signFailure, signOutSuccess, signSuccess, signUpFailure, signUpSuccess} from "./user.actions"


export function* getSnapShotAndStoreUserState (userAuth){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const snapShot = yield userRef.get()
        yield put(signSuccess(snapShot.data()))
    }catch (e) {
        yield put(signFailure(e))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotAndStoreUserState(user)
    }catch (error) {
        yield put(signFailure(error))
    }
}

export  function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}
export function* signInWithEmailAndPassword({payload: {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotAndStoreUserState(user)
    }catch (e) {
       yield  put(signFailure(e.message))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmailAndPassword )
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getAuthenticatedUser()
        if(!userAuth) {
            return
        }
        yield getSnapShotAndStoreUserState(userAuth)
    }catch (e) {
        yield put(signFailure(e))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch (e) {
        yield put(signFailure(e))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser)
}

export function* signUpUser({payload: {email, password, confirmPassword, displayName}}){
    if(password !== confirmPassword){
        alert('Passwords do not match')
    }
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)
        const userRef = yield call(createUserProfileDocument, user, {displayName})
        const snapShot = yield userRef.get()
        yield put(signUpSuccess(snapShot.data()))

    }catch (e) {
        yield  put(signUpFailure(e.message))
    }
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUpUser)
}

export default function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),

    ])
}
