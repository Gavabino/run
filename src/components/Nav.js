import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";

function Nav({currentPage}) {
    let activeIndex;
    switch (currentPage) {
        case "Home":
            activeIndex = 0;
            break;
        case "Features":
            activeIndex = 1;
            break;
        case "Usage":
            activeIndex = 2;
            break;
        case "App":
            activeIndex = 3;
            break;
        case "Sign Up":
            activeIndex = 4;
            break;
        case "Sign In":
            activeIndex = 5;
            break;
        default:
            activeIndex = 0;
            break;
    }
    return (
        <div className="navbar">
            {/* Logo */}
            <img alt="logo" className="logo" src={logo}/>
            <div className="buttons">
                {/* Home */}
                <Link className={activeIndex === 0 ? "activeLink" : "link"} to={"/"}>
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
                <Link className={activeIndex === 3 ? "activeLink" : "link"} to={"/homescreen"}>App</Link>
                {/* Sign in */}
                <Link className={activeIndex === 5 ? "activeLogin" : "login"} to={"/signin"}>Sign In</Link>
                {/* Sign up */}
                <Link className={activeIndex === 4 ? "activeLogin" : "login"} to={"/signup"}>Sign Up</Link>
            </div>
        </div>
    );
}

export default Nav;
