import React from "react";
import './Community.css';
import ExampleMapImage from '../../ExampleAssetImg.jpg';
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


const Asset = (props) => {

    let numLikes = 69;
    let numComments = 3;

    const [anchor,setAnchor]=useState(null)

    const openPopover=(e)=>{
      setAnchor(e.currentTarget)
    }
    //props will contain the community asset object which will contain information regarding the asset such as name, type, description, and image
    //let asset = props.asset; UNCOMMENT THIS AFTER BUILD #2

    return (
        <div id='Asset'>
            <div className="Asset-Description-Box">
                {/* UNCOMMENT THIS WHEN CONNECTING FRONTEND TO BACKEND
                <div>{asset.name}</div>
                <div>Type:{" " + asset.type}</div>
                <div>Description: {" " + asset.description}</div>
                */}

                {/*THE FOLLOWING IS HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
                <img className="asset-image" alt="Asset Image Here" src={ExampleMapImage}/>
                <div className="asset-text">Ruins Adventure Map</div>
                <div className="asset-text">Type: Map</div>
                <div className="asset-text">Description: Map design for a 2D fantasy game that takes place in an ancient ruin. Explore and hunt for treasures thought to be lost to time</div>


               {/*THESE ARE NOT HARDCODED, THIS IS UI FOR LIKES AND COMMENTS*/}
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
                    
                <MenuItem ><div className="asset-text">Commented by: Quandale Dingle</div></MenuItem>
                <MenuItem > <div className="asset-text"> I am quite enamored by the quality of this map</div>
                </MenuItem>
                <Divider></Divider>
                <MenuItem ><div className="asset-text">Commented by: Lol</div></MenuItem>
                <MenuItem > <div className="asset-text"> I am quite enamored by the quality of this map as well</div>
                </MenuItem>
                <Divider></Divider>
                <MenuItem ><div className="asset-text">Commented by: Joe</div></MenuItem>
                <MenuItem > <div className="asset-text"> Mama</div>
                </MenuItem>
                <Divider></Divider>
                <MenuItem ><TextareaAutosize aria-label="empty textarea" placeholder="Add Comment" style={{ width: 200 }}/> 
                </MenuItem>
              </Menu>
            {numComments}
            </div>
        </div>
    )
}

export default Asset;