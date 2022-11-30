import {gql} from '@apollo/client';

const TOGGLE_LOCK = gql`
mutation($id: ID!, $assetType: String, $userId: ID, $lock: Boolean){
    toggleLock(id: $id, assetType: $assetType, userId: $userId, lock: $lock)
  }
`
export {TOGGLE_LOCK}