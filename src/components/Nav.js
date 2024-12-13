import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";
import {useAuth} from "../contexts/AuthContext";

function Nav({activeIndex}) {
    const {currentUser} = useAuth()
    return (
        <div className="navbar">
            {/* Logo */}
            <img alt="logo" className="logo" src={logo}/>
            <div className="buttons">
                {/* Home */}
                <Link className={activeIndex === 0 ? "activeLink" : "link"} to={currentUser ? "/homescreen" : "/"}>
                    Home
                </Link>
                {/* Features */}
                <Link
                    className={activeIndex === 1 ? "activeLink" : "link"}
                    to={"/features"}>
                    Features
                </Link>
                {/* Usage */}
                <Link className={activeIndex === 2 ? "activeLink" : "link"} to={"/usage"}>Usage</Link>
                {/* App */}
                <Link className={activeIndex === 3 ? "activeLink" : "link"} to={"/app"}>App</Link>
                {/* Sign in */}
                <Link className={activeIndex === 5 ? "activeLogin" : "login"} to={"/signin"}>Sign In</Link>
                {/* Sign up */}
                <Link className={activeIndex === 4 ? "activeLogin" : "login"} to={"/signup"}>Sign Up</Link>
            </div>
        </div>
    );
}

export default Nav;
