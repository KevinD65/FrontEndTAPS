import {gql} from '@apollo/client';

const SAVE_TILESET = gql`
mutation($id: ID!, $input: TileInput){
    updateTileSet(id: $id, TilesetInput: $input){
      image,
    }
  }
`

const GET_TILESET = gql`
query($id: ID!){
  getTileset(id: $id){
    image,
    dataURLs,
    tilewidth,
    tileheight,
    collaborators
  }
}
`

export{SAVE_TILESET, GET_TILESET};