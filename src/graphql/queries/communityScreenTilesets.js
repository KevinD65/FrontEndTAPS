import {gql} from '@apollo/client';

const GET_COMMUNITY_SCREEN_TILESETS = gql`
query($tag: String, $search: String){
  getTilesetsWithTag(tag: $tag, search: $search){
    id,
    name,
    image,
    starred,
    tags
  }
} 
`

export{GET_COMMUNITY_SCREEN_TILESETS};