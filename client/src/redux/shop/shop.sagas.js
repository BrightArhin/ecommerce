import {takeLatest, all,  call,put} from 'redux-saga/effects'
import ShopActionTypes from "./shop.types"
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase-utils"
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions"

export function* fetchCollectionsStartAsync(){

    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch (e) {
        yield put(fetchCollectionsFailure(e.message))
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsStartAsync)
}

export default function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}
