import axios from "axios";
import {useContext, useEffect, useState} from "react";
import User from "./User";
import UsersDisplay from "../../Displays/UsersDisplay";
import WarehouseContext from "../../Contexts/WarehouseContext";
import {useNavigate} from "react-router-dom";

interface UsersProps{
    loginToken: string;
}

function Users({loginToken}: UsersProps){
    const navigate = useNavigate();
    const {users, setUsers, overlayType} = useContext(WarehouseContext);

    useEffect(() => {
        if (overlayType === "none" && loginToken !== "none"){
            axios.get('http://localhost:3001/user', {
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                setUsers(res.data);
            }).catch(error => {
                if (error.response.status === 401){
                    navigate('/unauthorized');
                }
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
                return a.user_name.toLowerCase() > b.user_name.toLowerCase() ? 1: -1;
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
                <div className="align-horizontal">
                    <div className="item-name clickable align-horizontal">
                        <h3 className="users-id" onClick={() => SortUsers("id")}>ID</h3>
                        <h3 className="users-details" onClick={() => SortUsers("name")}>NAME</h3>
                        <h3 className="users-details" onClick={() => SortUsers("email")}>EMAIL</h3>
                    </div>
                    <div className="user-role-checkers">
                        <h3>ADMIN/WORKER</h3>
                    </div>
                </div>
                <div className="container-users-body">
                    {users.length!== 0?
                        users.map((user: User) => (
                        <UsersDisplay loginToken={loginToken} user_id={user.user_id} user_name={user.user_name} user_email={user.user_email}/>
                        ))
                        :
                        <>
                            <h2 style={{textAlign: "center"}}>Registered users will appear here</h2>
                        </>
                    }
                </div>
            </>}
        </div>
    )
}
export default Users;