import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple,amber} from '@mui/material/colors';
import { Tooltip, Typography } from '@mui/material';

export default function Collaborators() {
  return (
    <> 
    <Typography sx={{color:"white" ,backgroundColor:"#4E6C50" ,fontWeight:700, pl:2 ,pt:1,pb:1 ,mt:4,mb:2 }}>Collaborators</Typography>
    <Stack sx={{pl:1, }}direction="row" spacing={1} >
      <Tooltip title="Max"><Avatar>MR</Avatar></Tooltip>
      <Tooltip title="Anmol"><Avatar  sx={{ bgcolor: deepOrange[500] }}>AS</Avatar></Tooltip>
      <Tooltip title="Kevin"><Avatar sx={{ bgcolor: deepPurple[500] }}>KD</Avatar></Tooltip>
      <Tooltip title="Abhi"><Avatar sx={{ bgcolor: amber[500] }}>AG</Avatar></Tooltip>
    </Stack>
    </>
  );
}
