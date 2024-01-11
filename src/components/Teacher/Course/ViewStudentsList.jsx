import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Students from './StudentsTable';

function ViewStudentsList() {
  const theme = useTheme()
  return (
    <>
    <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Enrolled Students</span></p>
    <Students />
  </>
  );
}

export default ViewStudentsList;
