import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import Map from "./Map"
import Tileset from "./Tileset"
import Sidemenu from './Sidemenu';
import { useQuery, useMutation } from '@apollo/client';
import {GET_ASSET_SCREEN_MAPS, CREATE_ASSET_SCREEN_MAP, CHANGE_MAP_NAME, DELETE_MAP} from "../../graphql/queries/assetScreenMaps";
import { GET_ASSET_SCREEN_TILESETS, CREATE_ASSET_SCREEN_TILESET, CHANGE_TILESET_NAME, DELETE_TILESET } from '../../graphql/queries/assetTilesetMaps';

const dummyData=[{name:"waterfall" ,image:"something.svg", owner:"abcd", type:"map",starred:0},
{name:"Mario " ,image:"something.svg", owner:"abcd", type:"map",starred:0},
{name:"My city" ,image:"something.svg", owner:"abcd1", type:"map",starred:1},
{name:"mountain" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:0},{name:"soil" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:1}]

export default function UserAsset(props) {

  const { loading: get_maps_loading, error: get_maps_error, data:mapdata } = useQuery(GET_ASSET_SCREEN_MAPS, {
    variables: {input: "63563b1a8e23cf6f7a6081d4"},
  });

  const { loading: get_tilesets_loading, error: get_tilesets_error, data:tilesetdata } = useQuery(GET_ASSET_SCREEN_TILESETS, {
    variables: {input: "63563b1a8e23cf6f7a6081d4"},
  });

  const refetchMaps = {
    refetchQueries: [
      {
        query: GET_ASSET_SCREEN_MAPS,
        variables: {input: "63563b1a8e23cf6f7a6081d4"}
      }
    ]
  }

  const refetchTilesets = {
    refetchQueries: [
      {
        query: GET_ASSET_SCREEN_TILESETS,
        variables: {input: "63563b1a8e23cf6f7a6081d4"}
      }
    ]
  }
  
  const [createMap] = useMutation(CREATE_ASSET_SCREEN_MAP, refetchMaps);
  const [changeAssetMapName] = useMutation(CHANGE_MAP_NAME, refetchMaps);
  const [deleteMap] = useMutation(DELETE_MAP, refetchMaps);

  const [createTileset] = useMutation(CREATE_ASSET_SCREEN_TILESET, refetchTilesets);
  const [changeAssetTilesetName] = useMutation(CHANGE_TILESET_NAME, refetchTilesets);
  const [deleteTileset] = useMutation(DELETE_TILESET, refetchTilesets);

  const createNewMap= async ()=>{
      createMap({
        variables: {
          input: { name: "New Map" , image :"something.svg", starred:false, ownerID: "63563b1a8e23cf6f7a6081d4"}
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
        input: { name: "New Tileset" , image :"something.svg", starred:false, ownerID: "63563b1a8e23cf6f7a6081d4"}
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

  return (
<Box sx={{ display: 'flex' ,backgroundColor:"F0EBE3"}}>
      <CssBaseline />
      <Sidemenu createNewMapCallback={createNewMap} createNewTilesetCallback={createNewTileset}/> 
         
<Grid container direction="row">


<Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}} >Maps <hr/></Typography>
{/* This arranges the mapped data items in a grid  */}
    <Grid container>
      {!get_maps_loading && !get_maps_error && mapdata.getOwnerMaps.map((data)=>{
            
                
                return(
                <Grid  item md={3} >
                <Map mapName={data.name} mapId={data.id} changeNameCallback={changeMapName} deleteMapCallback={deleteAssetMap}/>
                </Grid>
            )
                  })}
    </Grid>


  <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}  >Tilesets <hr/></Typography>
    <Grid container   >
    {!get_tilesets_loading && !get_tilesets_error && tilesetdata.getOwnerTilesets.map((data)=>{
            
                
            return(
            <Grid  item md={3} >
            <Tileset tilesetName={data.name} tilesetId={data.id} changeNameCallback={changeTilesetName} deleteCallback={deleteAssetTileset}/>
            </Grid>
        )
              })}
  
    </Grid>

    <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}>Folders <hr/></Typography>
    <Grid container   >
    {}
  
    </Grid>

  </Grid>
      
</Box>
    
  );
}

