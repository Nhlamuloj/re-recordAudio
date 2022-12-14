import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage'

const Stack = createNativeStackNavigator();
export default function App (){
  return(
    <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen options={{headerShown:false}} name="LoginPage" component={LoginPage} />
       <Stack.Screen options={{headerShown:false}} name="RegisterPage" component={RegisterPage} />
       <Stack.Screen options={{headerShown:false}} name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )

    

  
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
})