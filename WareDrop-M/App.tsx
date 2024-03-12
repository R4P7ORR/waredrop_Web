import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Login";
import StartMenu from "./StartMenu";
import My_Deliveries from "./My_Deliveries";
import Avaliable from "./Avaliable";


export const Stack = createNativeStackNavigator();
export default function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login"
                    component={Login}
                    options={{title:'Welcome'}}
      />
      <Stack.Screen name="StartMenu" component={StartMenu}/>
      <Stack.Screen name="Avaliable" component={Avaliable} />
      <Stack.Screen name="My_Deliveries" component={My_Deliveries} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

