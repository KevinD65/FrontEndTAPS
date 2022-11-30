import {gql} from '@apollo/client';
const UPDATE_TS_BIO = gql`
mutation($id: ID!, $input: TileInput){
    updateTileSet(id: $id, TilesetInput: $input){
      id,
      bio
    }
  }
`;

const UPDATE_MAP_BIO = gql`
mutation($id: ID!, $input: MapInput){
    updateMap(id: $id, MapInput: $input){
      id,
      bio
    }
  }
`;

export{UPDATE_TS_BIO, UPDATE_MAP_BIO};

