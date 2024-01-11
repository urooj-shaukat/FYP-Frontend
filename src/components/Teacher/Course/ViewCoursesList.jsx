import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import CoursesListTable from './CoursesTable';

function ViewCoursesList() {
  const theme = useTheme()
  return (
    <Box sx={{backgroundColor:theme.palette.primary.background}}>
      <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Available Courses</span></p>
      <CoursesListTable />
    </Box>
  );
}
export default ViewCoursesList;