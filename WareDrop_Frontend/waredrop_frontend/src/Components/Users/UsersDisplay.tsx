import {useContext} from "react";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface UsersDisplayProps{
    user_id: number;
    user_name: string;
    user_email: string
}

function UsersDisplay({user_id, user_name, user_email}: UsersDisplayProps){
    const {setOverlayType, setEditingUser} = useContext(WarehouseContext);

    return (
        <div className="item-container">
            <div className="item-name align-horizontal">
                <h4 className="users-details">{user_id}</h4>
                <h4 className="users-details">{user_name}</h4>
                <h4 className="users-details">{user_email}</h4>
            </div>
            <input type="checkbox" className="switch" checked={false} onInput={() => {}}/>
            <input type="checkbox" className="switch" checked={false} onInput={() => {}}/>
            <button className="inline-button" onClick={() => {
                setOverlayType("userEditForm");
                setEditingUser({user_name, user_email});
            }}>Edit
            </button>
        </div>
    )
}
export default UsersDisplay;