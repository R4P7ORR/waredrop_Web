import axios from "axios";
import {useContext, useEffect, useState} from "react";
import User from "./User";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface UsersProps{
    loginToken: string;
}

function Users({loginToken}: UsersProps){
    const [users, setUsers] = useState<User[]>([]);
    const {setOverlayType, setEditingUser} = useContext(WarehouseContext);
    useEffect(() => {
        axios.get('http://localhost:3001/user', {
            headers: {authorization: "Bearer " + loginToken}
        }).then(res => {
            setUsers(res.data);
        });
    }, [loginToken]);

    return(
        <div>
            {users.map((user: User) => (
                <div className="item-container">
                    <div className="item-name align-horizontal">
                        <h4>id: {user.user_id} name: {user.user_name} email: {user.user_email}</h4>
                    </div>
                    <button onClick={() => {
                        setOverlayType("userEditForm");
                        setEditingUser(user);
                    }}>Edit</button>
                </div>
            ))}
        </div>
    )
}
export default Users;