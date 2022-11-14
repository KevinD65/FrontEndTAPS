import {gql} from '@apollo/client';

const GET_ASSET_SCREEN_FOLDERS = gql`
query($ownerID: ID, $folderId: ID){
    getOwnerFolders(ownerID: $ownerID, folderId: $folderId){
      id,
      name,
      folderId,
      maps{
        id,
        folderId,
          name,
          image,
          starred
      },
      tilesets{
        id,
        folderId,
          name,
          image,
          starred
      }
    }
    
  } 
`;

const CREATE_ASSET_SCREEN_FOLDER = gql`
mutation($name: String, $ownerID: ID!, $folderId: ID){
    createFolder(ownerID: $ownerID, name: $name, folderId: $folderId){
      id,
      name,
    }
  }
`
const CHANGE_FOLDER_NAME = gql`
mutation($id: ID!, $name: String){
    updateFolder(id: $id, name: $name){
      id,
      name,
    }
  }
`

const DELETE_FOLDER = gql`
mutation ($id: ID!){
    deleteFolder(id: $id){
      id,
      name,
    }
  }
`

export{GET_ASSET_SCREEN_FOLDERS, CREATE_ASSET_SCREEN_FOLDER, CHANGE_FOLDER_NAME, DELETE_FOLDER};