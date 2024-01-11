import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function Grades({grades}) {

  const columns = [
    { field: 'assignmentNumber', headerName: 'Assignment Number', width: 200 },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
    },
    {
      field: 'obtainedMarks',
      headerName: 'Obtained Marks',
      width: 230,
    },
    {
      field: 'totalMarks',
      headerName: 'Total Marks',
      width: 250,
    },
  ];
  
  return (
    <Box sx={{ height: '90vh', marginBottom:20}}>
      <p style={{ fontWeight: 'bold', marginBottom: 38, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Graded Assignemnts</span></p>
      
      <DataGrid sx={{fontFamily:'Nunito, sans-serif',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'}}
        rows={grades}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        disableRowSelectionOnClick
      />
    </Box>
  );
}