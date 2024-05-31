import React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { StyleSheet , TextInput , TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { clearProfile,addProfile } from '../redux/authSlice';
import { signUpEmailPass } from '../firebase/AuthModel';
import { useState } from "react";
import { Alert } from 'react-native';


export const RegisterScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({'email':'','password':'','cfPassword':'','phoneNumber':''})
  const [eventTextInput, setEventTextInput] = useState(0);
  const dispatch = useDispatch()

    const goBack = () => {
        navigation.pop();
    }

      const setEmail = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          email:text
        }))
    }

    const setPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          password:text
        }))
    }

    const setCFPassword = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          cfPassword:text
        }))
    }

    const setPhoneNumber = (text) => {
        setProfile(oldValue => ({
          ...oldValue,
          phoneNumber:text
        }))
    }

    const success = async(user) => {
        const { uid, email } = user;
        const userData = {
            uid,
            email
        };
        dispatch(clearProfile());
        dispatch(addProfile(userData));
        Alert.alert(`${email} has been added to system`)
        navigation.navigate('SignUpAsStaff')
    }

    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    const handleSignUp = async() => {
        setEventTextInput(1)
    
        let isEmailValid = true;
        let isPasswordValid = true;
        let isCFPasswordValid = true;
        let isPhoneNumberValid = true;
        
        while (true) {
            if (!profile.email) {
                isEmailValid = false;
                Alert.alert('Please provide your email information');
                break;
            }
          
            if (!profile.password) {
                isPasswordValid = false;
                Alert.alert('Please provide your password information');
                break;
            } else {
                if (!profile.cfPassword) {
                    isPasswordValid = false;
                    Alert.alert('Please provide your confirm password information');
                    break;
                } else {
                    if (profile.password !== profile.cfPassword) {
                        isCFPasswordValid = false;
                        Alert.alert('Passwords do not match');
                        break;
                    }
                }
            }
    
            if (!profile.phoneNumber) {
                isPhoneNumberValid = false;
                Alert.alert('Please provide your phone number information');
                break;
            }
    
            break;
        }
    
        if (isEmailValid && isPasswordValid && isCFPasswordValid && isPhoneNumberValid) {
            console.log('success');
            signUpEmailPass(profile, success, unsuccess);
          } else {
            console.log('Signed up unsuccessful!!');
            console.log(`isEmailValid: ${isEmailValid}`);
            console.log(`isPasswordValid: ${isPasswordValid}`);
            console.log(`isPhoneNumberValid: ${isPhoneNumberValid}`);
          }
    };



  return (
    <SafeAreaView style={{flex:1}}>
      <LinearGradient  start={{x: 0.8, y: 0.4}} end={{x: 0, y: 1}} colors={['#E2FFFC', '#26AB9C']} style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Image source={require('../assets/logo01.png')} style={{ width: 400, height: 400 }}/>
            </View>
      </View>

        <View style={{flex:8, backgroundColor:'transparent'}}>
         
          <View style={{flex:1, paddingVertical:'5%', paddingHorizontal:'10%'}}>
              <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> อีเมล์</Text>
              <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:20,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   อีเมล์ *' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='email-address' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray" 
                    value={profile.email} onChangeText={text => setEmail(text)}
                    >
              </TextInput>

              <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> เบอร์โทรศัพท์</Text>
              <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:20,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   เบอร์โทรศัพท์ *' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='phone-pad' underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.phoneNumber} onChangeText={text => setPhoneNumber(text)}
                    > 
              </TextInput>

              <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> รหัสผ่าน </Text>
              <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:20,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   รหัสผ่าน*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.password} onChangeText={text => setPassword(text)}
                    > 
              </TextInput>

              <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> ยืนยันรหัสผ่าน </Text>
              <TextInput style={{height:50,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:20,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   ยืนยันรหัสผ่าน*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={profile.cfPassword} onChangeText={text => setCFPassword(text)}
                    > 
              </TextInput>
              <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{height:50,width:230, borderRadius:26, backgroundColor:'#B7221E', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
                      onPress={handleSignUp}
                    >
                        <Text style={{fontFamily: 'Prompt-Regular', color:'#fffffa', fontSize:20}}>ลงทะเบียน</Text>
                </TouchableOpacity>             
            </View>
          </View>          
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
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

