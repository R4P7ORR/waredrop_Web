import {useContext, useEffect} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";

interface CheckForPermissionsProps{
    loginToken: string;
    setCurrentPage: (page: string) => void
}
function CheckForPermissions({loginToken, setCurrentPage}: CheckForPermissionsProps){
    const {isAdmin, setIsAdmin} = useContext(WarehouseContext);
    useEffect(() => {
        if (loginToken !== "none"){
            axios.get('http://localhost:3001/auth/isAdmin',{
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                setIsAdmin(res.data.isAdmin);
                if (isAdmin){
                    setCurrentPage("users");
                }
            })

        }}, [loginToken, isAdmin]);
    return (
        <></>
    )
}
export default CheckForPermissions;