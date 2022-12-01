import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";
import {uploadImageToCloudinaryAPIMethod} from "../../client"

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
        console.log("HEEE", uri);
        return uri;
    }

    const getLayers = () => {
      let layers = [];
      for(let i = 0; i < props.layerOrder.length; i += 1){
        let layer = props.layerOrder[i];
        let data = [];
        for(let j = 0; j < props.dataMap.length; j += 1){
          for(let k = 0; k < props.dataMap[j].length; k += 1){
            let layer_data = props.dataMap[j][k].layers.find(x => x.layer_id === layer.id);
            let gid = layer_data ? layer_data.gid : 0;
            data.push(gid);
          }
        }
        let layerobj = {
          data: data,
          height: props.mapHeight,
          id: 1,
          name: layer.name,
          opacity: 1,
          type: "tilelayer",
          visible:true,
          width:25,
          x: 0,
          y: 0
        }
        layers.push(layerobj)
      }
      return layers;
    }
    const getTilesets = () => {
      let tilesets = [];
      props.importedTileList.forEach(x => {
        let tsobj = {
          firstgid: x.startingGID,
          source: (x.tilesetName + ".json")
        };
        tilesets.push(tsobj);
      });
      return tilesets;
    }
    const makeJSON = async() => {
        //let uri = await makeOnePNG();
        let layers = getLayers();
        let tilesets = getTilesets();
        let object = {
            compressionlevel: -1,
            height: props.mapHeight,
            infinite: false,
            layers: layers,
            nextlayerid: props.layerOrder.length + 1,
            nextobjectid: 1,
            orientation:"orthogonal",
            renderorder: "right-down",
            tileheight: props.tileHeight,
            tilesets: tilesets,
            tilewidth: props.tileWidth,
            type: 'map',
            width: props.mapWidth,
        };
        console.log(object);
        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object))
        setDownload(data);
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
    <Typography sx={{background:"#4E6C50", pr:2, pl:2, pt:1 ,pb:1, borderRadius:0, color:"white",align:"center"}}> Export JSON</Typography>
        <List>
            <ListItem>
                <TextField label="Name" variant="outlined" defaultValue={name} 
                onKeyDown={handleKeyDown("name")} onChange={e => changeName(e.target.value)}/>
            </ListItem>
            <ListItem>
                <Typography variant="body1">{"Map Width: " + props.mapWidth} </Typography>
            </ListItem>
            <ListItem>
            <Typography variant="body1">{"Map Height: " + props.mapHeight} </Typography>
            </ListItem>
            <ListItem>
            <Typography variant="body1">{"Tile Width: " + props.tileWidth} </Typography>
            </ListItem>
            <ListItem>
            <Typography variant="body1">{"Tile Height: " + props.tileHeight} </Typography>
            </ListItem>
        </List>
        <Button variant="contained" sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50"  ,color:"white" }} onClick={makeJSON}>Confirm Properties</Button>
        <canvas ref={canvasRef}/>
        <Button variant="contained" sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50"  ,color:"white" }}>  {<a href={download} id="download-link" download={name + ".json"}>Download</a>}</Button>
  </Box>
</Modal>
  )
}
