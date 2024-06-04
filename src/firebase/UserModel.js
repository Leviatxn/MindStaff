import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import  { useState, useEffect } from 'react';


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

export const addStaffEvent = async(user,userUID,eventData,boothData, success, unsuccess)=>{
    console.log(`addEvent in UserModel user id: ${userUID}`)
    firestore()
    .collection('users') 
    .doc(userUID)
    .update({
            eventID : eventData,
            boothNum : boothData
        },
    )
    .then(()=>{
        success(user)
        addStaffEventCount(eventData)
        addUserIDToStaff(eventData,userUID)
    })
    .catch((error)=>{
      console.error(`addEvent in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}
export const setStaffCount = async (eventIDdata, count) => {
    try {
        await firestore()
            .collection('events')
            .doc(eventIDdata)
            .update({
                staffCount: count
            });
        console.log(`addStaffCount in event id: ${eventIDdata}`);
    } catch (error) {
        console.error(`addStaffCount in ${eventIDdata} error: ${error}`);
    }
};  

export const addStaffEventCount = async (eventIDdata) => {
    console.log(`addStaffCount in UserModel event id: ${eventIDdata}`);
    // ดึงข้อมูล events จาก Firestore
    const docRef = firestore().collection('events').doc('eventSource');
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const eventData = doc.data();
            const eventArray = eventData.eventArray || [];
            
            // หา Event ที่มี eventID ตรงกับ eventIDdata
            const updatedEventArray = eventArray.map(event => {
                if (event.eventID === eventIDdata) {
                    return {
                        ...event,
                        StaffCount: (event.StaffCount || 0) + 1
                    };
                }
                return event;
            });

            // อัพเดต eventArray ใน Firestore
            await docRef.update({
                eventArray: updatedEventArray
            });
            await setStaffCount(eventIDdata, updatedEventArray.find(event => event.eventID === eventIDdata).StaffCount);
            console.log('StaffCount updated successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating StaffCount: ${error}`);
    }
};

export const addParticipantCount = async (eventIDdata) => {
    console.log(`addParticipantCount in participant event id: ${eventIDdata}`);
    // ดึงข้อมูล participants จาก Firestore
    const docRef = firestore().collection('participants').doc(eventIDdata);
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            const currentCount = data.participantsCount || 0;

            // อัพเดต participantsCount ใน Firestore
            await docRef.update({
                participantsCount: currentCount + 1
            });

            console.log('participantsCount updated successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating participantsCount: ${error}`);
    }
};

export const addParticipantCountSrc = async (eventIDdata) => {
    console.log(`addStaffCount in UserModel event id: ${eventIDdata}`);
    // ดึงข้อมูล events จาก Firestore
    const docRef = firestore().collection('events').doc('eventSource');
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const eventData = doc.data();
            const eventArray = eventData.eventArray || [];
            
            // หา Event ที่มี eventID ตรงกับ eventIDdata
            const updatedEventArray = eventArray.map(event => {
                if (event.eventID === eventIDdata) {
                    return {
                        ...event,
                        participantsCount: (event.participantsCount || 0) + 1
                    };
                }
                return event;
            });

            // อัพเดต eventArray ใน Firestore
            await docRef.update({
                eventArray: updatedEventArray
            });
            await setStaffCount(eventIDdata, updatedEventArray.find(event => event.eventID === eventIDdata).StaffCount);
            console.log('addParticipantCountSrc updated successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating StaffCount: ${error}`);
    }
};


export const clearStaffEventCount = async (eventIDdata) => {
    console.log(`clearStaffEventCount in UserModel event id: ${eventIDdata}`);
    // ดึงข้อมูล events จาก Firestore
    const docRef = firestore().collection('events').doc('eventSource');
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const eventData = doc.data();
            const eventArray = eventData.eventArray || [];
            
            // หา Event ที่มี eventID ตรงกับ eventIDdata
            const updatedEventArray = eventArray.map(event => {
                if (event.eventID === eventIDdata) {
                    return {
                        ...event,
                        StaffCount: (event.StaffCount || 0) - 1
                        
                    };
                }
                setStaffCount(eventIDdata)
                return event;
            });

            // อัพเดต eventArray ใน Firestore
            await docRef.update({
                eventArray: updatedEventArray
            });
            await setStaffCount(eventIDdata, updatedEventArray.find(event => event.eventID === eventIDdata).StaffCount);

            console.log('StaffCount updated successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating StaffCount: ${error}`);
    }
};

export const addParticipant = async(participantProfile,eventID,timeData)=>{

    console.log(eventID);
    console.log(participantProfile);

    const boothDataArray = await retrieveboothSelectData(eventID);
    const boothCount = boothDataArray.length - 1;

    console.log('addPar'+boothCount)
    const firestoreRef = firestore();
    return firestoreRef.collection('participants').doc(eventID).get()
    .then((doc) => {
        if (doc.exists) {
            const participantData = doc.data();
            const participants = participantData.participants || [];
            const isDuplicate = participants.some(participant => participant.participantID === participantProfile.user_id);
            // ตรวจสอบว่าIDซ้ำหรือไม่
            if(!isDuplicate){//First time 
                addParticipantCount(eventID)
                addParticipantCountSrc(eventID)
                const newProfile = {
                    participantID: participantProfile.user_id,
                    participantName: participantProfile.username,
                    participantNum: participantProfile.phoneNumber,
                    attendTime: timeData,
                    lastedAccessTime: timeData,
                    count: 0,
                    status: "unCompleted"
                };

                return firestoreRef.collection('participants').doc(eventID)

                    .update({
                        participants: firestore.FieldValue.arrayUnion(newProfile),
                    })
                    .catch((error) => {
                        console.error("Error adding participants:", error);
                        throw error;
                    });
                    console.log("Success")
            }
            else {
                // ถ้า id ซ้ำ
                const updateParticipants = participants.map(participant => {

                    if (participant.participantID === participantProfile.user_id ) {
                        if(participant.count == boothCount){
                            Alert.alert("ทำกิจกรรมเสร็จสิ้นแล้ว");
                            return {
                                ...participant,
                                lastedAccessTime: timeData,
                                status: "Completed",
    
                            };
                        }

                        return {
                            ...participant,
                            lastedAccessTime: timeData,
                            count: participant.count + 1
                        };
                    }

                    return participant;
                });
                Alert.alert("มีUSERอยู่แล้ว count ++");

                return firestoreRef.collection('participants').doc(eventID)
                .update({
                    participants: updateParticipants,
                })
                .catch((error) => {
                    console.error("Error adding participants:", error);
                    throw error;
                });
            }


        } else {
            // หากไม่มีเอกสารสำหรับผู้ใช้นี้ใน firestore
            console.log(eventID)
            Alert.alert("User data not found!");
        }
    })
    .catch((error) => {
        console.log("Error fetching user data:", error);
        throw error;
    });

}

export const addUserIDToStaff = async (eventIDdata, userID) => {
    console.log(`addUserIDToStaff in eventID: ${eventIDdata} with userID: ${userID}`);
    const docRef = firestore().collection('events').doc(eventIDdata);
    const userDocRef = firestore().collection('users').doc(userID);

    try {
        // ดึงข้อมูลผู้ใช้จาก Firestore
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
             console.error('User document not found!');
            return;
        }
        const userData = userDoc.data();

        const doc = await docRef.get();
        if (doc.exists) {
            const eventData = doc.data();
            const staffArray = eventData.Staff || [];

            // เพิ่ม userID และข้อมูลอื่น ๆ ลงใน Staff Array
            const updatedStaffArray = [
                ...staffArray,
                {
                    userID,
                    email: userData.email,
                    name: userData.name,
                    surname: userData.surname,
                    phoneNumber: userData.phoneNumber,
                    boothNum : userData.boothNum
                }
            ];

            // อัปเดต Staff array ใน Firestore
            await docRef.update({
                Staff: updatedStaffArray
            });

            console.log('UserID added to Staff array successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating Staff array: ${error}`);
    }
};

export const deleteUserIDFromStaff = async (eventIDdata, userID) => {
    console.log(`deleteUserIDFromStaff in eventID: ${eventIDdata} with userID: ${userID}`);
    const docRef = firestore().collection('events').doc(eventIDdata);

    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const eventData = doc.data();
            const staffArray = eventData.Staff || [];

            // ลบ userID ออกจาก Staff Array
            const updatedStaffArray = staffArray.filter(staff => staff.userID !== userID);

            // อัปเดต Staff array ใน Firestore
            await docRef.update({
                Staff: updatedStaffArray
            });

            console.log('UserID removed from Staff array successfully');
        } else {
            console.error('Event document not found!');
        }
    } catch (error) {
        console.error(`Error updating Staff array: ${error}`);
    }
};

export const retrieveAllUserData = (userUID) => {
    const UserData = {
        name: "",
        surName: "",
        email: "",
        phoneNumber: "",
        eventID: "",
        eventBooth:"",
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
                UserData.eventBooth = data.data().boothNum
                UserData.eventID = data.data().eventID
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
//
export const retrieveAllEventData = (eventID) => {
    const EventData = {
        eventThainame:""
    };
    console.log(eventID)
    return firestore()
        .collection('events')
        .doc(eventID)
        .get()
        .then((data) => {
            if (data.exists) { 
                EventData.eventThainame = data.data().eventThainame
                console.log('Hi'+EventData.eventThainame)
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
                const allEventData = data.data().eventArray;
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
            console.error("Error retrieving AllEventKeySelectData:", error);
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
                const allEventData = data.data().eventArray;
                allEventData.forEach(element => {
                    {
                        if(eventID == element.eventID){ 
                            console.log("Hit")
                            boothCount = element.boothCount;
                        }

                    }
                });

                for(let i = 0;i < boothCount;i++){
                    boothDataArray.push({ key: i, value: i })
                }
                console.log(boothCount)
                return boothDataArray;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error retrieving boothSelectData:", error);
            throw error;
        });
        
};
export const TimeData = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000); // อัพเดททุกๆ 1 วินาที
  
      // เมื่อ component unmount ให้ลบ interval
      return () => clearInterval(intervalId);
    }, []); // ให้เรียกใช้เพียงครั้งเดียวเมื่อ component ถูก mount
  
    // จัดรูปแบบเวลาโดยใช้ formatTime
    return formatTime(currentTime);
};
  
export const formatTime = (time) => {
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
};
