import React, { useEffect } from "react";
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
import { gql, useQuery, useMutation } from '@apollo/client';

const LikeButton = (props) => {
    let currentUser = props.currentUser;
    //let currentUserId = props.currentUser.id;

    let likes = props.likes;
    let likeCount = props.likeCount;
    let id = props.id;
    console.log(id);

        console.log(currentUser)
    
    const [liked, setLiked] = useState(false);
    useEffect(()=>{
        //&& likes is a temporary fix so it doesn't try to load null array
        if(currentUser && likes && likes.find(like => like === currentUser.id)){
            setLiked(true);
        }else{
            setLiked(false);
        }
    }, [currentUser, likes]);

   /* const [likePost] = useMutation(CHANGE_MAP_LIKE,{
        variables:{ id: id}
    });*/
    return (
        <>
            <Checkbox  aria-label='Checkbox demo'
              icon={<FavoriteBorderIcon />} 
              checkedIcon={<FavoriteIcon  sx={{color:"#D1285E"}}/>} 
              sx={{ boxShadow: 0.5 , ml:'auto'}}
              checked={liked}
              />
              
              {props.likeCount}
    
        </>
    )

    /*const CHANGE_MAP_LIKE = gql`
    mutation($id: ID!){
      changeMapName(id: $id,){
        id,
        likes{
            currentUserId
        },
        likeCount
      }
    }
    `
    */

}

export default LikeButton