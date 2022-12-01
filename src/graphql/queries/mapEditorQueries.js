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
        name
    }
}
`

export{GET_TILESETS};