import {useContext, useEffect, useState} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";
import Item from "./Warehouse/Item";
import swal from "sweetalert";

interface OverlayProps{
    loginToken: string;
}

function Overlay({loginToken}: OverlayProps){
    const [nameInput, setNameInput] = useState<string>("");
    const [quantityInput, setQuantityInput] = useState<number>(1);
    const [locationInput, setLocationInput] = useState<string>("");
    const {
        selectedId, setSelectedId,
        overlayType, setOverlayType,
        editingUser, setEditingUser,
        selectedItems,
        setEditingWarehouse, setDeletingWarehouse
    } = useContext(WarehouseContext);

    useEffect(() => {
        if (overlayType === "warehouseEditForm" || overlayType === "warehouseDeleteForm"){
            axios.get('http://localhost:3001/warehouses/warehouse/'+ selectedId, {
                headers: {authorization: "Bearer " + loginToken},
            }).then((res) => {
                console.log(res)
                setNameInput(res.data.warehouse_name);
                setLocationInput(res.data.location);
            });
        }
    }, [selectedId]);

    function handleAddItem(){
        if (nameInput.trim().length === 0 || quantityInput === undefined){
            swal("Oops", "Name cannot be empty!", "error", {
                buttons: {},
                timer: 1500,
            });
        } else{
            let included = false;
            let updateItem: Item;
            selectedItems.forEach(item => {
                if (item.item_name === nameInput){
                    updateItem = item;
                    included = true;
                }
            });
            swal("Success!", `Added ${quantityInput}x ${nameInput} to the database!`, "success", {
                buttons: {},
                timer: 3000,
            });
            if(included){
                axios.patch("http://localhost:3001/items", {
                    itemId: updateItem!.item_id,
                    itemQuantity: updateItem!.item_quantity + quantityInput
                }).then(() => {
                    setNameInput("");
                    setQuantityInput(1);
                    setOverlayType("none");
                }).catch(() => {
                    swal("Oops!", `This was not supposed to happen :(`, "error", {
                        buttons: {},
                        timer: 2800,
                    });
                });
            } else {
                axios.post("http://localhost:3001/items", {
                    itemName: nameInput,
                    itemQuantity: quantityInput,
                    warehouseId: selectedId
                }).then(() => {
                    setNameInput("");
                    setQuantityInput(1);
                    setOverlayType("none");
                }).catch(() => {
                    swal("Oops!", `This was not supposed to happen :(`, "error", {
                        buttons: {},
                        timer: 2800,
                    });
                });
            }
        }
    }
    function handleCreateWarehouse(){
        if (nameInput.trim().length === 0) {
            swal("Oops", "Name cannot be empty!", "error", {
                buttons: {},
                timer: 1500,
            });
        } else if (locationInput.trim().length === 0){
            swal("Oops", "Location must be defined!", "error", {
                buttons: {},
                timer: 1500,
            });
        } else {
            console.log(loginToken)
            axios.post("http://localhost:3001/warehouses", {
                warehouseName: nameInput,
                warehouseLocation: locationInput,
            },{
                headers: {authorization: "Bearer " + loginToken},
                }).then(() => {
                swal("Great!", "Successfully created warehouse!", "success", {
                    buttons: {},
                    timer: 2500,
                });
                setNameInput("");
                setLocationInput("");
                setOverlayType("none");
            }).catch(() => {
                swal("Error", "A warehouse with this name already exists!", "error", {
                    buttons: {},
                    timer: 2500,
                });
            });
        }
    }
    function handleEditWarehouse(){
        axios.patch('http://localhost:3001/warehouses', {
            warehouseId: selectedId,
            warehouseName: nameInput,
            warehouseLocation: locationInput
        },{
            headers: {authorization: "Bearer " + loginToken},
        }).then(() => {
            swal("Great!", "Successfully updated warehouse details!", "success", {
                buttons: {},
                timer: 2500,
            });
            console.log(nameInput, locationInput)
            setNameInput("");
            setLocationInput("");
            setOverlayType("none");
            setEditingWarehouse(false);
            setSelectedId(0);
        }).catch(() => {
                swal("Error", "Something went wrong :(", "error", {
                    buttons: {},
                    timer: 3000,
                });
        });
    }
    function handleDeleteWarehouse(){
        axios.delete('http://localhost:3001/warehouses', {
            headers: {authorization: "Bearer " + loginToken},
            data: {
                warehouseId: selectedId,
            }
        }).then(() => {
            swal("Great!", `Successfully deleted ${nameInput} from the database!`, "success", {
                buttons: {},
                timer: 2500,
            });
            setNameInput("");
            setLocationInput("");
            setOverlayType("none");
            setDeletingWarehouse(false);
        }).catch(() => {
            swal("Error", "Something went wrong :(", "error", {
                buttons: {},
                timer: 3000,
            });
        });
    }
    function handleEditUser(){
        if (editingUser.user_name.trim().length === 0 || editingUser.user_email.trim().length === 0){
            swal("Oh-oh!", "One or more fields have been left empty!", "error", {
                buttons: {},
                timer: 2500,
            });
        } else if(editingUser.user_name.trim().length < 3){
            swal("Oh-oh!", "Name must be at least 3 characters long!", "error", {
                buttons: {},
                timer: 2500,
            });
        } else if(editingUser.user_email.trim().length < 6){
            swal("Oh-oh!", "Email must be at least 6 characters long!", "error", {
                buttons: {},
                timer: 2500,
            });
        } else {
            axios.patch('http://localhost:3001/user', {
                userId: selectedId,
                userName: editingUser.user_name,
                userEmail: editingUser.user_email,
            }).then(() => {
                    swal("Great!", "Successfully updated user details!", "success", {
                        buttons: {},
                        timer: 2500
                    });
                    setOverlayType("none");
            }).catch(res => {
                swal("Oh-oh!", "Something went wrong :(", "error", {
                    buttons: {},
                    timer: 2500
                });
            })
        }
    }

    return(
        <>{overlayType !== "none" &&
            <div className="overlay-fullscreen">
                {overlayType !== "empty"&&
                <div className="overlay-fullscreen-container">
                    {overlayType === "itemForm" &&
                        <>
                            <h2 className="text-light">New Item</h2>
                            <hr className="hr-left"/>
                            <input autoFocus={true} type="text" placeholder="Name" value={nameInput} maxLength={30} onChange={(e) => {
                                const name = e.target.value;
                                setNameInput(name);
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleAddItem();
                               }}/>
                            <input type="number" placeholder="Quantity" value={quantityInput} onChange={(e) => {
                                const quantity = e.target.value;
                                if (quantity.length >9) {
                                    return null;
                                }
                                if (quantity.length === 0 || Number.parseInt(quantity) < 1) {
                                    setQuantityInput(1);
                                } else {
                                    setQuantityInput(Number.parseInt(quantity));
                                }

                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleAddItem();
                               }}/>
                            <button onClick={handleAddItem}>Add</button>
                        </>
                    }
                    {overlayType === "warehouseAddForm" &&
                        <>
                            <h2 className="text-light">New Warehouse</h2>
                            <input placeholder="Name" type="text" value={nameInput} maxLength={30} onChange={(e) => {
                                const name = e.target.value;
                                setNameInput(name);
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleCreateWarehouse();
                               }}/>
                            <input placeholder="Location" type="text" value={locationInput} maxLength={30} onChange={(e) => {
                                const location = e.target.value;
                                setLocationInput(location);
                            }}
                               onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleCreateWarehouse();
                               }}/>
                            <button onClick={handleCreateWarehouse}>Create</button>
                        </>
                    }
                    {overlayType === "warehouseEditForm" &&
                        <>
                            <h2 className="text-light">Edit details of Warehouse</h2>
                            <input type="text" value={nameInput} onChange={(e) => {
                                const name = e.target.value;
                                setNameInput(name);
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleEditWarehouse();
                               }}/>
                            <input type="text" value={locationInput} onChange={(e) => {
                                const location = e.target.value;
                                setLocationInput(location);
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleEditWarehouse();
                               }}/>
                            <button onClick={handleEditWarehouse}>Confirm</button>
                        </>
                    }
                    {overlayType === "warehouseDeleteForm" &&
                        <>
                            <h2 className="text-light">Are you sure you want to delete {nameInput}?</h2>
                            <button onClick={handleDeleteWarehouse}>Confirm</button>
                        </>
                    }
                    {overlayType === "userEditForm" &&
                        <>
                            <h2 className="text-light">Edit User Details</h2>
                            <input placeholder="Name" type="text" value={editingUser.user_name} onChange={(e) => {
                                const name = e.target.value;
                                setEditingUser({user_name: name, user_email: editingUser.user_email});
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleEditUser();
                               }}/>
                            <input placeholder="Email" type="text" value={editingUser.user_email} onChange={(e) => {
                                const email = e.target.value;
                                setEditingUser({user_name: editingUser.user_name, user_email: email});
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleEditUser();
                               }}/>
                            <button onClick={handleEditUser}>Confirm</button>
                        </>
                    }
                        <button onClick={() => {
                            setNameInput("");
                            setQuantityInput(1);
                            setLocationInput("");
                            setOverlayType("none");
                            setSelectedId(0);
                        }}>Cancel</button>
                </div>
                }
            </div>
        }</>
    )
}

export default Overlay;