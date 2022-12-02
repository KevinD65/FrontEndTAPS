import {gql} from '@apollo/client';


const ADD_COLLABORATOR = gql`
mutation($input: username, $id:ID! ){
  addCollaborator(TilesetInput: $username){
    tileset
  }
}
`
const GET_COLLABORATORS = gql`
query($id: ID, $username: String, $email: String){
  getCollaborators(id: $id){
   collaborators
  }
} 
`;



export{ADD_COLLABORATOR,GET_COLLABORATORS};