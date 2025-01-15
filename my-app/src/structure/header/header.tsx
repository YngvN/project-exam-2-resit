import React from "react";
import Nav from "./nav/nav";
import LogoComponent from "../../components/logo/logoComponent";
import './headerStyle.scss';



export function Header() {

    return (
        <header>
            <LogoComponent />
            <Nav />
        </header>
    );
}