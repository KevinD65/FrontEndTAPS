import { Typography,Divider } from "@mui/material";
import React from "react";
import Asset from "./Asset";
import './Community.css';

const CommunityAssets = (props) => {
    //props will contain list of queried community assets
    var mapdata = props.mapdata.getMapsWithTag;
    console.log(mapdata);
    var tilesetdata = props.tilesetdata.getTilesetsWithTag;
    console.log(tilesetdata);
    var folderdata = props.folderdata.getFoldersWithTag;
    console.log(folderdata);
    console.log(props.currentUser)
    return (
        <div id='Community-Assets'>
            <Typography id='Community-Assets-Label' sx={{pl:4}}>Some Popular Assets</Typography>
            <hr></hr>  
            
            {
                
                mapdata.map(asset => (
                    <Asset currentUser = {props.currentUser} asset = {asset} assetType = {"Map"}/>
                ))
            }
            {
                
                tilesetdata.map(asset => (
                    <Asset currentUser = {props.currentUser} asset = {asset} assetType = {"Tile"}/>
                ))
            }
            {
                
                folderdata.map(asset => (
                    <Asset currentUser = {props.currentUser} asset = {asset} assetType = {"Folder"}/>
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