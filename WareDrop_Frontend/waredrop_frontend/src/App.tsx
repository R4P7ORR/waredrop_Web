import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Routes/Home";
import Register from "./Components/Register";
import NotFound from "./Routes/NotFound";
import Control from "./Routes/Control";

export default function App(){
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="control" element={<Control/>}/>
                </Routes>
            </BrowserRouter>
    )
}
