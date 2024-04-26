import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

export const addUser = (user, profile, success, unsuccess)=>{
    console.log(`addUser in UserModel user id: ${user.uid}`) 
    firestore()
    .collection('users') 
    .doc(user.uid)
    .set({
            email: user.email,
            phoneNumber: profile.phoneNumber
        },
    )
    .then(()=>{
        success(user)
    })
    .catch((error)=>{
      console.error(`addUser in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}

export const addStaffprofile = (user,userUID,username, success, unsuccess)=>{
    console.log(`addUsername in UserModel user id: ${userUID}`) 
    firestore()
    .collection('users') 
    .doc(userUID)
    .update({
            name: username.name,
            surname : username.surname,
            staffcode : username.staffcode,
            role : "Staff"
        },
    )
    .then(()=>{
        success(user)
    })
    .catch((error)=>{
      console.error(`addUsername in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}

export const addAdminprofile = (user,userUID,username, success, unsuccess)=>{
    console.log(`addUsername in UserModel user id: ${userUID}`) 
    firestore()
    .collection('users') 
    .doc(userUID)
    .update({
            name: username.name,
            surname : username.surname,
            staffcode : username.staffcode,
            role : "ADmin"
        },
    )
    .then(()=>{
        success(user)
    })
    .catch((error)=>{
      console.error(`addUsername in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}