import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { SignInAsStaffScreen } from './src/screens/SignInAsStaffScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import {HomeScreen } from './src/screens/HomeScreen';
import { RoleSelectScreen } from './src/screens/RoleSelectScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SignInAsAdminScreen } from './src/screens/SignInAsAdmin';



const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
      <NavigationContainer>        
          <Stack.Navigator>
            <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }}      
            />

            <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}             
            />

            <Stack.Screen 
            name="SignInAsStaff" 
            component={SignInAsStaffScreen} 
            options={{ headerShown: false }}             
            />

            <Stack.Screen 
            name="SignInAsAdmin" 
            component={SignInAsAdminScreen} 
            options={{ headerShown: false }}             
            />

            <Stack.Screen 
            name="Reg" 
            component={RegisterScreen} 
            options={{ headerShown: false }}             
            />

            <Stack.Screen
            name="Home"
            component={HomeScreen} 
            options={{ headerShown: false }}  
           
            />

            <Stack.Screen
            name="Role"
            component={RoleSelectScreen} 
            options={{ headerShown: false }}  
           
            />
            
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    </SafeAreaView>
  );
}

