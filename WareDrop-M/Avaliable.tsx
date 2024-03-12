import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import React from "react";

function Avaliable({navigation}){

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
export default Avaliable