import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Waterfall from "../../static/waterfall.svg"
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import {useNavigate} from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';



const Map=({mapName})=> {
  console.log(mapName)
  const navigate= useNavigate();
  return (
    <Card sx={{ width:250  ,ml:3, mr:3, mt:1,boxShadow: "4px 4px 4px #F0EBCE" , }}
    
    onDoubleClick={()=>{
      navigate('/MapEditor');
    }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={Waterfall}
          alt="map"
        />
        <CardContent sx={{display:'flex',}}>
          
          
            <MapOutlinedIcon sx={{mt:1}}></MapOutlinedIcon>
            
            <Typography gutterBotto sx={{fontSize:"1.3rem",mt:1,ml:1}}  component="div">{mapName} </Typography>
          
            <Checkbox  aria-label='Checkbox demo'
              icon={<StarBorder />} 
              checkedIcon={<Star  sx={{color:"#AA8B56"}}/>} 
              sx={{ boxShadow: 0.5 , ml:'auto'}}/>
    
          
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Map;