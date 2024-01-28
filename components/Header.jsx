import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }
    
    return (
        <header>
            <Link className="site-logo" to="/">#Sel'sVans</Link>
            <nav className="navigation">
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
            </nav>
        </header>
    )
}