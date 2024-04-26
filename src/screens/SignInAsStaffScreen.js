import React from 'react';
import { View, Text,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { StyleSheet , TextInput , TouchableOpacity} from 'react-native';
import { useState } from "react";
import { Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { clearProfile,addProfile } from '../redux/authSlice';
import { addStaffprofile } from '../firebase/UserModel';

export const SignInAsStaffScreen = ({ navigation }) => {
  const [profilename, setProfileName] = useState({'name':'','surname':'','staffcode':''})
  const dispatch = useDispatch()     
  const user = useSelector((state)=>state.auths);
  const userUID = user[0].uid;

    const setName = (text) => {
        setProfileName(oldValue => ({
          ...oldValue,
          name:text
        }))
    }

    const setSurname = (text) => {
        setProfileName(oldValue => ({
          ...oldValue,
          surname:text
        }))
    }

    const setStaffcode = (text) => {
        setProfileName(oldValue => ({
          ...oldValue,
          staffcode:text
        }))
    }
    const success = async(user) => {
      console.log("Successfully")
      navigation.navigate('Role')
    }
  
    const unsuccess = (msg) => {
      console.log(msg)
      Alert.alert(msg)
    }

    const handleLogIn = ()=>{
      let isNameValid = true;
      let isSurnameValid = true;
      let isStaffcodeValid = true;
      while(true){
          if(!profilename.name){
            isNameValid = false;
              Alert.alert('Please provide your Name');
              break;
          }
          if(!profilename.surname){
            isSurnameValid = false;
              Alert.alert('Please provide your Surname');
              break;
          }
          if(!profilename.staffcode && profilename.staffcode === "a12345"){
            isStaffcodeValid = false;
            Alert.alert('Please provide the Staff code');
            break;
          }
          if(profilename.staffcode != "a12345"){
            isStaffcodeValid = false;
            Alert.alert('Valid the Staff code');
            break;
        }
        break;
      }

      if(isNameValid && isSurnameValid && isStaffcodeValid != false){
        addStaffprofile(user,userUID,profilename, success, unsuccess)
      }
      else{
        console.log("Error Please Complete your Ans")
      }
    }

    






  return (
    <SafeAreaView style={{flex:8}}>
    <LinearGradient  start={{x: 0.8, y: 0.4}} end={{x: 0, y: 1}} colors={['#F5F5F5', '#7CEBDE']} style={{flex:7}}>
      <View style={styles.container}>
         <Text style={{fontSize:17, color:'#0D433D ', fontFamily: 'Quicksand-Medium'}}> Welcome to our team!  </Text>
         <Text style={{fontSize:20, color:'#0D433D ', fontFamily: 'Quicksand-Regular'}}> Please enter your name</Text>
      </View>
      <View style={{flex:1, paddingVertical:'7%', paddingHorizontal:'10%'}}>
              <Text style={{fontSize:17, color:'#0D433D ',fontFamily: 'Quicksand-Bold'}}> Name</Text>
                  <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:25,borderColor:'#B7221E'}} 
                    placeholder='  Name*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='default' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"                  
                    value={profilename.name} onChangeText={(text)=>{setName(text)}}
                    >
                  </TextInput>
                  <View style={{paddingVertical:'2%'}}></View>
                  <Text style={{fontSize:17, color:'#0D433D ',fontFamily: 'Quicksand-Bold'}}> Surname</Text>
                  <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:25,borderColor:'#B7221E'}} 
                    placeholder='  Surname*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='default' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"                  
                    value={profilename.surname} onChangeText={(text)=>{setSurname(text)}}
                    >
                  </TextInput>
                  <View style={{paddingVertical:'2%'}}></View>
                  <Text style={{fontSize:17, color:'#0D433D ',fontFamily: 'Quicksand-Bold'}}>* Staff code </Text>
                  <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:25,borderColor:'#B7221E'}} 
                    placeholder='  Staffcode*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='default' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"                  
                    value={profilename.staffcode} onChangeText={(text)=>{setStaffcode(text)}}
                    >
                  </TextInput>

                  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                    <TouchableOpacity style={{height:50,width:200, borderRadius:26, backgroundColor:'#B7221E', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
                             onPress={handleLogIn}                      
                     >
                        <Text style={{fontFamily:'Quicksand-SemiBold', color:'#fffffa', fontSize:20}}>Confirm</Text>
                    </TouchableOpacity>           
                  </View>
            </View>
    </LinearGradient>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  circle: {
    width: 200, // Diameter of the circle
    height: 200, // Diameter of the circle
    borderRadius: 100, // Half of the width/height
    backgroundColor: 'blue'
  },
  line: {

    height: 1,  // You can adjust the thickness of the line by changing the height
    backgroundColor: '#199486',  // Change the color to suit your design
    width: '80%' , // This will make sure the line stretches across the width
    alignSelf : 'center'
  }
});
