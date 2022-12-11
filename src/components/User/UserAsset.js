import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Button, Grid} from '@mui/material';
import Map from "./Map"
import Tileset from "./Tileset"
import Sidemenu from './Sidemenu';
import {useNavigate} from "react-router-dom"
import { useQuery, useMutation,  useLazyQuery } from '@apollo/client';
import {GET_ASSET_SCREEN_MAPS, CREATE_ASSET_SCREEN_MAP, CHANGE_MAP_NAME, DELETE_MAP, GET_SHARED_MAPS} from "../../graphql/queries/assetScreenMaps";
import { GET_ASSET_SCREEN_TILESETS, CREATE_ASSET_SCREEN_TILESET, CHANGE_TILESET_NAME, DELETE_TILESET, GET_SHARED_TILESETS } from '../../graphql/queries/assetTilesetMaps';
import { GET_ASSET_SCREEN_FOLDERS, CREATE_ASSET_SCREEN_FOLDER, CHANGE_FOLDER_NAME, DELETE_FOLDER} from '../../graphql/queries/assetScreenFolders';
import { TOGGLE_LOCK } from '../../graphql/mutations/locking';
import { Update } from '@mui/icons-material';
import FolderDisplay from './FolderDisplay';
import Modal from '@mui/material/Modal';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';

export default function UserAsset(props) {
  

//console.log("At asset", location.state)
  let currentUser = props.authenticatedUser;
  const location = useLocation();
  const cookies = new Cookies();

  React.useEffect(() => {
    if(currentUser.id === "-1"){
      let path = location.pathname.split("/");
      let user = cookies.get(path[path.length - 1]);
      console.log("User is empty", user);
      props.authenticateUser(user);
    }
  }, []);

  const navigate= useNavigate();
  const [currentfolderPath, changePath] = React.useState([{id: null, name: null}]);
  const [currentFolder, changeFolder] = React.useState({id: null, name: null});
  const [lockModal, showLock] = React.useState(false);
  
  const { loading: get_maps_loading, error: get_maps_error, data:mapdata } = useQuery(GET_ASSET_SCREEN_MAPS, {
    variables: {input: currentUser.id},
  });

  const { loading: get_tilesets_loading, error: get_tilesets_error, data:tilesetdata } = useQuery(GET_ASSET_SCREEN_TILESETS, {
    variables: {input: currentUser.id},
  });
  const { loading: get_shared_tilesets_loading, error: get_shared_tilesets_error, data:shared_tilesetdata } = useQuery(GET_SHARED_TILESETS, {
    variables: {id: currentUser.id},
  });

   
 const { loading: get_shared_maps_loading, error: get_shared_maps_error, data:shared_mapdata } = useQuery(GET_SHARED_MAPS, {
  variables: {id: currentUser.id},
});


const refetchSharedMaps = {
  refetchQueries: [
    {
      query: GET_SHARED_MAPS,
      variables: {input: currentUser.id}
    }
  ]
}


const refetchSharedTilesets = {
  refetchQueries: [
    {
      query: GET_SHARED_TILESETS,
      variables: {input: currentUser.id}
    }
  ]
}


  const refetchMaps = {
    refetchQueries: [
      {
        query: GET_ASSET_SCREEN_MAPS,
        variables: {input: currentUser.id}
      }
    ]
  }

  const refetchTilesets = {
    refetchQueries: [
      {
        query: GET_ASSET_SCREEN_TILESETS,
        variables: {input: currentUser.id}
      }
    ]
  }

  const refetchFolders = {
    refetchQueries: [
      {
        query: GET_ASSET_SCREEN_FOLDERS,
        variables: {ownerID: currentUser.id, folderId: currentfolderPath.at(-1).id},
      }
    ]
  }
  
  const [createMap] = useMutation(CREATE_ASSET_SCREEN_MAP, refetchMaps);
  const [changeAssetMapName] = useMutation(CHANGE_MAP_NAME, refetchMaps);
  const [deleteMap] = useMutation(DELETE_MAP, refetchMaps);

  const [createTileset] = useMutation(CREATE_ASSET_SCREEN_TILESET, refetchTilesets);
  const [changeAssetTilesetName] = useMutation(CHANGE_TILESET_NAME, refetchTilesets);
  const [deleteTileset] = useMutation(DELETE_TILESET, refetchTilesets);

  const [createFolder] = useMutation(CREATE_ASSET_SCREEN_FOLDER, refetchFolders);
  const [toggleLock] = useMutation(TOGGLE_LOCK);
  
  const createNewFolder = async() => {
    createFolder({
      variables: {
        ownerID: currentUser.id, name: "New Folder", folderId: currentfolderPath.at(-1).id
      }
    });
  }


  const createNewMap= async ()=>{
      createMap({
        variables: {
          input: { name: "New Map" , image :"something.svg", starred:false, ownerID: currentUser.id}
        }
      });

  }

  const changeMapName = async(id, new_name) =>{
    changeAssetMapName({
      variables: {
        name: new_name,
        id : id
      }
    });
  }

  const deleteAssetMap = async(arg_id) => {
    deleteMap({
      variables: {
        id : arg_id
      }
    });
  }

  const createNewTileset = async ()=>{
    createTileset({
      variables: {
        input: { name: "New Tileset" , image :"something.svg", starred:false, ownerID: currentUser.id}
      }
    });

}

const changeTilesetName = async(id, new_name) =>{
  changeAssetTilesetName({
    variables: {
      name: new_name,
      id : id
    }
  });
}

const deleteAssetTileset = async(arg_id) => {
  deleteTileset({
    variables: {
      id : arg_id
    }
  });
}

const checkLock = async(id, assetType) => {
  let result = await toggleLock({
    variables: {
      id: id,
      assetType: assetType,
      userId: currentUser.id,
      lock: true
    }
  });
  let success = result.data.toggleLock;
  console.log("Did lock?", success);
  if(success && assetType === "Tileset"){
    props.editTile(id);
    navigate(`/TileEditor/${currentUser.id}/${id}`);
  }
  else if(success && assetType === "Map"){
    props.editMap(id);
    navigate(`/mapEditor/${currentUser.id}/${id}`);
  }
  else if(!success){
    showLock(true);
  }
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
  borderRadius:2,
  
};

  return (
    <>
    <Modal open={lockModal}>
            <Box sx={style} >
            <p>Asset is currently being edited</p>
            <Button color="success" variant="contained"sx={{ml:"auto", }} onClick={() => showLock(false)}>Ok</Button>
            </Box>
        </Modal>
<Box sx={{ display: 'flex' ,backgroundColor:"F0EBE3"}}>
      <CssBaseline />
      <Sidemenu createNewMapCallback={createNewMap} createNewTilesetCallback={createNewTileset} 
      createNewFolderCallback={createNewFolder}/> 
         
<Grid container direction="row">


<Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}} >Maps <hr/></Typography>
{/* This arranges the mapped data items in a grid  */}
    <Grid container>
      {!get_maps_loading && !get_maps_error && mapdata.getOwnerMaps.map((data)=>{
            
                
                return(
                <Grid  item md={3} >
                <Map mapName={data.name} mapId={data.id} changeNameCallback={changeMapName} deleteMapCallback={deleteAssetMap}
                editMap={checkLock}/>
                </Grid>
            )
                  })}
    </Grid>


  <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}  >Tilesets <hr/></Typography>
    <Grid container   >
    {!get_tilesets_loading && !get_tilesets_error && tilesetdata.getOwnerTilesets.map((data)=>{
            
                
            return(
            <Grid  item md={3} >
            <Tileset tilesetName={data.name} tilesetId={data.id} changeNameCallback={changeTilesetName} deleteCallback={deleteAssetTileset}
            editTile={checkLock}/>
            </Grid>
        )
              })}
  
    </Grid>
    <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}  > Shared Maps <hr/></Typography>
    <Grid container>
      {!get_shared_maps_loading && !get_shared_maps_error && shared_mapdata.getSharedMaps.map((data)=>{
            
                
                return(
                <Grid  item md={3} >
                <Map mapName={data.name} mapId={data.id} changeNameCallback={changeMapName} deleteMapCallback={deleteAssetMap}
                editMap={checkLock}/>
                </Grid>
            )
                  })}
    </Grid>

    <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}  > Shared Tilesets <hr/></Typography>
    <Grid container   >
    {!get_shared_tilesets_loading && !get_shared_tilesets_error && shared_tilesetdata.getSharedTilesets.map((data)=>{
            
          {console.log("shared",data)}
            return(
            <Grid  item md={3} >
            <Tileset tilesetName={data.name} tilesetId={data.id} changeNameCallback={changeTilesetName} deleteCallback={deleteAssetTileset}
            editTile={checkLock}/>
            </Grid>
        )
              })}
  
    </Grid>

    <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}>Folders <hr/></Typography>
    <Grid container   >
    </Grid>
    <FolderDisplay currentfolder={currentfolderPath.at(-1)} refetchFolders={refetchFolders}/>
  </Grid>
      
</Box>
</>
  );
}

