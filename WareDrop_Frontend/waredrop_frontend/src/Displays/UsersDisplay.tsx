import {useContext, useEffect, useState} from "react";
import WarehouseContext from "../Contexts/WarehouseContext";
import axios from "axios";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

interface UsersDisplayProps{
    user_id: number;
    user_name: string;
    user_email: string
    loginToken: string;
}

function UsersDisplay({user_id, user_name, user_email, loginToken}: UsersDisplayProps){
    const navigate = useNavigate();
    const [adminSwitch, setAdminSwitch] = useState<boolean>(false);
    const [workerSwitch, setWorkerSwitch] = useState<boolean>(false);
    const {overlayType, setOverlayType, setEditingUser, setSelectedId} = useContext(WarehouseContext);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:3001/roles/'+ user_id,{
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                if (res.data.length === 2){
                    setAdminSwitch(true);
                    setWorkerSwitch(true);
                } else if(res.data[0] === "Admin"){
                    setWorkerSwitch(false);
                    setAdminSwitch(true);
                } else if(res.data[0] === "Worker"){
                    setAdminSwitch(false);
                    setWorkerSwitch(true);
                } else {
                    setAdminSwitch(false);
                    setWorkerSwitch(false);
                }
            }).catch(error => {
                if (error.response.status === 401){
                    navigate('/unauthorized');
                }
            });
        }, 200);

    }, [overlayType]);

    function handleSwitch(type: string){
        if (user_id === 1){
            swal("Forbidden!", `You cannot change that, because ${user_name} is a root administrator!`, "error", {
                buttons: {},
                timer: 2500,
            }).then(() => {
                setOverlayType("none");
            });
        } else {
            swal({
                title: "Are you sure?",
                text: `Are you sure you want to turn ${type === "admin" ?
                    `${adminSwitch ? "OFF" : "ON"} administrative permissions` :
                    `${workerSwitch ? "OFF" : "ON"} worker permissions`
                } for ${user_name}?`,
                icon: "warning",
                buttons: {"Yes": {value: true}, "No": {value: false}},
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((willChange) => {
                setOverlayType("none");
                if (willChange) {
                    let remove = "";
                    if (type === "admin") {
                        if (adminSwitch) {
                            remove = "/remove"
                        }
                    } else {
                        if (workerSwitch) {
                            remove = "/remove";
                        }
                    }
                    axios.patch('http://localhost:3001/roles' + remove, {
                        roleId: type === "admin" ? 1 : 2,
                        userId: user_id,
                    }, {
                        headers: {
                            authorization: "Bearer " + loginToken
                        }
                    }).then(() => {
                        swal("Great!", `Successfully changed roles for ${user_name}!`, "success", {
                            buttons: {},
                            timer: 2500,
                        });
                    }).catch((error) => {
                        if (error.response.status === 401){
                            navigate('/unauthorized');
                        }
                        swal("Oh-oh!", `Something went wrong!`, "error", {
                            buttons: {},
                            timer: 2500,
                        });
                    });
                }
            });
        }
    }

    return (
        <div className="item-container">
            <div className="item-name align-horizontal">
                <h4 className="users-id" style={{margin: 0}}>{user_id}</h4>
                <h4 className="users-details" style={{margin: 0}}>{user_name}</h4>
                <h4 className="users-details" style={{margin: 0}}>{user_email}</h4>
            </div>
            <input type="checkbox" className="switch" checked={adminSwitch} onInput={() => {
                handleSwitch("admin");
                setOverlayType("empty");
            }}/>
            <input type="checkbox" className="switch" checked={workerSwitch} onInput={() => {
                handleSwitch("worker");
                setOverlayType("empty");
            }}/>
            <button className="inline-button" onClick={() => {
                if (user_id === 1) {
                    handleSwitch("admin");
                } else {
                    setOverlayType("userEditForm");
                    setSelectedId(user_id);
                    setEditingUser({user_name, user_email});
                }
            }}>Edit
            </button>
        </div>
    )
}
export default UsersDisplay;