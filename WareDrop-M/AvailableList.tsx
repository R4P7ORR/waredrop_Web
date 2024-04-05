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
        <View style={styles.list}>
            {props.list.map((item) =>
        <TouchableOpacity
         key={item.trans_id}
        onPress={()=>props.onClick(item.trans_id)}
        >
            <Text style={styles.listItem}>
                Date: {item.trans_post_date ? format(item.trans_post_date, "yyyy-MM-dd") : "Unknown Date"}
                Item name:  {item.item_item_name}
                Item quantity: {item.item_item_quantity}  </Text>
        </TouchableOpacity>)}
        </View>
    )
}
export default AvailableList