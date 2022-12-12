import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {uploadImageToCloudinaryAPIMethod} from "../../client"
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
      let tileWidthI = Number(tileWidth);
        let tileHeightI = Number(tileHeight);
        
        canvasRef.current.width = tileWidth * 4; 
        let rowCount = Math.floor(props.tileList.length * tileWidth / canvasRef.current.width) + 1;
        canvasRef.current.height = rowCount * tileHeight;
        let colCount = Math.floor(canvasRef.current.width / tileWidth);

        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        let x = 0;
        let y = 0;
        let colCounter = 0;
        for(let i = 0; i < props.tileList.length; i += 1){
          let img = await loadImage(props.tileList[i]);
          ctx.drawImage(img, x, y, tileWidthI, tileHeightI);
          x = x + tileWidthI;
          colCounter = colCounter + 1;
          if(colCounter === colCount){
            x = 0;
            colCounter = 0;
            y = y + tileHeightI;
          }
        }
        console.log("Data joined ", canvasRef.current.toDataURL())
        // let uri = await handleImageSelected(canvasRef.current.toDataURL());
        // console.log("HEEE", uri);
        return canvasRef.current.toDataURL()
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

    const makeJSON = async() => {
        let uri = await makeOnePNG();
        console.log("here we go again",uri)
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
  sx={{overflowY: "scroll"}}
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
        <Box
      sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 200,
          width: 200,
          overflow: "hidden",
          overflowY: "scroll",
         // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
    >
        <canvas ref={canvasRef}/>
        </Box>
        <Button variant="contained" sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50"  ,color:"white" }} onClick={makeJSON}>  {<a href={download} id="download-link" download={name + ".png"}>Download</a>}</Button>
  
  </Box>
</Modal>
  )
}
