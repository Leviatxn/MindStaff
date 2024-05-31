import { View, Text,TextInput, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'react-native-linear-gradient';
import { retrieveAllUserData } from "../../firebase/UserModel";
import { retrieveAllEventKeySelectData } from "../../firebase/UserModel";
import { clearStaffEventCount } from "../../firebase/UserModel";
import { retrieveAllEventData } from "../../firebase/UserModel";
import { retrieveboothSelectData } from "../../firebase/UserModel";
import { SelectList } from 'react-native-dropdown-select-list';
import { deleteUserIDFromStaff} from "../../firebase/UserModel";
import { addStaffEvent } from "../../firebase/UserModel";


export const StaffHomeScreen =  ({ navigation})=>{
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const [nameData, setNameData] = useState("")
    const [mailData, setMailData] = useState("")
    const [phoneData, setPhoneData] = useState("")
    const [staffNumData, setStaffNumData] = useState("")
    const [eventNameData, setEventNameData] = useState("")
    const [eventBoothData, setEventBoothData] = useState("")
    const [eventIDData, setEventIDData] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false);

    const profile = firestore().collection('users').doc(userUID).get();

    const fetchData = async () => {
        setIsRefreshing(true);
        await getProfileData();
        getEventData();
      };
      
      useEffect(() => {
        fetchData();
      }, [isUpdate]);

    const getProfileData = async()=>{
        try{
            
            console.log("getProfileData")
            const itemAllUserData = await retrieveAllUserData(userUID)
            setNameData(itemAllUserData.name +" "+itemAllUserData.surName)
            setMailData(itemAllUserData.email)
            setPhoneData(itemAllUserData.phoneNumber)
            setStaffNumData(itemAllUserData.staffnumber)
            setEventBoothData(itemAllUserData.eventBooth)
            setEventIDData(itemAllUserData.eventID)
            
        }catch (error) {
            console.error('Error getNameData:', error);
        }  
    }

    const clearStaffcurrentEvent = async()=>{
        const eventID = profile._j._data.eventID;
        try{
            if(eventID != null && eventID !== undefined || eventID == eventIDData){
                deleteUserIDFromStaff(eventID,userUID)
                clearStaffEventCount(eventID)
            }
        }
        catch (error) {
            console.error('Error clearStaffcurrentEvent:', error);
        }
    }

    const getEventData = async()=> {
        const eventID = profile._j._data.eventID;  
        try{
            if(eventID != null && eventID !== undefined || eventID == eventIDData){
                const allEventData = await retrieveAllEventData(eventID)
                console.log(allEventData);
                setEventNameData(allEventData.eventThainame)
        }

        }catch (error) {
            console.error('Error getEventData:', error);
        }
    }

      

    return(
        <SafeAreaView style={{flex:1}}>
        <LinearGradient start={{x: 1, y: 0.5}} end={{x: 0, y: 0.5}} colors={['#E1FAF7','#BAE9E3', '#74D4C9']} style={{flex:1}}>
            <View style={{flex:1,flexDirection : 'row',justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:'5%',marginTop:'7%'}}>
                <View style={styles.circle}>
                    <View style={{ width: 100,height: 100, borderRadius: 50,backgroundColor: '#FFFFFF',justifyContent:'center',alignItems:'center'}}>
                         <Image source={require('../../assets/images/user.png')} style={{ width: 110, height: 110 }}/>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:'7%',marginTop:'7%'}}>
                    <Text style={{color:"rgb(13,67,61)",justifyContent: 'flex-end', alignItems: 'center',fontFamily: 'Prompt-SemiBold',fontSize : 18}}> ยินดีต้อนรับสู่ทีมของเรา </Text>
                    <Text style={{color:"rgb(13,67,61)",justifyContent: 'flex-end', alignItems: 'center',fontFamily: 'Prompt-Regular',fontSize : 18}}> คุณ {nameData}</Text>
                </View>
            </View>
            <View style={{flex:4,justifyContent:'flex-start', alignItems:'center', backgroundColor:'white'}}>
                <View style={{height:'30%',width:'95%', backgroundColor:'white',borderWidth:1, borderRadius:25,borderColor:'#0D433D',flexDirection:'row',justifyContent: 'space-evenly',alignItems: 'center'}}> 
                    <View style={{flex:13,width:'60%',paddingTop:'1%'}}>
                        <Text style={{fontSize:14, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Name : {nameData}</Text>
                        <Text style={{fontSize:14, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Email : {mailData}</Text>
                        <Text style={{fontSize:14, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular',paddingLeft:'12%'}}>Phone : {phoneData}</Text>
                    </View> 
                    <View style={{flex:1,width:'10%',alignItems:'flex-end',justifyContent:'center'}}>
                        <View style={{height:'90%',width: 1,backgroundColor: '#909090'}}/>
                    </View>
                    <View style={{flex:9,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>Staff</Text>
                        <Text style={{fontSize:32, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>N0.{staffNumData}</Text>
                    </View>                  
                </View>
                <View style={{flex:4,width:'100%', paddingVertical:'8%', paddingHorizontal:'10%',flexDirection:'row',justifyContent: 'center',alignContent : 'center'}}>
                    <View style={{height:'70%',width:'100%', backgroundColor:'white',borderWidth:1, borderRadius:25,borderColor:'#0D433D',justifyContent: 'center',alignItems: 'center'}}> 
                        <View style={{flex:1,width:'100%',flexDirection:'row',justifyContent: 'flex-start'}}>
                            <TouchableOpacity style={{height:30, marginTop : '5%', marginLeft : '5%'}} 
                                     onPress={() => {
                                        fetchData();

                            }}
                             >
                                <Image source={require('../../assets/images/refresh.png')} style={{ width: 25, height: 25 }}/>
                             </TouchableOpacity> 
                        </View>
                        <View style={{flex:4,justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{fontSize:18, color:"rgb(13,67,61)",fontFamily: 'Prompt-SemiBold'}}>กิจกรรม : </Text>
                            <Text style={{fontSize:14, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}>{eventNameData} </Text>
                            <View style={{width:200,height: 1,backgroundColor: '#909090',marginTop:'5%',marginBottom:'5%'}}/>
                            <Text style={{fontSize:18, color:"rgb(13,67,61)",fontFamily: 'Prompt-Medium'}}>อยู่บูธที่ : 0{eventBoothData} </Text>
                        </View>

                        <View style={{flex:1,width:'100%',flexDirection:'column',justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={{height:30, alignItems:'flex-end', marginTop : '20%', marginRight : '5%'}} 
                                     onPress={() => {
                                        clearStaffcurrentEvent();
                                        navigation.navigate('StaffMainInput');

                            }}
                             >
                            <Text style={{fontSize:12,fontFamily: 'Prompt-Regular', color:"rgb(	38,171,156)",marginBottom :'1%',textDecorationLine: 'underline'}}>เปลี่ยนกิจกรรม</Text>
                             </TouchableOpacity> 

                        </View>
                    </View>
                </View> 

                <View style={{height:'10%',width:'95%', borderWidth:1.5, borderTopRightRadius:35, borderTopLeftRadius:35, borderBottomRightRadius:5, borderBottomLeftRadius:5,backgroundColor:'#E32A25',borderColor:'#B7221E',justifyContent: 'center',alignItems : 'center'}}>
                    <View style={{width: 120,height: 120,borderRadius: 100,backgroundColor: '#E32A25',borderColor:'#B7221E',marginBottom:'15%',justifyContent: 'center',alignItems : 'center'}}>
                        <View style={{width: 105,height: 105,borderRadius: 100,backgroundColor: '#FFFFFF',borderColor:'#B7221E',justifyContent: 'center',alignItems : 'center'}}>
                            <TouchableOpacity style={{}} 
                                     onPress={() => {
                                        navigation.navigate('Scan');
                            }}
                             >
                                 <Image source={require('../../assets/images/qrscanner.png')} style={{ width: 80, height: 80}}/>
                             </TouchableOpacity> 
                        </View>
                    </View>

                </View>
                   
            </View>

                            
        </LinearGradient>
        </SafeAreaView>
    );




}

const styles = StyleSheet.create({
    container: {
      flex: 1,

      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    circle: {
        width: 120, // Diameter of the circle
        height: 120, // Diameter of the circle
        borderRadius: 100, // Half of the width/height
        backgroundColor: '#E32A25',borderColor:'#B7221E'
        ,alignItems: 'center',justifyContent :'center'
      },
    line: {

        height: 1,  // You can adjust the thickness of the line by changing the height
        backgroundColor: '#199486',  // Change the color to suit your design
        width: '80%' , // This will make sure the line stretches across the width
        alignSelf : 'center'
      },
    header: {
        color:"rgb(13,67,61)",
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontFamily: 'Prompt-Regular',
        fontSize : 24,

    }
  });