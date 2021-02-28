import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDABKOr7atXmr2BM_2ee8e5Gic1L7FzMts",
  authDomain: "crwn-db-5fdbb.firebaseapp.com",
  projectId: "crwn-db-5fdbb",
  storageBucket: "crwn-db-5fdbb.appspot.com",
  messagingSenderId: "709495694566",
  appId: "1:709495694566:web:e27f0e4070cc0802d04727",
  measurementId: "G-H10VJH0G9Q"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
