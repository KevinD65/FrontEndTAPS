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

    function loadImage(url) {
      return new Promise((fulfill, reject) => {
        let imageObj = new Image();
        imageObj.onload = () => fulfill(imageObj);
        imageObj.setAttribute('crossOrigin', 'anonymous');
        imageObj.src = url;
      });
    }
    
    const makeOnePNG = async () => {
      let x = 0;
      let y = 0;
      let savedrows = 1;
      let savedcolumns = 1;
      let columns = 1;
        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for(let i = 0; i < props.tileList.length; i += 1){
          let img = await loadImage(props.tileList[i]);
          ctx.drawImage(img, x, y, tileWidth, tileHeight);
          if(x >= 160){
              savedrows += 1;
              x = 0;
              columns = 1;
              y = y + tileHeight;
          }
          else{
              savedcolumns = savedcolumns > columns ? savedcolumns : columns;
              x = x + tileWidth;
              columns += 1;
          }
      }
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
  <Box sx={style} >
  <Typography sx={{background:"#4E6C50", pr:2, pl:2, pt:1 ,pb:1, borderRadius:0, color:"white",align:"center"}}> Export PNG</Typography>
        <List>
            <ListItem>
                <TextField label="Name" variant="outlined" defaultValue={name} 
                onKeyDown={handleKeyDown("name")} onChange={e => changeName(e.target.value)}/>
            </ListItem>
            <ListItem>
                <TextField label="Tile Width" variant="outlined" defaultValue={tileWidth} 
                onKeyDown={handleKeyDown('width')} onChange={e => changeWidth(e.target.value)}/>
            </ListItem>
            <ListItem>
                <TextField label="Tile Height" variant="outlined" defaultValue={tileHeight} 
                onKeyDown={handleKeyDown('height')} onChange={e => changeHeight(e.target.value)}/>
            </ListItem>
        </List>
        {/* <Button onClick={makeJSON}>Preview</Button>
        <canvas ref={canvasRef}/>
        {<a href={download} download={name + ".png"}>Download</a>} */}

        <Button variant="contained" sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50"  ,color:"white" }} onClick={makeJSON}>Preview</Button>
        <canvas ref={canvasRef}/>
        <Button variant="contained" sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50"  ,color:"white" }} onClick={makeJSON}>  {<a href={download} id="download-link" download={name + ".png"}>Download</a>}</Button>
  
  </Box>
</Modal>
  )
}
