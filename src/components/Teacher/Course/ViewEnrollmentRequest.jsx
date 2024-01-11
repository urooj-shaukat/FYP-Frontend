import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Requests from './RequestTable';

function ViewEnrollmentRequest() {
  const theme = useTheme()
  return (
    <>
       <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Enrollement Requests</span></p>
       <Requests />
    </>
  );
}

export default ViewEnrollmentRequest;
