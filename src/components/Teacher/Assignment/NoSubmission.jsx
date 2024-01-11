import React from "react";
import { Button, Typography } from '@mui/material';
import  Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import NoAssig from '../../../assets/noassig.png';
export default function NoSubmission() {
    const theme = useTheme()
 return(
    <>
    <Box sx={{
          backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,

          },fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2, height:'70vh', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
        }}>
            <Box sx={{marginLeft:'40%'}}>
            <img style={{ maxWidth: '40%', height: '40vh' , marginTop:'5%'}} src={NoAssig} />

            
        
          <Typography variant='h6' sx={{ marginTop:'1%' }}>No Submissions Yet</Typography>
          <Typography variant='h6' sx={{ marginTop:'1%' }}>Please Check Later</Typography>

          </Box>
          </Box>
    </>
 )
}