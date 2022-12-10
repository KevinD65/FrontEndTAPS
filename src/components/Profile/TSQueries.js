import React from 'react'
import { GET_ASSET_SCREEN_TILESETS, CREATE_ASSET_SCREEN_TILESET, CHANGE_TILESET_NAME, DELETE_TILESET } from '../../graphql/queries/assetTilesetMaps';
import { UPDATE_TS_BIO } from '../../graphql/mutations/profileScreenMutations';
import Asset from "../Community/Asset";
import {gql, useMutation, useQuery} from '@apollo/client';

export default function TSQueries(props) {
    const { loading: get_tilesets_loading, error: get_tilesets_error, data:tilesetdata } = useQuery(GET_ASSET_SCREEN_TILESETS, {
        variables: {input: props.currentUser.id},
      });

      const refetchTS = {
        refetchQueries: [
          {
            query: GET_ASSET_SCREEN_TILESETS,
            variables: {id: props.currentUser.id}
          }
        ]
      };

      const [updateTSBio] = useMutation(UPDATE_TS_BIO, refetchTS);

      const changeTSBio = async (id, bio) => {
        console.log("Asset id in function", id);
        await updateTSBio({
          variables: {
            id: id,
            input: { bio: bio}
          }
        });
      }

  return (
    <>
        {!get_tilesets_loading && !get_tilesets_error && tilesetdata.getOwnerTilesets.map((data)=>{
            
                
            return(
                <Asset currentUser={props.currentUser} asset={data} assetType={"Tile"} changeBio={changeTSBio}/>
        )
              })}
    </>
  )
}
