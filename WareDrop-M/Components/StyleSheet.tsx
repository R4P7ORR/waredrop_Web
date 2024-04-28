import {StyleSheet} from 'react-native';
const main_color= '#ffa600';
const dark_gray= '#171717';
const dar_blue= '#2e1372';
const bright_gray= '#2a2a2a';


const styles = StyleSheet.create({
    background:{
        backgroundColor:bright_gray,
        flex:1,
    },
    container: {
        flex: 1,
        backgroundColor:bright_gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        marginBottom:40
    },
    inputView:{
        backgroundColor: dar_blue,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems:"center",
        justifyContent:"center",

    },
    Text:{
      color:main_color,
      fontSize:20,
      fontWeight:"bold"
    },
    SimpleText:{
       marginTop:5,
      color:main_color
    },
    TextInput: {
        height:"100%",
        width:"100%",
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color:main_color,
        textAlign:"center",
        fontSize:15,
    },
    LoginText:{
        height:"100%",
        width:"100%",
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color:'white',
        textAlign:"center",
        fontSize:15,
    },
    loginBtn:
        {
            width:"80%",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:"center",
            marginTop:40,
            backgroundColor:dark_gray,
        },
    img: {
        width: 300,
        height: 300,
    },
    list:{
        backgroundColor:bright_gray,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    listItem:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:8,
        padding:8,
        borderWidth:1,
        borderRadius:4,
        borderColor:main_color,
        fontSize:18,
        width:'100%',
    },
    listText:{
        color:'white',

    },
    TouchableOpacity:{
        height:50,
        backgroundColor:dar_blue,
        justifyContent:'center',
        alignItems:'center',
        fontSize:18,
        borderRadius:25,
        width:'80%',
    },
    touchable2:{
        width:'50%',
    },
    touchable1:{
        width:'80%'
    }
    ,
    details_con:{
        flexDirection:"row",
        justifyContent:"center",
        margin:10
    },
    details:{
        fontSize:18,
        padding:4,
        borderBottomColor:main_color,
        borderRadius:10,
        color:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    page:{
        paddingTop:40,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }


});
export default styles