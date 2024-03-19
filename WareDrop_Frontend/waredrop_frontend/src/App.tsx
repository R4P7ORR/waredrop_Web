import './Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home";
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
