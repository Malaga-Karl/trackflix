// TODO:
// call api on specific data on the details with ID
// Dsiplay data
// add an add button to add on currently watching

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
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

type SeasonStructure = {
  [seasonNumber: number]: number; // season number -> episode count
}

type WatchlistItem = {
  id: number;
  name: string;
  season: number;
  episode: number;
  seasons: number;        // total seasons
  episodes: number;       // total episodes per season (or max)
  posterUrl?: string;
}

export default function ShowDetails(){
    
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [details, setDetails] = useState<ShowDetails>()
    const [loading, setLoading] = useState<boolean>(true);
    const [seasonStructure, setSeasonStructure] = useState<SeasonStructure | null>(null);
    const [currentSeason] = useState<number>(1);
    const [currentEpisode] = useState<number>(1);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // Primary effect: Fetch show details (blocks render)
    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(res => res.json())
        .then((data) => setDetails(data))
        .finally(() => setLoading(false));
    }, [id])

    // Secondary effect: Fetch season/episode structure in background (non-blocking)
    useEffect(() => {
        if (!id) return;

        const fetchSeasonStructure = async () => {
            try {
                const seasonsRes = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`);
                const seasons = await seasonsRes.json();
                
                const structure: SeasonStructure = {};
                for (const season of seasons) {
                    const episodesRes = await fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`);
                    const episodes = await episodesRes.json();
                    structure[season.number] = episodes.length;
                }
                
                setSeasonStructure(structure);
            } catch (error) {
                console.error("Failed to fetch season structure:", error);
            }
        };

        fetchSeasonStructure();
    }, [id])

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <CircularProgress size={60} />
                <Typography variant="body1">Loading show details...</Typography>
            </Box>
        </Box>
    );
    if (!details) return <Typography>Show not found</Typography>;

    const handleAddToWatchlist = () => {
        if (!seasonStructure) {
            console.warn("Season structure not loaded yet");
            return;
        }

        const totalSeasons = Object.keys(seasonStructure).length;
        const maxEpisodes = Math.max(...Object.values(seasonStructure));

        const watchlistItem: WatchlistItem = {
            id: details.id,
            name: details.name,
            season: currentSeason,
            episode: currentEpisode,
            seasons: totalSeasons,
            episodes: maxEpisodes,
            posterUrl: details.image?.medium
        };

        // Get existing watchlist from localStorage
        const existingWatchlist = localStorage.getItem('watchlist');
        const watchlist: WatchlistItem[] = existingWatchlist ? JSON.parse(existingWatchlist) : [];

        // Check if show already exists, if so update it, otherwise add it
        const existingIndex = watchlist.findIndex(item => item.id === details.id);
        if (existingIndex >= 0) {
            watchlist[existingIndex] = watchlistItem;
        } else {
            watchlist.push(watchlistItem);
        }

        // Save back to localStorage
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log("Added to watchlist:", watchlistItem);
        
        // Show success message and redirect
        setShowSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };
    
  return (
    <Box p={2} sx={{display:"flex", gap:5}}>
      {showSuccess && <Alert severity="success" sx={{position: "fixed", top: 20, right: 20}}>Added successfully!</Alert>}
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
        <Button startIcon={<AddIcon/>} variant="contained" onClick={handleAddToWatchlist}>Add to Watchlist</Button>
      </Box>
    </Box>
  );

}