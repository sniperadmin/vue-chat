import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA6Ez3-5dlCLicWYBCRmh55U37YW0U6zqE',
  authDomain: 'chat-app-f412a.firebaseapp.com',
  databaseURL: 'https://chat-app-f412a.firebaseio.com',
  projectId: 'chat-app-f412a',
  storageBucket: '',
  messagingSenderId: '32699626357',
  appId: '1:32699626357:web:9f6c7040e60de8ee',
};

require('firebase/firestore')

const firebase = Firebase.initializeApp(firebaseConfig)

const db = Firebase.firestore()

export { firebase, db }