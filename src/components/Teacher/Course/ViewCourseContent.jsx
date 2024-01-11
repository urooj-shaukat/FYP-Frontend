import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './ContentTable';


function ViewCourseContent() {
  const theme = useTheme()
  return (
    <>
      <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Course Contents</span></p>
      <Contents />
    </>

  );
}

export default ViewCourseContent;
