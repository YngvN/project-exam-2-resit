import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import Main from "./main/main"

export function Layout() {


    return (
        <div>
            <Header />
            <main>
                <Main />
            </main>
            <Footer />
        </div>
    )
}