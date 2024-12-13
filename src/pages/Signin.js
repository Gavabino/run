import React, {useState} from "react";
import Nav from "../components/Nav";
import "./Auth.css"
import {doSignInWithEmailAndPassword, doSignOut} from "../utils/auth";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

function Signin() {
    //const {userLoggedIn} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("")
        if (!isSigningIn) {
            setIsSigningIn(true);
            setLoading(true);
            try {
                await doSignInWithEmailAndPassword(email, password)
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
        console.log(currentUser);
        setLoading(false);
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
                <button className="sign" onClick={() => doSignOut()}>Sign Out</button>
                <p className="redirect">Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
            </div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Signin;
