// Import Firebase
import firebase from 'firebase-admin';
// Import Firestore Module
import "@firebase/firestore";
// Import Service Account Key (JSON file)
import serviceAccountKey from "../../serviceAccountKey.json"

// Populate this with your firebase config JSON details
  var firebaseConfig = {
    apiKey: "AIzaSyB2rzO3a5eBw8iwPmYK83LCqF0YEOb7q9M",
    authDomain: "twitch-bot-602f4.firebaseapp.com",
    databaseURL: "https://twitch-bot-602f4.firebaseio.com",
    projectId: "twitch-bot-602f4",
    storageBucket: "twitch-bot-602f4.appspot.com",
    messagingSenderId: "1002611217587",
    appId: "1:1002611217587:web:348261306ab9bdd52d4cc6",
    measurementId: "G-JE299K8GKP"
  };




// Initialize the firebase app
firebase.initializeApp({
    credential: firebase.credential.cert((serviceAccountKey)),
    databaseURL:  firebaseConfig.databaseURL // the URL given to you for the service account
});

// Reference your Firestore instance
const db = firebase.firestore();

// Create function for getting a hug count
export const getHugCount = async () => {
    // Query Firestore for the Settings Collection Main Document
    const settings  = await db.collection("settings").doc("main").get();
    // Return the query data's hugCount
    return settings.data().hugCount;
};

// Create a function for setting the Hug Count
export const setHugCount = async (count) => {
    // Fetch the Settings Collection Main Document
    const settings = await db.collection("settings").doc("main");
    // Set the hugCount
    settings.set({
        hugCount: count,
    });
};