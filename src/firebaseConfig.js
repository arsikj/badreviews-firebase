import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAvdHpLf9WAvbpzN72oYdFFWunxA03qk8M",
    authDomain: "badreviews-1c0c4.firebaseapp.com",
    databaseURL: "https://badreviews-1c0c4.firebaseio.com",
    projectId: "badreviews-1c0c4",
    storageBucket: "badreviews-1c0c4.appspot.com",
    messagingSenderId: "481022068097"
  };

let firebaseApp = Firebase.initializeApp(config);

export const firebaseConfig = firebaseApp;
