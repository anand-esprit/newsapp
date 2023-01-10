import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu } from "../config/Constant";

export class NavBar extends Component {
    render() {
        let activeNavLinkStyle = {
            backgroundColor: "white",
        };

        return (
            <>
                <div>
                    <nav
                        className="navbar navbar-expand-lg navbar-dark bg-dark"
                        style={{ paddingBottom: "0px" }}
                    >
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/">
                                NewsMonster
                            </NavLink>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {Menu.map((c, i) => {
                                        return (
                                            <li key={i} className="nav-item">
                                                <NavLink
                                                    to={c.path}
                                                    className="nav-link text-warning"
                                                    style={({ isActive }) =>
                                                        isActive
                                                            ? activeNavLinkStyle
                                                            : undefined
                                                    }
                                                >
                                                    {c.name}
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <Outlet />
            </>
        );
    }
}

export default NavBar;
