import React from "react";
import TransDTO from "./AvailableShowList";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import {format} from "date-fns";

interface ShowList{
    list:TransDTO
    back:()=>void
    update:(id:number)=>void
}
function AvailableSelect(props:ShowList){


    return(
        <View >
        <Text>Date:{format(props.list.trans_post_date, "yyyy-MM-dd")}</Text>
        <Text>Origin:{props.list.trans_origin}</Text>
        <Text>Target:{props.list.trans_target}</Text>
        <Text>Item:{props.list.item_item_id}</Text>
        <Text>Warehouse:{props.list.warehouse_warehouse_id}</Text>
            <View>
        <TouchableOpacity
            onPress={()=>props.back()}>
        <Text>Go back </Text>
        </TouchableOpacity>
         <TouchableOpacity
             onPress={()=>props.update(props.list.trans_id)}>
             <Text>Confirm</Text>
         </TouchableOpacity>
            </View>
        </View>
    )

}
export default AvailableSelect