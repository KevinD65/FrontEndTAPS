import {gql} from '@apollo/client';

//DELETE THIS CLASS

const VALIDATE_PWRESET_TOKEN = gql`
query($id: ID!, $token: String!){
    validateResetPWToken(id: $id, token: $token){
        name
    }
} 
`;


export{VALIDATE_PWRESET_TOKEN};

/**
 * type Query{
  getResetPasswordTokenValidation(id: ID!, token: String!): Boolean!
}
 */