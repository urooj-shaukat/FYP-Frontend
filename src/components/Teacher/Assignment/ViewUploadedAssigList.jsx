import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './Table';


function ViewUploadedAssigList() {
  const theme = useTheme()
  return (
    <Box sx={{backgroundColor:theme.palette.primary.background}}>
    <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Available Assignments</span></p>
    <Contents   />
    </Box>

  );
}

export default ViewUploadedAssigList;
