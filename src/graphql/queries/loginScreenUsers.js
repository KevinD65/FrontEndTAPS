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

const VALIDATE_PWRESET_TOKEN = gql`
query($id: ID!, $token: String!){
    validateResetPWToken(id: $id, token: $token){
        name
    }
} 
`;

const SEND_RECOVERY_EMAIL = gql`
mutation($id: ID!, $email: String, $hash: String){
  sendRecoveryEmail(id: $id, email: $email, hash: $hash)
} 
`;

export{ADD_USER, GET_USER, VALIDATE_PWRESET_TOKEN, SEND_RECOVERY_EMAIL};