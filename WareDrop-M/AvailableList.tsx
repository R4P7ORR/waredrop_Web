import React from "react";
import {Button, Text, TouchableOpacity, View} from "react-native";
import TransDTO from "./AvailableShowList";
import styles from "./StyleSheet";
import {format} from "date-fns";

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
            <Text> Id: {item.trans_id}, Date: {item.trans_post_date ? format(item.trans_post_date, "yyyy-MM-dd") : "Unknown Date"}  </Text>
        </TouchableOpacity>)}
        </View>
    )
}
export default AvailableList