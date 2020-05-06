import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA9A_TJtuVh_KOpX86G-o4r2xI4ZPQT_Ks",
    authDomain: "bright-s-ecommerce.firebaseapp.com",
    databaseURL: "https://bright-s-ecommerce.firebaseio.com",
    projectId: "bright-s-ecommerce",
    storageBucket: "bright-s-ecommerce.appspot.com",
    messagingSenderId: "680826186239",
    appId: "1:680826186239:web:f5f476bd5313d7fb8e1fca",
    measurementId: "G-WEFYG4YS8Z"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt : 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createUserProfileDocument = async (userAuth, additionalData)=> {
    if(!userAuth){
        return ;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const{email, displayName} = userAuth
        const createdAt = new Date()
        try{
            await userRef.set({
                id : snapShot.id,
                email,
                displayName,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            return new Error('Error creating User', error)
        }
    }

    return userRef

}


export default firebase
