import express from 'express'
import cors  from 'cors'
import helmet from 'helmet'
import { initializeApp } from "firebase/app";
import { getDatabase, onChildAdded, onChildChanged, onChildRemoved, onValue, ref, set } from 'firebase/database'

import dotenv from 'dotenv'
dotenv.config({ path: './config.env' });



const app = express();
app.use(express.json())
app.use(cors())
app.use(helmet())



const firebaseApp = initializeApp({
    apiKey: "AIzaSyDjK0AClQoFzIlD9JdhzaXc9KHAS0U60E4",
    authDomain: "chatakk-test.firebaseapp.com",
    databaseURL: "https://chatakk-test-default-rtdb.firebaseio.com",
    projectId: "chatakk-test",
    storageBucket: "chatakk-test.appspot.com",
    messagingSenderId: "241837759674",
    appId: "1:241837759674:web:aeb20662f3cabeca1f7683",
    measurementId: "G-Z7969GWELT"
  });

const db = getDatabase();
// console.log(db)
// Write/Update to database
function writeUserData(userId, name, email) {
    const reference = ref(db, 'users/' + userId)
    
    set(reference, {
        username: name,
        email: email
    })
}

writeUserData('01', 'awe', 'alexallen@gmail.com')



// Read from Database
function readUserData(userId) {
    const usersRef = ref(db, 'users/')
    onValue(usersRef, (snapshot) => {
        const data = snapshot.val()
        // console.log(data)
    
    })

    onChildChanged(usersRef, (data) => {
        console.log(`Data updated : Id: ${data.key} : name: ${data.val().username}, email: ${data.val().email}`);
      });
      
   
    onChildAdded(usersRef, (data) => {
        console.log(`Data added : Id: ${data.key} : name: ${data.val().username}, email: ${data.val().email}`);
      });

    onChildRemoved(usersRef, (data) => {
        console.log(`Data removed : Id: ${data.key} : username: ${data.val().username}`)
    })
}

readUserData()



const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});