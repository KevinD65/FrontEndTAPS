import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";

export default function JSONSaveModal(props) {
    const [name, changeName] = React.useState("New Tileset");
    const [tileWidth, changeWidth] = React.useState(50);
    const [tileHeight, changeHeight] = React.useState(50);
    const [download, setDownload] = React.useState("");

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

    const canvasRef = React.createRef();
    
    const makeOnePNG = async () => {
        let row = 0;
        let col = 0;
        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
        let uri = canvasRef.current.toDataURL();
        return uri;
    }
    const makeJSON = async() => {
        let uri = await makeOnePNG();
        setDownload(uri);
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
        {<a href={download} download={name + ".png"}>Download</a>}
  </Box>
</Modal>
  )
}
