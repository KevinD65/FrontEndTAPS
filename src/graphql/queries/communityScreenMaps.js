import {gql} from '@apollo/client';

const GET_COMMUNITY_SCREEN_MAPS = gql`
query($tag: String, $search: String){
  getMapsWithTag(tag: $tag, search: $search){
    id,
    name,
    image,
    starred,
    tags
  }
} 
`

export{GET_COMMUNITY_SCREEN_MAPS};