import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import styles from "./StyleSheet";

// @ts-ignore
function My_Deliveries({navigation}){

    const goBackToStartMenu = () => {
        navigation.navigate('StartMenu');
    };

    return(


        <View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={goBackToStartMenu} >
                <Text style={styles.TextInput}>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default My_Deliveries