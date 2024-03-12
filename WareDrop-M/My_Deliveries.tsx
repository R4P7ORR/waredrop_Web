import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import styles from "./StyleSheet";

function My_Deliveries({navigation}){

    return(
        <View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={navigation.navigate('StartMenu')} >
              <Text style={styles.TextInput}>Go back</Text>
            </TouchableOpacity>
        </View>
    )

}
export default My_Deliveries