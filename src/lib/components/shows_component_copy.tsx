// TODO:
// ID, name, iamge, siguro short deets like s and eps numbers lang.
// figure out where to add the plus or minus sign

import type Show from "../types/shows";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ShowComponentProps {
  show: Show;
}

export default function ShowComponent({ show }: ShowComponentProps) {
  const [season, setSeason] = useState<number>(show.season);
  const [episode, setEpisode] = useState<number>(show.episode);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage when season/episode changes, with debounce
  useEffect(() => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout to save after 10 seconds
    saveTimeoutRef.current = setTimeout(() => {
      const existingWatchlist = localStorage.getItem("watchlist");
      const watchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

      const existingIndex = watchlist.findIndex(
        (item: any) => item.id === show.id
      );
      if (existingIndex >= 0) {
        watchlist[existingIndex].season = season;
        watchlist[existingIndex].episode = episode;
      }

      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      console.log(`Saved to localStorage: S${season}E${episode}`);
    }, 10000);

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [season, episode, show.id]);

  const handleNext = () => {
    if (episode < show.episodes) {
      // Stay in same season, increment episode
      setEpisode(episode + 1);
    } else if (season < show.seasons) {
      // Move to next season, reset to episode 1
      setSeason(season + 1);
      setEpisode(1);
    }
    // If at finale, do nothing
  };

  const handlePrevious = () => {
    if (episode > 1) {
      // Stay in same season, decrement episode
      setEpisode(episode - 1);
    } else if (season > 1) {
      // Move to previous season, go to last episode
      // Note: assumes all seasons have same episode count, adjust if needed
      setSeason(season - 1);
      setEpisode(show.episodes);
    }
    // If at beginning, do nothing
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Get existing watchlist from localStorage
    const existingWatchlist = localStorage.getItem("watchlist");
    if (!existingWatchlist) return;

    const watchlist = JSON.parse(existingWatchlist);

    // Filter out the show with matching id
    const updatedWatchlist = watchlist.filter(
      (item: any) => item.id !== show.id
    );

    // Save updated watchlist back to localStorage
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    // Close dialog and refresh the page
    setOpenDeleteDialog(false);
    window.location.reload();
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div style={{ display: "block" }}>
      <div
        style={{
          width: 220,
          height: 310,
          backgroundImage: `url(${show.posterUrl})`,
          backgroundSize: "contain", // or "contain"
          backgroundRepeat: "no-repeat",
          borderRadius: 10,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleDelete}
          sx={{
            position: "absolute",
            left: "0px",
            backgroundColor: "black",
            marginTop: 1,
            marginLeft: 1,
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <div
          style={{
            width: "inherit",
            height: "15%",
            position: "absolute",
            bottom: "0px",
            backgroundColor: "#111111f4",
          }}
        >
          <Typography variant="body1">Watch next</Typography>
          <Box display={"flex"} justifyContent={"center"} gap={2}>
            <Typography variant="body1">Season:{season}</Typography>
            <Typography variant="body1">Episode:{episode}</Typography>
          </Box>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "black",
        }}
      >
        <Button size="small" onClick={handlePrevious} fullWidth>
          <SkipPreviousIcon />
        </Button>
        <Button size="small" onClick={handleNext} fullWidth>
          <SkipNextIcon />
        </Button>
      </div>
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Delete Show?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{show.name || show.title}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Card sx={{wwidth:200, height: 400}}>
                <CardContent sx={{display:"flex", justifyContent:"space-around"}}>
                    <IconButton onClick={handleDelete}><DeleteIcon color="error"/></IconButton>
                    <Box display={"flex"} gap={1}>
                        <Typography variant="body1">S:{season}</Typography>
                        <Typography variant="body1">Ep:{episode}</Typography>
                    </Box>
                </CardContent>
                <CardActions 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 4, // bigger spacing
                    }}
                >
                    <Button size="small" onClick={handlePrevious}>Previous</Button>
                    <Button size="small" onClick={handleNext}>Next</Button>
                </CardActions>

            </Card>

            */}
    </div>
  );
}
