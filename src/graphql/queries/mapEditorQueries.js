import {gql} from '@apollo/client';

/*
const SAVE_TILESET = gql`
mutation($id: ID!, $input: TileInput){
    updateTileSet(id: $id, TilesetInput: $input){
      image,
    }
  }
`*/


const GET_TILESETS = gql`
query($ownerID: ID!){
    getOwnerTilesets(ownerID: $ownerID){
        name,
        image,
        tilewidth,
        tileheight,
        columns,
        imageheight,
        imagewidth,
        tilecount,
        type
    }
}
`

const GET_MAP = gql`
query($id: ID!){
    getMap(id: $id){
      height,
         collabolators {
        id,
        username,
        name
      },
      mapData,
      importedTileList,
      tilesets,
      layerOrder,
      mapHeight,
      mapWidth,
      tilewidth,
      tileheight
    }
  }
`



export{GET_TILESETS, GET_MAP};