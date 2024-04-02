import axios from "axios";
import {useState} from "react";

function Users(){
    const [users, setUsers] = useState([]);
    if (users.length === 0){
        axios.get('http://localhost:3001/user/listAll', {
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