// TODO:
// ✅ Make dummy data - schema is just id, name, image URL
// ✅ if dummy data exist on local storage, display component
// if dummy data doesnt exist, display no shows yet
// if kaya, highlight search bar if wala pang shows
// add nav bar with title

import Box from "@mui/material/Box";
import ShowComponent from "../components/shows_component";
import data from "../mocks/localStorageMock.json";

export default function HomeScreen(){

    const shows = data;

    return(
        <>
            <Box sx={{
                display:"flex"
            }}>
                {shows.map((show) => (
                    ShowComponent({show})
                ))}
            </Box>
        </>
    )
}