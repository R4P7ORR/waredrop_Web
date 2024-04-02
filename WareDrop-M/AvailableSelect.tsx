import React from "react";
import TransDTO from "./AvailableShowList";
import {Text, TouchableOpacity, View} from "react-native";

interface ShowList{
    list:TransDTO
    back:()=>void
}
function AvailableSelect(props:ShowList){


    return(
        <View>
        <Text>Id:{props.list.trans_id}</Text>
        <Text>Date:{props.list.trans_post_date}</Text>
        <Text>Origin:{props.list.trans_origin}</Text>
        <Text>Target:{props.list.trans_target}</Text>
        <Text>Item:{props.list.item_item_id}</Text>
        <Text>Warehouse:{props.list.warehouse_warehouse_id}</Text>
        <TouchableOpacity onPress={props.back}>
        <Text>Go back </Text>
        </TouchableOpacity>
        </View>
    )

}
export default AvailableSelect