import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple,amber} from '@mui/material/colors';
import { Box, Button, Tooltip, Typography,Modal,TextField } from '@mui/material';
import { useState } from 'react';
import { ADD_COLLABORATOR,GET_COLLABORATORS} from "../../graphql/queries/collaboratorQueries";
import { useMutation, useQuery } from '@apollo/client';
 
 
export default function Collaborators(props) {
 let gotUser=null;
 let error=false;
 // console.log(props.currentUser)
 const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
  
   boxShadow: 24,
   p: 4,
   borderRadius:2,
 };
 const[searchedUsername,setSearchedUsername]=useState("")
 const [open, setOpen] = useState(false);
 
 const [collabList, setCollabList]=useState([])
 const[usernames, setUsernames]=useState([])
 console.log(props.currentUser)

 const { loading: get_collab_loading, error: get_collab_error, data:collabdata } = useQuery(GET_COLLABORATORS, {
  variables: {input: props.currentUser.id},
});
 
const refetchCollaborators = {
  refetchQueries: [
    {
      query: GET_COLLABORATORS,
      variables: {input: props.currentUser.id}
    }
  ]
}

const [addCollaborator] = useMutation(ADD_COLLABORATOR, refetchCollaborators);

const addNewCollaborator= async (newUsername)=>{
  addCollaborator({
    variables: {
      input: { id:props.currentUser.id, username:newUsername}
    }
  });

}

if(!get_collab_loading && !get_collab_error && collabdata){
  console.log(collabdata)
}
 
 const handleOpen = () => {
   setOpen(true);
 };
 const handleClose = () => {
   setOpen(false);
 };
 const doneEditingValue=(e)=>{
  
 }
 const handleKeyDown = async(e) => {
   if (e.key === 'Enter'){
    
     setSearchedUsername(e.target.value)
    
    addNewCollaborator(e.target.value)
    //  addCollaborator();
    
   
 
    
    
     e.target.value=""
   }
 }
 



 
 return (
   <>
   <Box  sx={{ display: 'flex',justifyContent: 'space-between', color:"white" ,backgroundColor:"#4E6C50" ,fontWeight:700, pl:2 ,pt:1,pb:1 ,mt:4,mb:2}}>
     <Typography sx={{ pt:1}}>Collaborators</Typography>
   <Button onClick={handleOpen} sx={{color:"white", fontSize:15}}>+</Button>
   </Box>
 
<Modal
 open={open}
 onClose={handleClose}
 aria-labelledby="modal-modal-title"
 aria-describedby="modal-modal-description"
>
 <Box sx={style}>
 <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:700,}}>
     Owner:
   </Typography>
   <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:700,}}>
     Share Current TileSet
   </Typography>
  
   <TextField sx={{ mt: 2 }} id="outlined-success" label="Enter username to add collaborator "   onKeyDown={handleKeyDown} variant="filled" fullWidth/>
   {error &&<Typography sx={{color:"red"}}>User not found</Typography>}
   <Typography id="modal-modal-description" sx={{ mt: 2 ,fontWeight:700,}}>
     People with Access
     <Stack sx={{pl:2}}>
       {collabList.map((collab)=>{
          return <Typography sx={{pt:1}}>{collab.name}</Typography>
       })}
     
     </Stack>
   </Typography>
 </Box>
</Modal>
   <Stack sx={{pl:1, }}direction="row" spacing={1} >
     <Tooltip title="Max"><Avatar>MR</Avatar></Tooltip>
     <Tooltip title="Anmol"><Avatar  sx={{ bgcolor: deepOrange[500] }}>AS</Avatar></Tooltip>
     <Tooltip title="Kevin"><Avatar sx={{ bgcolor: deepPurple[500] }}>KD</Avatar></Tooltip>
     <Tooltip title="Abhi"><Avatar sx={{ bgcolor: amber[500] }}>AG</Avatar></Tooltip>
   </Stack>
   </>
 );
}
 
 
 
