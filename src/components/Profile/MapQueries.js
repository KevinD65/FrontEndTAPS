import React from 'react'
import {GET_ASSET_SCREEN_MAPS, CREATE_ASSET_SCREEN_MAP, CHANGE_MAP_NAME, DELETE_MAP} from "../../graphql/queries/assetScreenMaps";
import Asset from "../Community/Asset";
import {gql, useMutation, useQuery} from '@apollo/client';
import { UPDATE_MAP_BIO } from '../../graphql/mutations/profileScreenMutations';

export default function MapQueries(props) {
    const { loading: get_maps_loading, error: get_maps_error, data:mapdata } = useQuery(GET_ASSET_SCREEN_MAPS, {
        variables: {input: props.currentUser.id},
      });

      const refetchMaps = {
        refetchQueries: [
          {
            query: GET_ASSET_SCREEN_MAPS,
            variables: {id: props.currentUser.id}
          }
        ]
      };

      const [updateMapBio] = useMutation(UPDATE_MAP_BIO, refetchMaps);

      const changeMapBio = async (id, bio) => {
        await updateMapBio({
          variables: {
            id: id,
            input: { bio: bio}
          }
        });
      }
  return (
    <>
        {!get_maps_loading && !get_maps_error && mapdata.getOwnerMaps.map((data)=>{
            
                
            return(
                <Asset currentUser={props.currentUser} asset={data} assetType={"Map"} changeBio={changeMapBio}/>
        )
              })}
    </>
  )
}