import React from 'react';
import { View, Text,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { StyleSheet , TextInput , TouchableOpacity} from 'react-native';
import { useState } from "react";
import { Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { clearProfile,addProfile } from '../redux/authSlice';
import { addUsername } from '../firebase/UserModel';

export const RoleSelectScreen = ({ navigation }) => {
  const dispatch = useDispatch()     
  const user = useSelector((state)=>state.auths);
  const userUID = user[0].uid;
  console.log(userUID);

  const SignInasStaff = () => {
    navigation.navigate('SignUpAsStaff');
  };
  const SignInasAdmin = () => {
    navigation.navigate('SignUpAsAdmin');
  };



  return (
    <SafeAreaView style={{flex:7}}>
    <LinearGradient  start={{x: 0.5, y: 0.5}} end={{x: 0, y: 1}} colors={['#C1FCF5', '#F5F5F5']} style={{flex:7}}>
      <View style={styles.container}>
         <Text style={{fontSize:20, color:"rgb(13,67,61)",fontFamily: 'Prompt-SemiBold'}}> ตำแหน่งของคุณคือ ?  </Text>
      </View>
      <View style={{flex:2,flexDirection : 'row',paddingVertical:'5%', paddingHorizontal:'10%'}}>

          <View style={{flex:3,justifyContent: 'flex-start',alignItems: 'center'}}>
            <TouchableOpacity style={{height:200,width:180, borderRadius:26, backgroundColor:'#E32A25', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
              onPress={SignInasStaff}                       
             >
              <Image source={require('../assets/images/staff.png')} style={{ width: 140, height: 140 }}></Image>
            </TouchableOpacity>     
            <Text style={{fontSize:20, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> สตาฟ  </Text> 
          </View>

          <View style={{flex:1,justifyContent: 'flex-start',alignItems: 'center'}}></View>

          <View style={{flex:3,justifyContent: 'flex-start',alignItems: 'center'}}>   
            <TouchableOpacity style={{height:200,width:180, borderRadius:26, backgroundColor:'#E32A25', justifyContent:'center', alignItems:'center', marginHorizontal:'18%', marginVertical:'2%', borderWidth:1,borderColor:'#0D433D' }}
              onPress={SignInasAdmin}                     
            >
              <Image source={require('../assets/images/admin.png')} style={{ width: 140, height: 140,marginLeft:'10%' }}></Image>
            </TouchableOpacity> 
            <Text style={{fontSize:20, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> แอดมิน  </Text> 
          </View>
          

      </View>
          <View style={{ flex: 1,justifyContent: 'flex-end',alignItems: 'center',backgroundColor: 'transparent'}}>
            <Text style={{fontSize:16, color:"rgb(13,67,61)",fontFamily: 'Prompt-Regular'}}> *กรุณาเลือกตำแหน่งของคุณ </Text>
          </View>
      <View style={{flex:2}}></View>

    </LinearGradient>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 3,
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
