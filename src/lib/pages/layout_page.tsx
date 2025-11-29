import { Outlet } from "react-router-dom";
import NavComponent from "../components/nav_component";

export default function Layout(){
    return(
        <>
            <NavComponent/>
            <Outlet/>
        </>
    )
}