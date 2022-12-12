import React from "react";
import './Community.css';
import ExampleMapImage from '../../ExampleAssetImg.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { FavoriteBorder,Favorite } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';


const Asset = (props) => {

    //props will contain the community asset object which will contain information regarding the asset such as name, type, description, and image
    let asset = props.asset; 
    //******* FOR NOW ASSET TYPE IS SENT IN SEPARATE
    let assetType = props.assetType
    console.log(asset)

    let numLikes = 0;
    let numComments = 0;

    const [anchor,setAnchor]=useState(null);
    const [editBio, toggleBio]= useState(false);

    const updateBio = async(bio) => {  
      props.changeBio(asset.id, bio);
      toggleBio(false);
  }

    const openPopover=(e)=>{
      setAnchor(e.currentTarget)
    }
    
    return (
        <div id='Asset'>

<Card sx={{ ml:3}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ExampleMapImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {assetType === "Map" && <MapOutlinedIcon sx={{}}></MapOutlinedIcon>}
            {assetType === "Tile" && <GridViewOutlinedIcon sx={{}}></GridViewOutlinedIcon>}
            {assetType === "Folder" && <FolderSharedOutlinedIcon sx={{}}></FolderSharedOutlinedIcon>} &nbsp; {asset.name}
          </Typography>
          {!editBio ? 
            <Typography variant="body2" color="text.secondary" onDoubleClick={() => toggleBio(true)}>
            {asset.bio ? asset.bio : "Default Bio (Double Click Here to Change"} 
           </Typography>
            : <TextField
              id="standard-textarea"
              label="Bio"
              placeholder="Enter Bio Here"
              multiline
              variant="standard"
              onBlur={(e) => updateBio(e.target.value)}
              />
            }
          
          <Checkbox  aria-label='Checkbox demo'
              icon={<FavoriteBorderIcon />} 
              checkedIcon={<FavoriteIcon  sx={{color:"#D1285E"}}/>} 
              sx={{ boxShadow: 0.5 , ml:'auto'}}/>
              {numLikes}

              <IconButton aria-label="show comments" onClick={openPopover} >
              <CommentIcon />
            </IconButton>

                {/* Menu for adding notes and tilesets */}
                <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 900,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              > {/*The comments themselves will probably be made as separate components in the future 
              
                    ALSO THIS DATA IS HARDCODED FOR SAKE OF TESTING*/}
                
                <Divider></Divider>
                <MenuItem ><TextareaAutosize aria-label="empty textarea" placeholder="Add Comment" style={{ width: 200 }}/> 
                </MenuItem>
              </Menu>
            {numComments}
        </CardContent>
      </CardActionArea>
    </Card>
            {/* <div className="Asset-Description-Box"> */}
                {/* UNCOMMENT THIS WHEN CONNECTING FRONTEND TO BACKEND
                <div>{asset.name}</div>
                <div>Type:{" " + asset.type}</div>
                <div>Description: {" " + asset.description}</div>
                */}

                {/* THE FOLLOWING IS HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
                {/* <img className="asset-image" alt="Asset Image Here" src={ExampleMapImage}/>
                <div className="asset-text">Ruins Adventure Map</div>
                <div className="asset-text">Type: Map</div>
                <div className="asset-text">Description: Map design for a 2D fantasy game that takes place in an ancient ruin. Explore and hunt for treasures thought to be lost to time</div> */}


               {/*THESE ARE NOT HARDCODED, THIS IS UI FOR LIKES AND COMMENTS*/}
              
            {/* </div> */}
        </div>
    )
}

export default Asset;



