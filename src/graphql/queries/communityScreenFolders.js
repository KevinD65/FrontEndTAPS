import {gql} from '@apollo/client';

const GET_COMMUNITY_SCREEN_FOLDERS = gql`
query($tag: String, $search: String){
  getFoldersWithTag(tag: $tag, search: $search){
    id,
    name,
    tags
  }
} 
`

export{GET_COMMUNITY_SCREEN_FOLDERS};