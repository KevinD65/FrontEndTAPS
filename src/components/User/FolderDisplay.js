import React from 'react'
import { GET_ASSET_SCREEN_FOLDERS, CREATE_ASSET_SCREEN_FOLDER, CHANGE_FOLDER_NAME, DELETE_FOLDER} from '../../graphql/queries/assetScreenFolders';
import Folder from './Folder';
import { useQuery, useMutation,  useLazyQuery } from '@apollo/client';
import {Button, Grid} from '@mui/material';

export default function FolderDisplay(props) {
    console.log(props);
    const { loading: get_folders_loading, error: get_folders_error, data:folderdata } = useQuery(GET_ASSET_SCREEN_FOLDERS, {
        variables: {ownerID: "63563b1a8e23cf6f7a6081d4", folderId: props.currentfolder.id},
      });
    
      

      
    const [changeAssetFolderName] = useMutation(CHANGE_FOLDER_NAME, props.refetchFolders);
    const [deleteFolder] = useMutation(DELETE_FOLDER, props.refetchFolders);
      
      const changeFolderName = async(id, new_name) =>{
        changeAssetFolderName({
          variables: {
            name: new_name,
            id : id
          }
        });
      }
      
      //Todo: delete everything in folder
      const deleteAssetFolder = async(arg_id) => {
        deleteFolder({
          variables: {
            id : arg_id
          }
        });
      }

  return (
    <>
    {!get_folders_loading && !get_folders_error && folderdata.getOwnerFolders.map((data)=>{
            
                
        return(
        <Grid  item md={3} >
        <Folder folderName={data.name} folderId={data.id} changeNameCallback={changeFolderName} deleteCallback={deleteAssetFolder}/>
        </Grid>
    )
          })}
          </>
  )
}
