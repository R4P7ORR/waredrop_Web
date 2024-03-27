interface OverlayProps {
    getType: string;
    setType: (type: string) => void;
}
function Overlay({getType, setType}: OverlayProps){
    console.log(getType)
    return(
        <div>
            {getType === "itemForm"&&
                <button onClick={() => setType("none")}>krghsebrtksejrbherkh</button>
            }
        </div>
    )
}
export default Overlay;