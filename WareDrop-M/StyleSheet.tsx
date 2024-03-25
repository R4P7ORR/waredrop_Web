import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        marginBottom:40
    },
    inputView:{
        backgroundColor: "#DD8538",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems:"center",

    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color:"#FFFFFF",
        textAlign:"center",
    },
    loginBtn:
        {
            width:"80%",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:"center",
            marginTop:40,
            backgroundColor:"#B55828",
        },
    img: {
        width: 300,
        height: 300,
    },
});
export default styles