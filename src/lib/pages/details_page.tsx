// TODO:
// call api on specific data on the details with ID
// Dsiplay data
// add an add button to add on currently watching

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

type ShowDetails = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string,
  genres: string[]
  status: string,
  runtime: number,
  averageRuntime: number,
  premiered: string,
  ended?: string,
  rating: {
    average: number
  },
  image: {
    medium: string;
    original: string;
  },
  summary: string;
}

export default function ShowDetails(){
    
    const {id} = useParams<{id: string}>();
    const [details, setDetails] = useState<ShowDetails>()
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(res => res.json())
        .then((data) => setDetails(data))
        .finally(() => setLoading(false));
    }, [id])

    if (loading) return <Typography>Loading...</Typography>;
    if (!details) return <Typography>Show not found</Typography>;
    
  return (
    <Box p={2} sx={{display:"flex", gap:5}}>
      <img src={details.image?.original} alt={details.name} width={300}/>
      <Box>
        <Typography variant="h2" sx={{fontWeight:"bold"}}>{details.name}</Typography>
        <Typography variant="body1">Genres: {details.genres.join(', ')}</Typography>
        <Typography variant="body1">⭐️ {details.rating.average}</Typography>
        <Typography variant="body1">{details.premiered.substring(0, 4)} - {details.ended?.substring(0,4)}</Typography>
        <br />
        <Typography variant="body1" sx={{fontSize: 20}}>{details.summary?.replace(/<[^>]+>/g, "") || "No description available"}</Typography>
        <br />
        <br />
        <Button startIcon={<AddIcon/>} variant="contained">Add to Watchlist</Button>
      </Box>
    </Box>
  );

}