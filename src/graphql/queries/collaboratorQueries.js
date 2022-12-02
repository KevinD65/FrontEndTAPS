import {gql} from '@apollo/client';


const ADD_COLLABORATOR_TILE = gql`
mutation ($username: String, $id: ID!) {
  addCollaborator(username: $username, id: $id) {
    id    
  }
}
`
const ADD_COLLABORATOR_MAP=gql`
mutation ($username: String, $id: ID!) {
  addCollaboratorMap(username: $username, id: $id) {
    id    
  }
}
`
const GET_COLLABORATORS_TILE = gql`
query($id: ID, $username: String, $email: String){
  getCollaborators(id: $id){
   collaborators
  }
} 
`;



export{ADD_COLLABORATOR_TILE,GET_COLLABORATORS_TILE,ADD_COLLABORATOR_MAP};