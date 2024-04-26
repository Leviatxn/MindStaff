import React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { StyleSheet , TextInput , TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { DropShadow } from "react-native-drop-shadow";
import { clearProfile ,addProfile } from '../redux/authSlice';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { signInEmailPass } from '../firebase/AuthModel';
import { setStatus } from '../redux/variableSlice';
import { Alert } from 'react-native';



export const LoginScreen = ({ navigation }) => {
  
  const [credential,setCredential] = useState({email:'',password:''})
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const dispatch = useDispatch()

  const setEmail = (text) => {
      setCredential(oldValue => ({
          ...oldValue,
          email:text
      }))
    }
  
  const setPassword = (text) => {
      setCredential(oldValue => ({
          ...oldValue,
          password:text
      }))
  }

  const success = async(user) => {
      const { uid, email } = user;
      const userData = {
          uid,
          email
      };
      dispatch(setStatus(false))
      dispatch(clearProfile());
      dispatch(addProfile(userData));
      navigation.navigate('Home')
  }
  
  const unsuccess = (msg) => {
      console.log(msg)
      Alert.alert(msg)
  }

  const handleSignIn = ()=>{
      let isEmailValid = true;
      let isPasswordValid = true;

      while(true){
          if(!credential.email){
              isEmailValid = false;
              Alert.alert('Please provide your email information');
              break;
          }
          if(!credential.password){
              isPasswordValid = false;
              Alert.alert('Please provide your password information');
              break;
          }
          break;
      }

      if(isEmailValid && isPasswordValid){
          signInEmailPass(credential.email, credential.password, success, unsuccess)
      }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#ffffff'}}>
      <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
              <Image source={require('../assets/logo01.png')} style={{ width: 500, height: 500 }}/>
            </View>
      </View>

      <LinearGradient colors={['#BAE9E3', '#74D4C9']} style={{flex:6, borderWidth:1.5, borderRadius:25,borderColor:'#B7221E', marginHorizontal:10}}>

        <View style={{flex:2}}></View>
          
          <View style={{flex:2, paddingVertical:'7%', paddingHorizontal:'10%'}}>
              <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> อีเมล์</Text>
                  <TextInput style={{height:40,width:320, backgroundColor:'#ffffff', borderWidth:1.5, borderRadius:25,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   กรุณากรอกอีเมล์*' placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='email-address' underlineColor='transparent' activeUnderlineColor="transparent" cursorColor="gray"
                    value={credential.email} onChangeText={(text)=>{setEmail(text)}}
                    >
                  </TextInput>

            </View>


            <View style={{flex:2, paddingVertical:'4%', paddingHorizontal:'10%'}}>
                <Text style={{fontSize:17, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> รหัสผ่าน</Text>
              <TextInput style={{height:40,width:320, borderRadius:25, backgroundColor:'#ffffff', borderWidth:1.5,borderColor:'#B7221E',fontFamily: 'Prompt-Regular'}} 
                    placeholder='   กรุณากรอกรหัสผ่าน*' placeholderTextColor="rgba(0, 0, 0, 0.3)" underlineColor='transparent' activeUnderlineColor="transparent" secureTextEntry={true} cursorColor="gray"
                    value={credential.password} onChangeText={(text)=>{setPassword(text)}}
                    >  
              </TextInput>
              <TouchableOpacity style={{height:30, alignItems:'flex-end', marginBottom:'8%'}} 
                        onPress={() => {
                            navigation.navigate('Splash');
                          }}
                    >
                        <Text style={{fontSize:11,color:'#199486',marginTop :'2%',textDecorationLine: 'underline',fontFamily: 'Prompt-Regular'}}>ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
           
            </View>
            
            <View style={{flex:1, paddingVertical:'7%', paddingHorizontal:'5%'}}>
              <TouchableOpacity style={{height:50,width:230, borderRadius:26, backgroundColor:'#27C9B6', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
                        onPress={handleSignIn}                     
                    >
                        <Text style={{fontFamily: 'Prompt-Regular', color:'#fffffa', fontSize:20}}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>           
            </View>
             <View style={{flex:1, paddingVertical:'15%'}}>
                <View style={styles.line} />
                        <TouchableOpacity style={{height:30, alignItems:'center', marginTop : '7%'}} 
                        onPress={() => {
                            navigation.navigate("Reg");
                          }}
                    >
                        <Text style={{fontSize:15,fontFamily: 'Prompt-Regular', color:"rgb(13,67,61)",marginBottom :'1%',textDecorationLine: 'underline'}}>สร้างบัญชีใหม่</Text>
                </TouchableOpacity> 
            </View>
 
            
        </LinearGradient>


        

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',

  },
  dropShadow:{
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
  	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
  },
  quicksandLight: {
    fontFamily: 'Quicksand-Light',
    fontSize: 20,
    
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
  },
});

