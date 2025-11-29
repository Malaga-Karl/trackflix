import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

export default function NavComponent(){

    const [term, setTerm] = useState("")
    const navigate = useNavigate();
    const { searchInputRef } = useSearch();

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
              <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Box display={"flex"} gap={3} alignItems={"center"}>
                    <Link style={{textDecoration:"none", color:"violet"}} to={'/'}>Trackflix</Link>
                    <Typography variant="h6" sx={{fontFamily:"Science Gothic"}}>Who's watching their shows on pirate sites? You are! 🫵😂</Typography>
                </Box>
               <TextField
  sx={{
    "& .MuiInputBase-root": {
      borderRadius: "12px",
      height: "40px",
      paddingRight: "10px",
      backgroundColor: "black",
      color: "white",
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px", // controls label and text layout
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)", // keep label centered vertically
      color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      transform: "translate(14px, -8px) scale(0.75)", // properly float when typing/focused
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#555",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#999",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
  }}
  label="Search TV Shows"
  inputRef={searchInputRef}
  variant="outlined"
  value={term}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
/>

            </Box>
        </>
    )
}