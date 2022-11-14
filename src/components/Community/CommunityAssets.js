import { Typography,Divider } from "@mui/material";
import React from "react";
import Asset from "./Asset";
import './Community.css';

const CommunityAssets = (props) => {
    //props will contain list of queried community assets
    var data = props.mapdata.getMapsWithTag;
    console.log(data);
    return (
        <div id='Community-Assets'>
            <Typography id='Community-Assets-Label' sx={{pl:4}}>Some Popular Assets</Typography>
            <hr></hr>  
            
            {
                
                data.map(asset => (
                    <Asset asset = {asset} assetType = {"Map"}/>
                ))
            }
            
            {/*BELOW IS A HARDCODED STATIC EXAMPLE FOR BUILD #2
            <Asset/>
            data != undefined && data.name
            
            placeholder ^^^^^ */}

        </div>
    )
}

export default CommunityAssets;