// TODO:
// ✅ Make dummy data - schema is just id, name, image URL
// ✅ if dummy data exist on local storage, display component
// if dummy data doesnt exist, display no shows yet
// if kaya, highlight search bar if wala pang shows
// add nav bar with title

import Box from "@mui/material/Box";
import ShowComponent from "../components/shows_component";
// import data from "../mocks/localStorageMock.json";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import NavComponent from "../components/nav_component";

export default function HomeScreen(){

    const savedShows = localStorage.getItem('myShows');

    return(
        <>
            <Box sx={{
                display:"flex",
                gap: 3
            }}>
                {shows.map((show) => (
                    ShowComponent({show})
                ))}
            </Box>
        </>
    )
}