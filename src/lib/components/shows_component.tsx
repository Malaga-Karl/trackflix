// TODO:
// ID, name, iamge, siguro short deets like s and eps numbers lang.
// figure out where to add the plus or minus sign

import type Show from "../types/shows";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ShowComponentProps {
    show: Show
}

export default function ShowComponent({show}: ShowComponentProps){
    return(
        <>
            <Card sx={{width: 190}}>
                <CardMedia
                    component="img"
                    alt={show.title}
                    image={show.posterUrl}
                    sx={{
                        width: "100%",
                        objectFit: "contain", // or "cover"
                    }}      
                />
                <CardActions 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 4, // bigger spacing
                    }}
                >
                    <Button size="small">Previous</Button>
                    <Button size="small">Next</Button>
                </CardActions>

            </Card>
        </>
    )
}