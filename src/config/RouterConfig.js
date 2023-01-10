import React from "react";
import { useRoutes } from "react-router-dom";
import NavBar from "../components/NavBar";
import News from "../components/News";
import { Menu } from "./Constant";

export default function Router() {
    // console.log(RouterConfig);
    // const element = useRoutes(RouterConfig);
    return useRoutes(RouterConfig);
}

let CategoryMenus = () => {
    const m = Menu.map((m) => {
        return {
            path: m.path,
            element: <News exact key={m.path} category={m.category} />,
        };
    });
    return m;
};

export const RouterConfig = [
    {
        path: "/",
        element: <NavBar />,
        children: CategoryMenus(),
    },
];
