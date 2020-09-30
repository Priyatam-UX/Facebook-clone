import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCGH8nGfH_1w4AFTZVYzQiWwtQNkdYjXTA",
    authDomain: "facebook-clone2-c7994.firebaseapp.com",
    databaseURL: "https://facebook-clone2-c7994.firebaseio.com",
    projectId: "facebook-clone2-c7994",
    storageBucket: "facebook-clone2-c7994.appspot.com",
    messagingSenderId: "905980443865",
    appId: "1:905980443865:web:5dda57b407059c34ea12c8",
    measurementId: "G-LW02TZG3N4"
});

const auth = firebase.auth();
const db = firebaseConfig.firestore();
const storage = firebase.storage();

export { auth, db, storage };
