import React from "react";
import {Button, Text, TouchableOpacity, View} from "react-native";
import TransDTO from "../Interfaces/AvailableShowList";
import styles from "../StyleSheet";
import {format} from "date-fns";

interface List{
    list:TransDTO[],
    onClick:(id:number)=>void
}

function AvailableList(props:List){
    return(
        <View style={styles.list}>
            {props.list.map((item) =>
         <View style={styles.listItem}
         key={item.trans_id}>
        <TouchableOpacity
        onPress={()=>props.onClick(item.trans_id)}>
            <Text style={styles.listText}>
                {item.trans_post_date ? format(item.trans_post_date, "yyyy-MM-dd") : "Unknown Date"}  {item.items.item_name}  {item.items.item_quantity}x  </Text>
        </TouchableOpacity>
         </View>)}
        </View>
    )
}
export default AvailableList