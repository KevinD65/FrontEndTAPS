import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";
import {uploadImageToCloudinaryAPIMethod} from "../../client"
import { SAVE_TILESET, GET_TILESET } from "../../graphql/queries/TileEditorQueries";
import { useMutation, useQuery } from '@apollo/client';

export default function SaveModal(props) {
    const [name, changeName] = React.useState("New Tileset");
    const [tileWidth, changeWidth] = React.useState(50);
    const [tileHeight, changeHeight] = React.useState(50);
    const [download, setDownload] = React.useState({});

    const handleKeyDown = (e, field) => {
        if (e.key === 'Enter'){
          if(field === "name"){
            changeName(e.target.value);
          }
          else if(field === 'width'){
            changeWidth(e.target.value)
          }
          else if(field === 'height'){
            changeHeight(e.target.value)
          }
        }
      }

    const handleImageSelected = async (image) => {
        console.log("New File Selected");
            const formData = new FormData();
            const unsignedUploadPreset = 'ngrdnw4p'
            formData.append('file', image);
            formData.append('upload_preset', unsignedUploadPreset);
    
            console.log("Cloudinary upload");
            let url = await uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                //console.log("Upload success");
                return response.secure_url;
                
            });
            return url;
        
    }

    const canvasRef = React.createRef();
    
    const makeOnePNG = async () => {
        let row = 0;
        let col = 0;
        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        props.tileList.forEach((tile) => {
            let img = new Image;
            img.src = tile;
            ctx.drawImage(img, row, col, tileWidth, tileHeight);
            if(row === 160){
                row = 0;
                col = col + tileWidth;
            }
            else{
                row = row + tileHeight;
            }
        });
        let uri = await handleImageSelected(canvasRef.current.toDataURL());
        console.log("HEEE", uri);
        return uri;
    }
    const makeJSON = async() => {
        let uri = await makeOnePNG();
        console.log("TESTTTT");
        console.log("URI", uri);
        let tileCount = props.tileList.length;
        let rows = Math.floor(props.tileList.length / 5) + 1;
        console.log("rows", rows);
        let cols = tileCount < 5 ? tileCount : 5;
        let object = {
            name: name,
            image: uri,
            tilewidth: tileWidth,
            tileheight: tileHeight,
            columns: cols,
            imageheight: rows * tileHeight,
            imagewidth: cols * tileWidth,
            tilecount: tileCount,
            dataURLs: props.tileList,
            type: 'tileset'
        };
        console.log(object);
        return object;
        
    }

    const saveTile = async () => {
        let object = await makeJSON();
        let res = await props.saveTileset({
            variables: {
                id: props.tilesetId,
                input: object,
            }
        });
        console.log("Saved succesfully", res);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return (
    <Modal
  open={props.open}
  onClose={props.onClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
        <List>
            <ListItem>
                <TextField label="Name" variant="outlined" defaultValue={name} 
                onKeyDown={handleKeyDown("name")} />
            </ListItem>
            <ListItem>
                <TextField label="Tile Width" variant="outlined" defaultValue={tileWidth} 
                onKeyDown={handleKeyDown('width')}/>
            </ListItem>
            <ListItem>
                <TextField label="Tile Height" variant="outlined" defaultValue={tileHeight} 
                onKeyDown={handleKeyDown('height')}/>
            </ListItem>
        </List>
        <Button onClick={makeJSON}>Preview</Button>
        <canvas ref={canvasRef}/>
        <Button onClick={saveTile}>Save</Button>
  </Box>
</Modal>
  )
}
