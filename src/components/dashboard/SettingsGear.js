import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import "./DashboardNav.css"
import {doSignOut} from "../../utils/auth";
import {useNavigate} from "react-router-dom";

const SettingsGear = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleClickOutside = (e) => {
        if (!e.target.closest(".settings-container")) {
            setIsOpen(false);
        }
    };

    const handleSignOut = () => {
        doSignOut().then(() => {
                navigate("/");
            }
        );
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="settings-container">
            {/* Gear Icon */}
            <button onClick={() => setIsOpen(!isOpen)} className="gear-button">
                <FontAwesomeIcon icon={faGear}/>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="dropdown">
                    <button className="dropdown-button" onClick={() => navigate("/profile")}>Profile</button>
                    <button className="dropdown-button" onClick={() => navigate("/settings")}>Settings</button>
                    <button className="dropdown-button" onClick={handleSignOut}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default SettingsGear;