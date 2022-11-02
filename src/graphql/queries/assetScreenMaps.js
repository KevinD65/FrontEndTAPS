import {gql} from '@apollo/client';

const GET_ASSET_SCREEN_MAPS = gql`
query($input: ID){
  getOwnerMaps(ownerID: $input){
    id,
    name,
    image,
    starred
  }
} 
`;

const CREATE_ASSET_SCREEN_MAP = gql`
mutation($input: MapInput){
  addMap(MapInput: $input){
    name,
    image,
    starred,
    ownerID,
  }
}
`
const CHANGE_MAP_NAME = gql`
mutation($name: String, $id: ID!){
  changeMapName(id: $id, name: $name){
    id,
    name,
  }
}
`

const DELETE_MAP = gql`
mutation($id: ID!){
  deleteMap(id: $id){
    id,
    name,
  }
}
`

export{GET_ASSET_SCREEN_MAPS, CREATE_ASSET_SCREEN_MAP, CHANGE_MAP_NAME, DELETE_MAP};