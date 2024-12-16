import React, {useState} from "react";
import Nav from "../../components/welcome/Nav";
import "./Auth.css"
import {doSignInWithEmailAndPassword} from "../../utils/auth";
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("")
        if (!isSigningIn) {
            setIsSigningIn(true);
            setLoading(true);
            try {
                await doSignInWithEmailAndPassword(email, password).then(() => {
                    console.log(currentUser);
                    setLoading(false);
                    navigate("/dashboard");
                })
            } catch (error) {
                setIsSigningIn(false);
                setLoading(false);
                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    setErrorMessage("Network error");
                } else {
                    setErrorMessage(error.message);
                }
            }
        }
    }
    return (
        <div className="page">
            <Nav activeIndex={5}/>
            <div className="card">
                <form onSubmit={handleSubmit} className="form">
                    <input className="input" placeholder="Enter your email" type="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required={true}/>
                    <input className="input" placeholder="Enter your password" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required={true}/>
                    <button className="sign" type="submit">Sign In</button>
                </form>
                <p className="redirect">Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Login;
