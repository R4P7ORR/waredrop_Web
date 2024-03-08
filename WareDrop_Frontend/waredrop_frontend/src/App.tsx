import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import NotFound from "./Routes/NotFound";
import {useState} from "react";
import Control from "./Routes/Control";

export default function App(){
    const [loginToken, setLoginToken] = useState<number | undefined>();

    function handleToken(id: number) {
        setLoginToken(id);
    }

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="login" element={<Login setLoginToken={handleToken}/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="control" element={<Control loginToken={loginToken}/>}/>
                </Routes>
            </BrowserRouter>
    )
}
