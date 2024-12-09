import React, {useState} from "react";
import Nav from "../components/Nav";
import "./Auth.css"
import {doCreateUserWithEmailAndPassword} from "../utils/auth";
import {updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase.js";
import {Link} from "react-router-dom";
import {addUserDoc} from "../utils/firestore";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    //const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password);
            await updateProfile(auth.currentUser, {displayName: `${firstName} ${lastName}`});
            await addUserDoc()
        }
    }
    return (
        <div className="page">
            <Nav currentPage={"Sign Up"}/>
            <div className="card">
                <form onSubmit={handleSubmit} className="form">
                    <input className="input" placeholder="Enter your email" type="email"
                           onChange={(e) => setEmail(e.target.value)}
                           required={true}/>
                    <input className="input" placeholder="Enter your password" type="password"
                           onChange={(e) => setPassword(e.target.value)}
                           required={true}/>
                    {/*<input className="input" placeholder="Confirm your password" type="password"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           required={true}/>*/}
                    <input className="input" placeholder="Enter first name" type="name"
                           onChange={(e) => setFirstName(e.target.value)}/>
                    <input className="input" placeholder="Enter last name" type="name"
                           onChange={(e) => setLastName(e.target.value)}/>
                    <button type="submit" className="sign">Sign up</button>
                </form>
                <p className="redirect">Already have an account? <Link to={"/signin"}>Sign In</Link></p>
            </div>
        </div>
    );
}

export default Signup;
