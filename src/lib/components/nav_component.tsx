import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavComponent(){

    const [term, setTerm] = useState("")
    const navigate = useNavigate();

    const handleSearch = () => {
        if(term.trim() == "") return;
        navigate(`/search?q=${encodeURIComponent(term)}`);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        handleSearch();
        }
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    };


    return(
        <>
              <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Link to={'/'}>Home</Link>
                <Typography variant="h6">Who's watching their shows on pirate sites? You are! 🫵😂</Typography>
                <TextField
                    label="Search TV Shows"
                    variant="outlined"
                    value={term}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // <-- works now
                />
            </Box>
        </>
    )
}