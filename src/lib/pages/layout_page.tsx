import { Outlet } from "react-router-dom";
import NavComponent from "../components/nav_component";
import { SearchProvider } from "../contexts/SearchContext";

export default function Layout(){
    return(
        <SearchProvider>
            <NavComponent/>
            <br />
            <br />
            <Outlet/>
        </SearchProvider>
    )
}