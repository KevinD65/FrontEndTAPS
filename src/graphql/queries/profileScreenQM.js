import {gql} from '@apollo/client';

const UPDATE_USER_INFO = gql`
mutation($id: ID!, $name: String, $username: String, $email: String, $hash: String, $bio: String){
  updateUser(id: $id, name: $name, username: $username, email: $email, hash: $hash, bio: $bio){
    id,
    name,
    username,
    email,
    hash,
    bio
  }
} 
`;

const GET_USER = gql`
query($id: ID, $username: String, $email: String){
  getUser(id: $id, username: $username, email: $email){
    id,
    name,
    username,
    hash,
    email,
    bio
  }
} 
`;

export{UPDATE_USER_INFO, GET_USER};