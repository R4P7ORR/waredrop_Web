import axios from "axios";
import {useContext, useEffect, useState} from "react";
import User from "./User";
import UsersDisplay from "../../Displays/UsersDisplay";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface UsersProps{
    loginToken: string;
}

function Users({loginToken}: UsersProps){
    const {users, setUsers, overlayType} = useContext(WarehouseContext);

    useEffect(() => {
        if (overlayType === "none" && loginToken !== "none"){
            axios.get('http://localhost:3001/user', {
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                setUsers(res.data);
            });
        }
    }, [loginToken, overlayType]);

    function SortUsers(sortBy: string){
        let updateUsers: User[];
        if (sortBy === "id"){
             updateUsers = [...users].sort((a,b) => {
                return a.user_id > b.user_id ? 1: -1;
            });
        } else if(sortBy === "name"){
            updateUsers = [...users].sort((a,b) => {
                return a.user_name > b.user_name ? 1: -1;
            });
        } else {
            updateUsers = [...users].sort((a,b) => {
                return a.user_email > b.user_email ? 1: -1;
            });
        }
        setUsers(updateUsers)
    }

    return (
        <div className="container-users container-box">
            {users.length === 0? <h1 style={{textAlign: "center"}}>There are no other users!</h1>:<>
                <div className="item-name clickable" style={{display: "flex"}}>
                    <h3 className="users-details" onClick={() => SortUsers("id")}>ID</h3>
                    <h3 className="users-details" onClick={() => SortUsers("name")}>NAME</h3>
                    <h3 className="users-details" onClick={() => SortUsers("email")}>EMAIL</h3>
                </div>
                <div className="container-users-body">
                    {users.map((user: User) => (
                        <UsersDisplay loginToken={loginToken} user_id={user.user_id} user_name={user.user_name} user_email={user.user_email}/>
                    ))}
                </div>
            </>}
        </div>
    )
}
export default Users;