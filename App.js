import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import {HomeScreen } from './src/screens/HomeScreen';
import { RoleSelectScreen } from './src/screens/RoleSelectScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SignUpAsAdminScreen } from './src/screens/SignUpAsAdmin';
import { SignUpAsStaffScreen } from './src/screens/SignUpAsStaffScreen';
import { StaffMainScreen } from './src/screens/Staff/StaffMainScreen';
import { StaffHomeScreen } from './src/screens/Staff/StaffHomeScreen';
import { ScanScreen } from './src/screens/ScanScreen';



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
            name="SignUpAsStaff" 
            component={SignUpAsStaffScreen} 
            options={{
              title: 'ลงทะเบียนสตาฟ',
              headerStyle: {            
                backgroundColor: '#E32A25',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Prompt-Regular'
              },
            }}            
            />

            <Stack.Screen 
            name="SignUpAsAdmin" 
            component={SignUpAsAdminScreen} 
            options={{
              title: 'ลงทะเบียนแอดมิน',
              headerStyle: {            
                backgroundColor: '#E32A25',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Prompt-Regular'
              },
            }}            
            />

            <Stack.Screen 
            name="Reg" 
            component={RegisterScreen} 
            options={{
              title: 'ลงทะเบียน',
              headerStyle: {            
                backgroundColor: '#E32A25',
                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Prompt-Regular'
              },headerTitleAlign: 'center',
            }}            
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

            <Stack.Screen
            name="StaffMainInput"
            component={StaffMainScreen}
            options={{ headerShown: false }} 
            />

            
            <Stack.Screen
            name="StaffHome"
            component={StaffHomeScreen}
            options={{ headerShown: false }} 
            />

            <Stack.Screen
            name = "Scan"
            component={ScanScreen}
            options={{
              title: 'แสกนลงทะเบียน',
              headerStyle: {       
                flex: 1,     
                backgroundColor: '#E32A25',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                flex: 1,
                fontFamily: 'Prompt-Regular',
              },headerTitleAlign: 'center',
            }} 
            />
            
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    </SafeAreaView>
  );
}

