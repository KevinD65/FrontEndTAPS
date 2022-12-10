import {gql} from '@apollo/client';

const GET_MAP = gql`
query($id: ID!){
    getMap(id: $id){
      height
         collabolators {
        id,
        username,
        name
      }
    }
  }
  
`
export{GET_MAP};