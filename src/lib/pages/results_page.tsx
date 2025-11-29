import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, CardActionArea, CircularProgress } from "@mui/material";

type Show = {
  id: number;
  name: string;
  image?: { medium: string; original: string } | null;
  summary?: string;
};

export default function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  const navigate = useNavigate();

  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then((data) => {
        // TVMaze search returns { score, show } objects
        const shows = data.map((item: any) => item.show);
        setResults(shows);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <CircularProgress size={60} />
        <Typography variant="body1">Searching for "{query}"...</Typography>
      </Box>
    </Box>
  );
  if (!results.length) return <Typography>No results found for "{query}"</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Search results for "{query}"
      </Typography>

      <Box sx={{display: "flex", gap:5, flexWrap: "wrap"}}>
        {results.map((show) => (
            <Card sx={{width:200, height: 350}}>
              <CardActionArea onClick={() => navigate(`/show/${show.id}`)}>
                <CardMedia
                    component="img"
                    width="250"
                    image={show.image?.medium}
                    alt={show.name}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{maxHeight: 50}}>
                    <Typography variant="h6" noWrap sx={{fontWeight: "bold", fontSize:16, textAlign: "center", }} >{show.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        ))}
      </Box>
    </Box>
  );
}
