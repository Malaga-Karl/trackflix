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
                    {/* <Link style={{textDecoration:"none", color:"violet"}} to={'/'}>Trackflix</Link> */}
                    <Typography variant="h6" sx={{fontFamily:"Science Gothic"}}>Who's watching their shows on pirate sites? You are! 🫵😂</Typography>
                </Box>
               <TextField
                                  
                sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111",
                      color: "white",
                      borderRadius: "12px",
                      height: 40,

                      "& input": {
                        padding: "10px 12px",
                      },
                    },

                    // --- LABEL FIX (IMPORTANT) ---
                    "& .MuiInputLabel-root": {
                      color: "white",
                      transform: "translate(14px, 10px) scale(1)",   // default position
                      transition: "all 0.2s ease"
                    },

                    // when focused -> float
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                      transform: "translate(14px, -6px) scale(0.75)",
                    },

                    // when has value (filled) -> float even without focus
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                      color: "white",
                      transform: "translate(14px, -6px) scale(0.75)",
                    },

                    // border color
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    }
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