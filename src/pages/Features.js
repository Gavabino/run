import React from 'react'
import Nav from '../components/Nav'
import {useAuth} from "../contexts/AuthContext";

function Features() {
    const {currentUser} = useAuth()
    return (
        <div>
            <Nav currentpage={"Features"}/>
            <h1>Hello, {currentUser.displayName ? currentUser.displayName : currentUser.email}</h1>
        </div>
    )
}

export default Features