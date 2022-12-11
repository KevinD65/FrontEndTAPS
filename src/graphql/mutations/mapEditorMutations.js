import {gql} from '@apollo/client';

const UPDATE_MAP = gql`
mutation($id: ID!, $input: MapInput){
    updateMap(id: $id, MapInput: $input){
      id
    }
  }
`;

export{UPDATE_MAP};