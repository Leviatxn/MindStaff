import { View, Text, Image} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import firestore from '@react-native-firebase/firestore';



export const HomeScreen =  ({ navigation })=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const profile = firestore().collection('users').doc(userUID).get();

    useEffect(()=>{
        const timeout = setTimeout(handlecheckrole,2000);
        return() => clearTimeout(timeout);
    },[])


    const handlecheckrole = () => {
        const event = profile._j._data.eventID;  
        const role = profile._j._data.role;   
/*         console.log(role);  */
        if(role === 'Admin') {
            console.log('Hi Admin')
/*             navigation.navigate(''); */

        }
        else if(role === 'Staff'){
            console.log('Hi Staff')
            if(event != ""){
                navigation.navigate('StaffHome');
            }
            else{
                navigation.navigate('StaffMainInput');
            }
        }
        else{
            console.log('Who are you')
                navigation.navigate('Role'); 
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
        <TouchableOpacity
            style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}
            onPress={handlecheckrole}
        > 
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
            <Text style={styles.header}> สวัสดี </Text>
        </View>
        </TouchableOpacity>
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
    header: {
        color:"rgb(13,67,61)",
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontFamily: 'Prompt-Regular',
        fontSize : 24,

    }
  });