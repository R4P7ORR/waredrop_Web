import './Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import Control from "./Routes/Control";
import Unauthorized from "./Routes/Unauthorized";

export default function App(){
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="unauthorized" element={<Unauthorized/>}/>
                    <Route path="control" element={<Control/>}/>
                </Routes>
            </BrowserRouter>
    )
}
