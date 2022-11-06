import { Typography,Divider } from "@mui/material";
import React from "react";
import Asset from "./Asset";
import './Community.css';

const CommunityAssets = (props) => {
    //props will contain list of queried community assets

    return (
        <div id='Community-Assets'>
            <Typography id='Community-Assets-Label' sx={{pl:4}}>Some Popular Assets</Typography>
            <hr></hr>  
            
            {
                /* THIS WILL MAP ALL QUERIED COMMUNITY ASSETS TO THEIR OWN <Asset> COMPONENT
                props.communityassets.map(asset => (
                    <Asset/>
                ))*/
            }
            
            {/*BELOW IS A HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
            <Asset/>
        </div>
    )
}

export default CommunityAssets;