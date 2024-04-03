import axios from "axios";
import {useState} from "react";

interface UsersProps{
    loginToken: string;
}

function Users({loginToken}: UsersProps){
    const [users, setUsers] = useState([]);
    if (users.length === 0){
        axios.get('http://localhost:3001/user', {
            headers: {authorization: "Bearer " + loginToken}
        }).then(res => {
            setUsers(res.data);
        });
    }
    return(
        <>

        </>
    )
}
export default Users;