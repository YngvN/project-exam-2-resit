import React from "react";
import { Link } from "react-router-dom";
import Nav from "./nav/nav";
import LogoComponent from "../../components/logo/logoComponent";
import './headerStyle.scss';

export function Header() {
    return (
        <header>
            <Link to="/home" aria-label="Go to Home">
                <LogoComponent />
            </Link>
            <Nav />
        </header>
    );
}
