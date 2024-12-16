import React, {useState} from "react";
import Nav from "../../components/welcome/Nav";
import "./Auth.css"
import {doCreateUserWithEmailAndPassword} from "../../utils/auth";
import {updateProfile} from "firebase/auth";
import {auth} from "../../utils/firebase.js";
import {Link, useNavigate} from "react-router-dom";
import {addUserDoc} from "../../utils/firestore";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword === password) {
            setErrorMessage("")
            if (!isRegistering) {
                setIsRegistering(true);
                setLoading(true);
                await doCreateUserWithEmailAndPassword(email, password).catch((error) => {
                    setErrorMessage(error.message);
                })
                await updateProfile(auth.currentUser, {displayName: `${firstName} ${lastName}`}).catch((error) => {
                    setErrorMessage(error.message);
                });
                await addUserDoc().catch((error) => {
                    setErrorMessage(error.message);
                })
            }
            setLoading(false)
            navigate("/dashboard");
        } else {
            setErrorMessage("Passwords don't match");
        }
    }
    return (
        <div className="page">
            <Nav activeIndex={4}/>
            <div className="card">
                <form onSubmit={handleSubmit} className="form">
                    <input className="input" placeholder="Enter your email" type="email"
                           onChange={(e) => setEmail(e.target.value)}
                           required={true}/>
                    <input className="input" placeholder="Enter your password" type="password"
                           onChange={(e) => setPassword(e.target.value)}
                           required={true}/>
                    <input className="input" placeholder="Confirm your password" type="password"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           required={true}/>
                    <input className="input" placeholder="Enter first name" type="name"
                           onChange={(e) => setFirstName(e.target.value)}/>
                    <input className="input" placeholder="Enter last name" type="name"
                           onChange={(e) => setLastName(e.target.value)}/>
                    <button type="submit" className="sign">Sign up</button>
                </form>
                <p className="redirect">Already have an account? <Link to={"/login"}>Sign In</Link></p>
            </div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Signup;
