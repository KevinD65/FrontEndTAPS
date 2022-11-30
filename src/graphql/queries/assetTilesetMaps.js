import {gql} from '@apollo/client';

const GET_ASSET_SCREEN_TILESETS = gql`
query($input: ID){
  getOwnerTilesets(ownerID: $input){
    id,
    name,
    image,
    starred,
    bio
  }
} 
`;

const CREATE_ASSET_SCREEN_TILESET = gql`
mutation($input: TileInput){
  addTileSet(TilesetInput: $input){
    name,
    image,
    starred,
    ownerID,
  }
}
`
const CHANGE_TILESET_NAME = gql`
mutation($name: String, $id: ID!){
  changeTilesetName(id: $id, name: $name){
    id,
    name,
  }
}
`

const DELETE_TILESET = gql`
mutation($id: ID!){
  deleteTileSet(id: $id){
    id,
    name,
  }
}
`

export{GET_ASSET_SCREEN_TILESETS, CREATE_ASSET_SCREEN_TILESET, CHANGE_TILESET_NAME, DELETE_TILESET};