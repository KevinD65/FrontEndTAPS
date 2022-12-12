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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

const Tileset=({editTile, tilesetName, changeNameCallback, deleteCallback, tilesetId})=> {
  const [changingName, toggleNameChange] = React.useState(false);
  const navigate= useNavigate();
  const doneEditingName = (name) => {
    toggleNameChange(false);
    console.log(name);
    changeNameCallback(tilesetId, name);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      doneEditingName(e.target.value);
    }
  }

  return (
    <Card 
    PaperProps={{
      sx: {
        backgroundColor: "#F8EDE3"
      }
    }}
    
    sx={{ minWidth: 220  ,ml:3, mr:3, mt:2,mb:4,boxShadow: "4px 4px 4px #F0EBCE" , backgroundColor: "#F8EDE3" }}
    >
     
      {/* <CardContent > */}
      <CardActionArea sx={{display:'flex', justifyContent:"flex-start", ml:1, mb:1} }>
      <GridViewOutlined sx={{mt:1}}></GridViewOutlined>
      {changingName ? 
            <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={tilesetName} onBlur={(e) => doneEditingName(e.target.value)} 
            onKeyDown={handleKeyDown} variant="standard" /> : 
            <Typography noWrap gutterBotto sx={{fontSize:"1.0rem",mt:1,ml:1}}  component="div" 
            onDoubleClick={() => toggleNameChange(true)}>{tilesetName} </Typography>}
            
      </CardActionArea>
        <CardMedia
          component="img"
          minHeight="200"
          image={Waterfall}
          alt="map"
          onDoubleClick={()=>{
            editTile(tilesetId, "Tileset");
          }}
        />
        <CardActionArea sx={{display:'flex', justifyContent:"space-around" }}>
      
          <Checkbox  aria-label='Checkbox demo'
              icon={<StarBorder />} 
              checkedIcon={<Star sx={{color:"#AA8B56"}}/>} 
              sx={{ boxShadow: 0.5 }}/>

          <Checkbox  aria-label='Checkbox demo'
              icon={<VisibilityOffIcon />} 
              checkedIcon={<VisibilityIcon/>} />

            <IconButton aria-label="delete" onClick={() => deleteCallback(tilesetId)}>
              <DeleteOutlinedIcon />
            </IconButton>
        </CardActionArea>
      
    </Card>
  );
}

export default Tileset;