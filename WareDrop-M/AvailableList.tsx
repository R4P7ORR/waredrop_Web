import React from "react";
import {Button, Text, TouchableOpacity, View} from "react-native";
import TransDTO from "./AvailableShowList";
import styles from "./StyleSheet";

interface List{
    list:TransDTO[],
    onClick:(id:number)=>void


}

function AvailableList(props:List){
    return(
        <View >
            {props.list.map((item) =>
        <TouchableOpacity
         key={item.trans_id}
        onPress={()=>props.onClick(item.trans_id)}
        >
            <Text> {item.trans_id}, {item.trans_post_date.substring(0,10)}  </Text>
        </TouchableOpacity>)}
        </View>
    )
}
export default AvailableList