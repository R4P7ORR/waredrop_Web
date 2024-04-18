import {useContext, useEffect} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";
import {useNavigate} from "react-router-dom";

interface CheckForPermissionsProps{
    loginToken: string;
    setCurrentPage: (page: string) => void
}
function CheckForPermissions({loginToken, setCurrentPage}: CheckForPermissionsProps){
    const {isAdmin, setIsAdmin} = useContext(WarehouseContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginToken !== "none"){
            axios.get('http://localhost:3001/auth/isAdmin',{
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                setIsAdmin(res.data.isAdmin);
                if (isAdmin){
                    setCurrentPage("users");
                }
            }).catch((error) =>{
                if (error.response.status === 401) {
                    navigate('/unauthorized');
                }
            });
        }}, [loginToken, isAdmin]);
    return (
        <></>
    )
}
export default CheckForPermissions;