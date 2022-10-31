import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Waterfall from "../../static/waterfall.svg"
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import {useNavigate} from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';

const Tileset=({tileName})=> {
  console.log(tileName)
  const navigate= useNavigate();
  
  return (
    <Card sx={{ minWidth: 230  ,ml:3, mr:3, }}
    onDoubleClick={()=>{
      navigate('/TileEditor');
    }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={Waterfall}
          alt="map"
        />
        <CardContent sx={{display:'flex' }}>
        <GridViewOutlined sx={{mt:1}}></GridViewOutlined>
          <Typography gutterBottom sx={{fontSize:"1.2rem",mt:1,ml:1}} component="div"> {tileName} </Typography>
          <Checkbox  aria-label='Checkbox demo'
              icon={<StarBorder />} 
              checkedIcon={<Star />} 
              sx={{ boxShadow: 0.5 , ml:'auto'}}/>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tileset;