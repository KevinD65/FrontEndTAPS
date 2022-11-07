import {gql} from '@apollo/client';

const ADD_USER = gql`
mutation($name: String, $username: String, $email: String, $hash: String, $bio: String){
  createUser(name: $name, username: $username, email: $email, hash: $hash, bio: $bio){
    id,
    name,
    hash,
    username,
    email,
    bio
  }
} 
`;

const GET_USER = gql`
query($username: String, $email: String){
  getUser(username: $username, email: $email){
    id,
    name,
    username,
    hash,
    email,
    bio
  }
} 
`;

export{ADD_USER, GET_USER};