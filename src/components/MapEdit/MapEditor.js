import React from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box, Button } from "@mui/material";
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/material/Modal';
import { TOGGLE_LOCK } from '../../graphql/mutations/locking';
import ReactRouterPrompt from "react-router-prompt";
import { useMutation, useQuery } from '@apollo/client';
import JSONSaveModal from "./JSONSaveModal";
import { GET_TILESETS } from '../../graphql/queries/mapEditorQueries';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';

import { loadTSMapEditor } from '../helpful_functions/helpful_function_ME';
import { GET_MAP } from "../../graphql/queries/mapEditorQueries";
import { ADD_COLLABORATOR_MAP } from "../../graphql/queries/collaboratorQueries";


const MapEditor = (props) => {
    let currentUser = props.authenticatedUser;
  const location = useLocation();
  const cookies = new Cookies();
  const [collabList, setCollabList]=useState([])

  React.useEffect(() => {
    if(currentUser.id === "-1"){
      let path = location.pathname.split("/");
      let user = cookies.get(path[path.length - 2]);
      let mapId = path[path.length - 1]
      console.log("Map refresh", user);
      props.authenticateUser(user);
      props.editMap(mapId);
    }
  }, []);

    const [mapWidth, setMapWidth]=useState(15)
    const [mapHeight, setMapHeight]=useState(15)
    const [tileWidth, setTileWidth]=useState(50)
    const [tileHeight, setTileHeight]=useState(50)

    const [GIDTable, setTable] = useState([]);
    const canvasRef=useRef(null);
    const contextRef=useRef(null);
    const [isDrawing, setIsDrawing]= useState(false);

    const [saveJSON, toggleJSON] =useState(false);
    const [clearCanvas, setClearCanvas]=useState(false);
    const [tileList, setTileList] = useState([]); //used for keeping track of the imported tilesets for the current instance of the map editor
    const [importedTileList, editImportedTileList] = useState([]); //used for keeping track of the names of each imported Tileset to provide mappings between names and starting GIDs
    //have mapping between tileset name and starting GID
    //when figuring out which tile to pull, reference the GID and GID mapping, then do math to figure out which one to pull



  console.log(props.map, "hsuadfasf")
    const { data, loading, error } = useQuery(GET_MAP, {
        variables: {
          id: props.map,
        }
      });

      const refetchTileset = {
        refetchQueries: [
          {
            query: GET_MAP,
            variables: {id: props.map}
          }
        ]
      };


      React.useEffect(() => {
        if(data) {
            
          setCollabList([...  data.getMap.collabolators])
        }
    }, [data])
      const [addCollaborator] = useMutation(ADD_COLLABORATOR_MAP, refetchTileset);

    //GET_TILESETS QUERY
    const { loading: get_tilesets_loading, error: get_tilesets_error, data: tilesetData, refetch: refetchUserTilesets } = useQuery(GET_TILESETS, {
        variables: {ownerID: props.authenticatedUser.id}
    });
    if(tilesetData){
        console.log("THESE ARE MY TILESETS: ", tilesetData);
    }

    /**
     * Creates an empty dataMap using the dimensions of the map
     */
    const createDataMap = () => {
        let datamap = [];
        for(let i = 0; i < mapHeight; i++){
            let row = []
            for(let j = 0; j < mapWidth; j++){
                let grid_obj = {layers: []};
                row.push(grid_obj);
            }
            datamap.push(row);
        }
        return datamap;
    }

    /**
     * Creates an empty dataMap using custom dimensions
     */
    const createDataMapCustom = (height, width) => {
        let datamap = [];
        for(let i = 0; i < height; i++){
            let row = []
            for(let j = 0; j < width; j++){
                let grid_obj = {layers: []};
                row.push(grid_obj);
            }
            datamap.push(row);
        }
        return datamap;
    }

    const [dataMap, editMap] = useState(() => createDataMap());
    const [selectedTile, changeSelect] = useState({gid: -1, dataURL: ""});
    const [layerOrder, editOrder] = useState([{id: uuidv4(), name: "Layer 1"}]);

    const setOrder = (new_arr) => {
        editOrder(new_arr);
    }

    const updateDataMap = (row, col, data) => {
        let new_arr = [...dataMap];
        //console.log("new_ arr", new_arr, layers);
        //let layers = new_arr[row][col].layers;
        //console.log("after", new_arr);
        editMap(new_arr);
    }
    
    /**
     * Erases a tile when the erase tool is selected a a cell is clicked
     */
    const setErase = (newState) => {
        if(newState){
            console.log("Changing to empty");
            changeSelect({gid: 0, dataURL: ""});
        }
        else{
            changeSelect({gid: -1, dataURL: ""});
        }
    } 

    /**
     * Generates the map editor grid to be shown
     */
    const grid_generator = (width, height, tile_width, tile_height) => {
        let rows = [];
        for(let i = 0; i + tile_height < height; i = i + tile_height){
          let new_row = [];
          for(let j = 0; j + tile_width < width; j = j + tile_width){
            let canvas_prop = {sx: j, sy: i, swidth: tile_width, sheight: tile_height, x: 0, y: 0, width: tile_width, height: tile_height};
            new_row.push(canvas_prop); 
          }
          rows.push(new_row);
        }
        return rows;
      }

    /**
     * Creates an empty GID table cell
     */
    const createGIDTableElement = (grid_prop, img) => {
        let c = document.createElement('canvas');
        let ctx = c.getContext("2d");
        ctx.drawImage(img, grid_prop.sx, grid_prop.sy, 
            grid_prop.swidth, grid_prop.sheight, grid_prop.x, grid_prop.y, grid_prop.width, grid_prop.height);
        let dataURL =  c.toDataURL();
        return dataURL;
    }

    /**
     * Loads a tileset into the GID table
     */
    const loadTS = (start, img) => {
        let grid_props = grid_generator(550, 200, 40, 40); //todo: hardcoded, make dynamic
        let GIDTable = [];
        let gid = start;
        for(let grid_row = 0; grid_row < grid_props.length; grid_row = grid_row + 1){
            for(let grid_col = 0; grid_col < grid_props[grid_row].length; grid_col = grid_col + 1){
                GIDTable.push(
                    {gid: gid, data: createGIDTableElement(grid_props[grid_row][grid_col], img)}
                );
                gid = gid + 1;
            }
        }
        console.log("table", GIDTable);
        return GIDTable;
    }

    /**
     * Used for creating a map edit transaction
     */
    const editDataMap = (previousPixelState, updatedPixelState) => {
        let targetRow = previousPixelState.row;
        let targetCol = previousPixelState.col;
        console.log("ROW: " + targetRow);
        console.log("COLUMN: " + targetCol);

        let previousDataMap = dataMap;
        console.log("PREV: ", previousDataMap);
        let clonedDataMap = JSON.parse(JSON.stringify(dataMap)); //create deep copy of dataMap
        console.log("NEW: ", clonedDataMap);
        clonedDataMap[targetRow][targetCol] = updatedPixelState.layers; //update the copy with the new pixel data

        //let newMapEditTransaction = new EditMap_Transaction(previousDataMap, clonedDataMap, editMap);
        //props.transactionStack.addTransaction(newMapEditTransaction);

        console.log("Added map edit transaction to TPS");
    }

    React.useEffect(() => {
        function loadImage(url) {
            return new Promise((fulfill, reject) => {
              let imageObj = new Image();
              imageObj.onload = () => fulfill(imageObj);
              imageObj.setAttribute('crossOrigin', 'anonymous');
              imageObj.src = url;
            });
          }

        async function getTable() {
            let table = await 
            loadImage('https://res.cloudinary.com/dle4whfjo/image/upload/v1668890339/VIP_SBU_MAPS_Tileset_2_zuvpi1.png')
                .then((image) => loadTS(1, image));
            setTable((oldarray => [... table]));
        }
        //console.log("before");
        getTable();
        

    }, [GIDTable.length == 0])

    React.useEffect(() => {
        console.log("DataMap", dataMap)
    })

    const drawBoxes = () => {
        for(let i = tileWidth; i < (mapWidth * tileWidth); i += tileWidth){
            contextRef.current.moveTo(i, 0);
            contextRef.current.lineTo(i, (mapHeight * tileHeight))
        }

        for(let i = tileHeight; i < (mapHeight * tileHeight); i += tileHeight){
            contextRef.current.moveTo(0, i);
            contextRef.current.lineTo((mapWidth * tileWidth), i)
        }

        contextRef.current.strokeStyle = "black";
        contextRef.current.stroke();
    }

    useEffect(()=>{
         const canvas=canvasRef.current;
         canvas.width= mapWidth * tileWidth;
         canvas.height= mapHeight * tileHeight;
         const context= canvas.getContext("2d")
         context.lineCap="round"
         context.strokeStyle="Red"
         context.lineWidth=2;
         contextRef.current=context;
         canvasRef.current=canvas;
         contextRef.current.fillStyle = "white";
         contextRef.current.fillRect(0, 0, canvas.width, canvas.height)
         drawBoxes();
         drawWholeMap();

         console.log("USE EFFECT HAS RUN !!!!!!!");

         },[mapWidth, mapHeight, clearCanvas, layerOrder]);

    const drawBox = (layers, x, y) => {
        if(x == 0 && y == 0){
            console.log("layers", layers);
        }
        contextRef.current.clearRect(x * tileWidth,  y * tileHeight, tileWidth, tileHeight);
        contextRef.current.rect(x * tileWidth,  y * tileHeight, tileWidth, tileHeight);
        contextRef.current.stroke();

        for(let i = 0; i < layerOrder.length; i++){
            let image_data = layers.find(x => x.layer_id === layerOrder[i].id);
            if(image_data){
                let img = new Image;
                img.src = image_data.data;
                contextRef.current.drawImage(img, x * tileWidth, y * tileHeight);
            }
            else{
            }
            
        }
    }

    //DANGEROUS FUNCTION: Use only as last resort
    const drawWholeMap = () =>{
        console.log("At draw whole map", dataMap);
        for(let i = 0; i < dataMap.length; i += 1){
            for(let j = 0; j < dataMap[i].length; j += 1){
                drawBox(dataMap[i][j].layers, i, j);
            }
        }
    }

    const drawBoxCustom = (layers, layerOrder, width, height, x, y) => {
        if(x == 0 && y == 0){
            console.log("layers", layers);
        }
        contextRef.current.clearRect(x * width,  y * height, width, height);
        contextRef.current.rect(x * width,  y * height, width, height);
        contextRef.current.stroke();

        for(let i = 0; i < layerOrder.length; i++){
            let image_data = layers.find(x => x.layer_id === layerOrder[i].id);
            if(image_data){
                let img = new Image;
                img.src = image_data.data;
                contextRef.current.drawImage(img, x * width, y * height);
            }
            else{
            }
            
        }
    }

    //Wicked DANGEROUS FUNCTION: Use only as last resort
    const drawWholeMapCustom = (customDataMap, layerOrder) =>{
        for(let i = 0; i < customDataMap.length; i += 1){
            for(let j = 0; j < customDataMap[i].length; j += 1){
                drawBoxCustom(customDataMap[i][j].layers, layerOrder, i, j);
            }
        }
    }

    const placeTile =({nativeEvent}) => {
        const{offsetX, offsetY}=nativeEvent;
        console.log("Clicked", offsetX, offsetY);
        let x =  Math.floor(offsetX / tileWidth);
        let y = Math.floor(offsetY / tileHeight);

        let new_arr = [...dataMap];
        let layers = new_arr[x][y].layers;
        let last_layer = layerOrder[layerOrder.length - 1];
        let new_layers =  JSON.parse(JSON.stringify(layers));
        console.log("Before", layers)
        if(selectedTile.gid > 0){
            let {gid, data} = selectedTile;
            console.log("adhjkahiqwahdu9q298-q98asodnmlkq2neoih2897ydhasndiaheiud2hipudh89qpuhdiuawnbdiujw", gid, data);
            let index = new_layers.findIndex(x => x.layer_id === last_layer.id);
            if(index == -1){
                new_layers.push({layer_id: last_layer.id, gid: gid, data: data});
            }
            else{
               new_layers[index].gid = gid;
               new_layers[index].data = data;
            }
        }
        else if(selectedTile.gid === 0){
            let index = new_layers.findIndex(x => x.layer_id === last_layer.id);
            if(index != -1){
               new_layers.splice(index, 1);
            }
        }
        console.log("NEW LAYERS: ", new_layers);
        new_arr[x][y].layers = new_layers;
        drawBox(new_layers, x, y);
        editMap(new_arr);
        
    }

    const populateDataMap = (map_obj, imported_tiles) => {
        let dataMap = createDataMapCustom(map_obj.height, map_obj.width); //creates an empty dataMap

        console.log("IMPORTED TILES", imported_tiles);

        let mapLayers = map_obj.layers;
        let layerName, layer_id, layer_obj;
        for(let layers = 0; layers < mapLayers.length; layers++){
            layer_obj = mapLayers[layers];
            layerName = layer_obj.name;
            layer_id = uuidv4();
            let layerDataCounter = 0;
            for(let row = 0; row < dataMap.length; row++){
                for(let col = 0; col < dataMap[row].length; col++){
                    let gid = layer_obj.data[layerDataCounter];
                    let data = imported_tiles.tiles.find(x => x.gid === gid); //wicked slow
                    dataMap[row][col].layers.push({layer_id: layer_id, gid: gid, data: data});
                    layerDataCounter++;
                }
            }
        }

        console.log("THIS IS MY POPULATED DATAMAP: ", dataMap);

        return dataMap;
    }

    /**
     * sets the tileList state variable to the imported tileset to be rendered in the right toolbar
     */
    const importTileset = (imported_tiles, map_obj) => {
        let tilesetName = imported_tiles.TSName;
        let tileCount = imported_tiles.numTiles;
        let tileheight = imported_tiles.tileHeight;
        let tilewidth = imported_tiles.tileWidth;

        console.log(tilesetName);
        console.log(imported_tiles);
        console.log("WHAT IS MY MAP OBJ: ", map_obj);

        if(tileList.length > 0){
            let startingGID = importedTileList[importedTileList.length - 1].tileCount + importedTileList[importedTileList.length - 1].startingGID;
            console.log("MYIMPORTEDTILES", imported_tiles.tiles)     
            
            //POPULATES GID TABLE
            
            for(let i = 0; i < imported_tiles.tiles; i++){
                console.log("STARTING GID", startingGID)
                imported_tiles.tiles[i].gid = imported_tiles.tiles[i].gid + startingGID - 1;
            }
            console.log(imported_tiles.tiles);

            //POPULATE DATAMAP HERE
            if(map_obj !== null){
                let populatedDataMap = populateDataMap(map_obj, imported_tiles);
                editMap([...populatedDataMap]);
            }

            editImportedTileList(oldTilelistArray => [...oldTilelistArray, {tilesetName, startingGID, tileheight, tilewidth, tileCount}]);
            setTileList(oldArray => [...oldArray, imported_tiles]);

            setTileWidth(map_obj.tilewidth);
            setTileHeight(map_obj.tileheight);
            setMapWidth(map_obj.width);
            setMapHeight(map_obj.height);
            
            //editImportedTileList(oldTilelistArray => [...oldTilelistArray, {tilesetName, startingGID, tileheight, tilewidth, tileCount}]);
        }
        else{
            //POPULATE DATAMAP HERE
            if(map_obj !== null){
                let populatedDataMap = populateDataMap(map_obj, imported_tiles);
                editMap([...populatedDataMap]);
            }
            console.log("ADDING TS TO IMPORTED TILESET LIST!!!");
            setTileList([imported_tiles]);
            editImportedTileList([{tilesetName, startingGID: 1, tileheight, tilewidth, tileCount}]);

            console.log("CHANGING DIMENSIONS!!!!!");
            //setTileWidth(map_obj.tilewidth);
            //setTileHeight(map_obj.tileheight);
            //setMapWidth(map_obj.width);
            //setMapHeight(map_obj.height);
        }
    }

    /**
     * 
     * 
     * @param {*map} map_obj 
     * @param {*array of tileset names} used_tilesets 
     */
    const importMap = async(map_obj, used_tilesets) => {
        await refetchUserTilesets();
        if(tilesetData){
            console.log(tilesetData);
            //store the queried tileset data

            let crossCheckSuccess;
            for(let tileset = 0; tileset < used_tilesets.length; tileset++){
                crossCheckSuccess = false;
                for(let mapTilesets = 0; mapTilesets < tilesetData.getOwnerTilesets.length; mapTilesets++){
                    if(tilesetData.getOwnerTilesets[mapTilesets].name === used_tilesets[tileset]){
                        crossCheckSuccess = true;
                    }
                }
                if(!crossCheckSuccess){
                    console.log("CROSS CHECK FAILED");
                    //DO NOT LET USER IMPORT BECAUSE ONE OF THE TILESETS ASSOCIATED WITH THIS MAP IS NOT ASSOCIATED WITH THE USER
                }
                crossCheckSuccess = false;
            }

            //IMPORT TILESET ON THE MAP EDITOR NEEDS TO BE FIXED FIRST: TO TEST IMPORTING A MAP, A MAP MUST FIRST BE CREATED USING TAPS WHICH REQUIRES A TILESET (ALSO CREATED USING TAPS)
            //TO BE OPENED AND ASSOCIATED WITH THE MAP. THIS IS BECAUSE WHEN QUERYING THE DB, WE NEED TO SEE IF THE TILESETS ASSOCIATED WITH THE MAP ARE ALSO OWNED BY THE USER; OTHERWISE,
            //WE DON'T LET THEM IMPORT THE TILESET
        }

        //import each tileset to the right toolbar
        let tileset;
        for(let mapTileset = 0; mapTileset < tilesetData.getOwnerTilesets.length; mapTileset++){
            console.log("TILESET OF MAP: ", tilesetData.getOwnerTilesets[mapTileset]);
            
            tileset = await loadTSMapEditor(tilesetData.getOwnerTilesets[mapTileset].imagewidth, tilesetData.getOwnerTilesets[mapTileset].imageheight, 
                tilesetData.getOwnerTilesets[mapTileset].tilewidth, tilesetData.getOwnerTilesets[mapTileset].tileheight, tilesetData.getOwnerTilesets[mapTileset].image, 
                tilesetData.getOwnerTilesets[mapTileset].name);
            console.log("THIS IS MY TILESET: ", tileset);
                
            importTileset({TSName: tilesetData.getOwnerTilesets[mapTileset].name, tiles: tileset, tileHeight: tilesetData.getOwnerTilesets[mapTileset].tileheight, 
                tileWidth: tilesetData.getOwnerTilesets[mapTileset].tilewidth, numTiles: tilesetData.getOwnerTilesets[mapTileset].tilecount}, map_obj);
                
        }
    }
    
    const [toggleLock] = useMutation(TOGGLE_LOCK);
    const unlock = async() => {
      let result = await toggleLock({
        variables: {
          id: props.map,
          assetType: "Map",
          userId: props.authenticatedUser.id,
          lock: false
        }
      });
      let success = result.data.toggleLock;
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

    const changeTile = (tileObj) => {
        console.log("FIRED");
        changeSelect(tileObj);
    }

    useEffect(() => {
        console.log("USEEFFECT SELECTED TILE" , selectedTile);
    })
    
    const turnOnJSONMod = () => {
        console.log("here!!!!!")
        toggleJSON(true);
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
        <ToolbarLeft turnOnJSONMod={turnOnJSONMod} transactionStack = {props.transactionStack} mapHeight={mapHeight} mapWidth={mapWidth} setMapHeight={setMapHeight} setMapWidth={setMapWidth} tileHeight={tileHeight} tileWidth={tileWidth} setTileHeight={setTileHeight} setTileWidth={setTileWidth} importMap = {importMap} ></ToolbarLeft>
        </Grid>
        <Grid item  md={8} sx={{pt:4, pl:15}}>
            <Box>
            <Button variant="contained" sx={{marginRight:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={()=>{setClearCanvas(!clearCanvas)}}>Clear Canvas</Button>
            </Box>
            <Box>
                <canvas className='canvas-main'
                ref={canvasRef}
                onMouseDown={placeTile}
                ></canvas>
            </Box>
        </Grid>
        <Grid item  md={2}>


        <ToolbarRight importTileset={importTileset} importedTileList = {importedTileList} tiles = {/*GIDTable*/tileList} select ={(tile) => {
            changeSelect(prev => (tile));
        }} setErase={setErase} layerOrder={layerOrder} setOrderCallback={setOrder}  map={props.map}currentUser={currentUser} collaborators={collabList} addCollaborator={addCollaborator}></ToolbarRight>


        </Grid>
        </Grid>
        </Box>
        <JSONSaveModal open={saveJSON} onClose={() => toggleJSON(false)} layerOrder={layerOrder} tileWidth={tileWidth} tileHeight={tileHeight}
        dataMap={dataMap} mapWidth={mapWidth} mapHeight={mapHeight} importedTileList={importedTileList}/>
        </>
    )
}

export default MapEditor


