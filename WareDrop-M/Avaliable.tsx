import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import React from "react";

function Avaliable({navigation}){



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

    export default Avaliable