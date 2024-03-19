import {useState} from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import '../Styles/LogRegForm.css';

function HomeDisplay() {
    const [classList, setClassList] = useState('container');
    return(
        <div className="home-container">
            <div className={classList}>
                <div className="form-container register-container">
                    <Register handleRegister={setClassList}/>
                </div>
                <div className="form-container login-container">
                    <Login/>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Hello there!</h1>
                            <p>Already have an account? Login here!</p>
                            <button className="ghost" onClick={() => {
                                setClassList('container');
                            }}>Login
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome back!</h1>
                            <p>Not a member yet? Register here!</p>
                            <button className="ghost" onClick={() => {
                                setClassList('container right-panel-active');
                            }}>Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDisplay