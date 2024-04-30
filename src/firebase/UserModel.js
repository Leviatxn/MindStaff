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
            phoneNumber: profile.phoneNumber,

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


export const addStaffprofile = async(user,userUID,username, success, unsuccess)=>{
    console.log(`addUsername in UserModel user id: ${userUID}`)
    // Query to get the latest usernumber
    const latestUser = await firestore().collection('users').orderBy('staffnumber', 'desc').limit(1).get();
    let newUserNumber = 1;
    if (!latestUser.empty) {
        console.log(latestUser)
      // If there are existing users, increment usernumber
        const latestUserData = latestUser.docs[0].data();
        newUserNumber = latestUserData.staffnumber + 1; 
    }
    firestore()
    .collection('users') 
    .doc(userUID)
    .update({
            name: username.name,
            surname : username.surname,
            accesscode : username.staffcode,
            staffnumber: newUserNumber,
            role : "Staff",
            eventID : ""
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
            personalcode : username.admincode,
            role : "Admin",

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

export const retrieveAllUserData = (userUID) => {
    const UserData = {
        name: "",
        surName: "",
        email: "",
        phoneNumber: "",
        staffnumber: 0
    };

    return firestore()
        .collection('users')
        .doc(userUID)
        .get()
        .then((data) => {
            if (data.exists) { 
                UserData.name = data.data().name
                UserData.surName = data.data().surname
                UserData.email = data.data().email
                UserData.phoneNumber = data.data().phoneNumber
                UserData.staffnumber = data.data().staffnumber
                return UserData;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            throw error;
        });
        
};

export const retrieveAllEventData = () => {
    const EventData = {
        event:[]
    };

    return firestore()
        .collection('events')
        .doc('eventSource')
        .get()
        .then((data) => {
            if (data.exists) { 
                const allEventData = data.data().event;
                allEventData.forEach(element => {
                    {
                        EventData.event.push(element)
                    }


                });
                return EventData;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            throw error;
        });
        
};


export const retrieveAllEventKeySelectData = () => {
    const eventDataArray = [];
    return firestore()
        .collection('events')
        .doc('eventSource')
        .get()
        .then((data) => {
            if (data.exists) { 
                const allEventData = data.data().event;
                allEventData.forEach(element => {
                    {
                        eventDataArray.push({ key: element.eventID, value: element.eventThainame })
                    }
                });
                return eventDataArray;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            throw error;
        });
        
};

export const retrieveboothSelectData = (eventID) => {
    let boothCount = 0;
    const boothDataArray = [];
    return firestore()
        .collection('events')
        .doc('eventSource')
        .get()
        .then((data) => {
            if (data.exists) { 
                const allEventData = data.data().event;
                allEventData.forEach(element => {
                    {
                        if(eventID == element.eventID){
                            console.log("Hit")
                            boothCount = element.boothcount;
                        }

                    }
                });
                console.log(boothCount)
                for(let i = 0;i <= boothCount;i++){
                    boothDataArray.push({ key: i, value: i })
                }
                return boothDataArray;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            throw error;
        });
        
};

