import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import { useState } from 'react';
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import CanvasDraw from "./index";
import { useRef } from "react";
import Canvas from "./Canvas";
import JSONSaveModal from "./JSONSaveModal";
import PNGSaveModal from "./PNGSaveModal";
import SaveModal from "./SaveModal";
import { SAVE_TILESET, GET_TILESET } from "../../graphql/queries/TileEditorQueries";
import { useMutation, useQuery } from '@apollo/client';
import ReactRouterPrompt from "react-router-prompt";
import Modal from '@mui/material/Modal';
import { TOGGLE_LOCK } from '../../graphql/mutations/locking';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';
import { ADD_COLLABORATOR_TILE,GET_COLLABORATORS} from "../../graphql/queries/collaboratorQueries";

const TileEditor = (props) => {
  let currentUser = props.authenticatedUser;
  const location = useLocation();
  const cookies = new Cookies();

  React.useEffect(() => {
    if(currentUser.id === "-1"){
      let path = location.pathname.split("/");
      let user = cookies.get(path[path.length - 2]);
      let tsId = path[path.length - 1]
      console.log("Tile refresh", user);
      props.authenticateUser(user);
      props.editTile(tsId);
    }
  }, []);  

    const[tileList, setTileList]=useState([])
    const canvasRef = useRef(null);
    const[base64,setBase64]=useState("")
    const [drawing, setDrawing] = useState();
    const [brushColor, changeColor] = useState('#4E6C50');
    const [brushSize, changeBrushSize] = useState(5);
    const [erase, toggleErase] = useState(false);

    const[canvasWidth, setCanvasWidth]=useState(600)
    const[canvasHeight, setCanvasHeight]=useState(600)
    const [saveJSON, toggleJSON] =useState(false);
    const [savePNG, togglePNG] = useState(false);
    const [save, toggleSave] = useState(false);
    const [predraw, setPredraw] = useState("");
    const [collabList, setCollabList]=useState([])
   
    const drawAgain = (data) => {
      const new_data = new String(data);
      setPredraw(new_data);
    }

    const { data, loading, error } = useQuery(GET_TILESET, {
        variables: {
          id: props.tileset,
        }
      });

      const refetchTileset = {
        refetchQueries: [
          {
            query: GET_TILESET,
            variables: {id: props.tileset}
          }
        ]
      };
      const [addCollaborator] = useMutation(ADD_COLLABORATOR_TILE, refetchTileset);
      const [saveTileset] = useMutation(SAVE_TILESET, refetchTileset);

      React.useEffect(() => {
        if(data) {
            console.log("There was data");
            console.log("Data retrieved", data);
            console.log(data.getTileset.dataURLs);
            
          setTileList(oldArray => [... data.getTileset.dataURLs]);
          setCollabList([...  data.getTileset.collabolators])
        }
    }, [data])


    const updateBrushColor = (color) =>{
        changeColor(color.hex);
    }


   
    const handleExport = () => {
        
        setDrawing(canvasRef.current.canvasContainer.childNodes[1].toDataURL())
     
        

      };
    const handleImport = (imported_tiles) => {
        setTileList(oldArray => [...oldArray, ...imported_tiles]);
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

    const [toggleLock] = useMutation(TOGGLE_LOCK);
    const unlock = async() => {
      let result = await toggleLock({
        variables: {
          id: props.tileset,
          assetType: "Tileset",
          userId: props.authenticatedUser.id,
          lock: false
        }
      });
      let success = result.data.toggleLock;
      console.log("Unlock successful?", success);
    }

    const removeSelected=(index)=>{
      console.log("At delete");
      let lst = tileList;
      lst.splice(index, 1);
      console.log("lst", lst)
      setTileList([... lst]);
      
    }

    return (
        <>
        <ReactRouterPrompt when={true}>
          {({ isActive, onConfirm, onCancel }) => (
          <Modal open={isActive}>
            <Box sx={style} >
            <p>Do you really want to leave?</p>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={(event) => {
              unlock();
              onConfirm(event);
            }}>Ok</button>
            </Box>
        </Modal>
          )}
        </ReactRouterPrompt>
        <Box sx={{ display: 'flex' }}>
            <Grid container 
            direction='row'
            >
                <Grid item  md={2}>
                <ToolbarLeft updateBrushColorCallback={updateBrushColor} 
                eraseOnCallback={() => toggleErase(true)} 
                eraseOffCallback={() => toggleErase(false)}
                canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth} canvasHeight={canvasHeight} setCanvasHeight={setCanvasHeight}
                turnOnJSONMod={() => toggleJSON(true)}
                turnOnPNGMod={() => togglePNG(true)}
                turnOnSaveMod={() => toggleSave(true)}
                handleImport={handleImport}
                />
            </Grid>
            
            <Grid item  md={8} sx={{pt:4, pl:10}} >
                <Canvas  predraw={predraw}
                brushColor={brushColor} tileList={tileList} setTileList={setTileList} canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth} canvasHeight={canvasHeight} setCanvasHeight={setCanvasHeight} 
                brushRadius={brushSize} erase={erase}/>
                
            </Grid>
        <Grid item  md={2}>
            <ToolbarRight currentUser={props.authenticatedUser} changeBrushSizeCallback={(size) => changeBrushSize(size)} defaultBrush={brushSize} drawAgain={drawAgain}
            setErase={(arg) => {toggleErase(arg)}} collaborators={collabList}   erase={erase} tileList={tileList} setTileList={setTileList} tileSetID={props.tileset} removeSelected={removeSelected} addCollaborator={addCollaborator}/>
        </Grid>
        </Grid>
        </Box>
        <JSONSaveModal open={saveJSON} onClose={() => toggleJSON(false)} tileList={tileList} />
        <PNGSaveModal open={savePNG} onClose={() => togglePNG(false)} tileList={tileList} />
        <SaveModal open={save} onClose={() => toggleSave(false)} tileList={tileList} 
        tilesetId={props.tileset} saveTileset={saveTileset}/>
        </>
    )
}

export default TileEditor



