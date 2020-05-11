import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt : 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export const getAuthenticatedUser = ()=> {
    return new Promise((resolve, reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe()
            resolve(userAuth)
        },reject)
    })
}

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
export const addCollectionsAndDocuments = async (collectionName, collectionToAdd)=>{

    const collectionRef = firestore.collection(collectionName);
    const batch = firestore.batch()
    collectionToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
       batch.set(newDocRef, obj)
    })
     return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collectionsSnapShot)=> {
    const transformedCollection = collectionsSnapShot.docs.map(doc => {
        const {title, items} = doc.data()
        return{
            routeName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    })

   return transformedCollection.reduce((accumulator, collection)=>{
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}


export default firebase
