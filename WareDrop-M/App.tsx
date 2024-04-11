import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Components/Login";
import StartMenu from "./Components/StartMenu";
import My_Deliveries from "./Components/My_Deliveries";
import Available from "./Components/Available";
import Completed_Deliveries from "./Components/Completed_Deliveries";


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
          <Stack.Screen name="Available" component={Available} />
          <Stack.Screen name="My_Deliveries" component={My_Deliveries} />
          <Stack.Screen name="Completed_Deliveries" component={Completed_Deliveries} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}

