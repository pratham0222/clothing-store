import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch,query,getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBo8cghvVBCp7t6-fmXxPDtDROHX5IXZ8I",
    authDomain: "crwn-clothing-db-fb76d.firebaseapp.com",
    projectId: "crwn-clothing-db-fb76d",
    storageBucket: "crwn-clothing-db-fb76d.appspot.com",
    messagingSenderId: "343894527448",
    appId: "1:343894527448:web:3d462861700c3927feb6ad",
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });
    await batch.commit();
    console.log("done");
}
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

};
export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth)return;
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

  //if user data does not exists then
  //create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
        });
    } catch (error) {
        if (error) console.log("error creating the new user", error.message);
        }
    }

  //if user data exists
  //return userDocRef
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email,password) =>{
    if(!email || !password)return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async(email,password) =>{
    if(!email || !password)return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (caallback) => onAuthStateChanged(auth, caallback);