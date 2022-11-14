import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";
import {uploadImageToCloudinaryAPIMethod} from "../../client"

export default function JSONSaveModal(props) {
    const [tileWidth, changeWidth] = React.useState(50);
    const [tileHeight, changeHeight] = React.useState(50);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
          
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
            console.log("URL", url);
        
    }

    const canvasRef = React.createRef();
    let row = 0;
    let col = 0;
    const makeOnePNG = async () => {
        let ctx = canvasRef.current.getContext("2d");
        props.tileList.forEach((tile) => {
            let img = new Image;
            img.src = tile;
            ctx.drawImage(img, row, col, 40, 40);
            if(row === 160){
                row = 0;
                col = col + 40;
            }
            else{
                row = row + 40;
            }
        });
        let uri = await handleImageSelected(canvasRef.current.toDataURL());
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
                <TextField label="Name" variant="outlined" defaultValue={"Tileset Name"} 
                onKeyDown={handleKeyDown} />
            </ListItem>
            <ListItem>
                <TextField label="Tile Width" variant="outlined"/>
            </ListItem>
            <ListItem>
                <TextField label="Tile Height" variant="outlined"/>
            </ListItem>
        </List>
        <Button onClick={makeOnePNG}> SAVE</Button>
        <canvas ref={canvasRef}/>
  </Box>
</Modal>
  )
}
