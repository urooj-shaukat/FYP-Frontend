import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './SubmitTable';
import NoSubmission from './NoSubmission';

function ViewSubmittedAssigList() {
  const theme = useTheme()
  //This useState will be use to check weither assignments are present or not
  const [Assigdata,setAssigdata] = React.useState(false)


  return (
    <Box sx={{backgroundColor:theme.palette.primary.background}}>
    <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Assignment Submissions</span></p>
    {Assigdata ? <Contents   /> : <NoSubmission /> }
      
    </Box>

  );
}

export default ViewSubmittedAssigList;
