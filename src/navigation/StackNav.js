import React from "react";
import { HomeScreen } from "../screens/SignInAsStaffScreen";
import { SplashScreen } from "../screens/SplashScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';


export const StackNav = ()=>{
  const Stack = createNativeStackNavigator()

  return(
    
    <Stack.Navigator
      initialRouteName="SplashScreen" 
    >
      {/* Splash Screen */}
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
      />

    </Stack.Navigator>
  )
}