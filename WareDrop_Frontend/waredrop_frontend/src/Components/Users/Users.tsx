import axios from "axios";
import {useContext, useEffect, useState} from "react";
import User from "./User";
import UsersDisplay from "./UsersDisplay";

interface UsersProps{
    loginToken: string;
}

function Users({loginToken}: UsersProps){
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3001/user', {
            headers: {authorization: "Bearer " + loginToken}
        }).then(res => {
            setUsers(res.data);
        });
    }, [loginToken]);

    return (
        <div className="container-users container-box">
            <div className="item-name" style={{display: "flex"}}>
                <h3 className="users-details">ID</h3>
                <h3 className="users-details">NAME</h3>
                <h3 className="users-details">EMAIL</h3>
            </div>
            <div className="container-users-body">
                {users.map((user: User) => (
                    <UsersDisplay user_id={user.user_id} user_name={user.user_name} user_email={user.user_email}/>
                ))}
            </div>
        </div>
    )
}
export default Users;