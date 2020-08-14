import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhUfLdKwxez78Cvujj0K9E9CfKkekz_Ic",
    authDomain: "worksfit-uv-android.firebaseapp.com",
    databaseURL: "https://worksfit-uv-android.firebaseio.com",
    projectId: "worksfit-uv-android",
    storageBucket: "worksfit-uv-android.appspot.com",
    messagingSenderId: "606882187887",
    appId: "1:606882187887:web:91f7b3594e9ffb6b"
};

firebase.initializeApp(config);

export default firebase;