import React from 'react'
import Nav from '../components/Nav'
import {useAuth} from "../contexts/AuthContext";

function Features() {
    const {currentUser} = useAuth()
    return (
        <div>
            <Nav currentpage={"Features"}/>
        </div>
    )
}

export default Features