import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import python from '../../../../../assets/python.png'
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import newtheme from '../../../../../Themenew'
import {LuView} from 'react-icons/lu'
import http from '../../../../../../Axios/axios';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function AssignmentCard({Assignment , CourseId}) {


  
  const [isAlreadySubmitted, setIsSubmitted] = React.useState(false);

  const getSubmission = async () => {
    try {
      const res = await http.get(`/submit/isSubmitted/${Assignment._id}`);
      if (res.data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=>{
      getSubmission()
  },[])

  const assigDate = new Date(Assignment.dueDate)
  const formattedDueDate = `${assigDate.getDate()}-${
    assigDate.getMonth() + 1
  }-${assigDate.getFullYear()}`;
  const nav = useNavigate()
  return (
    isAlreadySubmitted ? <></> : <>
    <ThemeProvider theme={newtheme}>
    <Box className="zoom"
      sx={{p: 2,
        margin: 'auto',
        marginTop:'2%',
        boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                ":hover": {
              backgroundColor:'#eff0f3', borderColor:'eff0f3'
          },
        border:'1px solid black',borderRadius:'15px',
        borderColor:'#fff',
        flexGrow: 1,
        width:'165vh',
        height:'28vh',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      onClick={() => nav(`/Student/ViewUploadedAssig/${CourseId}/${Assignment._id}`)}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Grid item xs container direction="column" spacing={2}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:2, paddingLeft:2, paddingRight:2}}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'bolder', fontFamily:'Nunito, sans-serif',}}>
                  Assignment No {Assignment.assignmentNumber}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {Assignment.name}
                </Typography>
              
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div" sx={{color: newtheme.palette.secondary.footer, fontWeight:'bold', fontFamily:'Nunito, sans-serif', }}>
                  Total points: {Assignment.totalMarks}
                </Typography>
              </Grid>
            </Box>
            <Grid item>
              <Typography sx={{ cursor: 'pointer', color: newtheme.palette.secondary.footer, fontFamily:'Nunito, sans-serif', }} variant="body2">
                Due at: {formattedDueDate} 
              </Typography>
              <Typography sx={{ cursor: 'pointer', marginBottom:2, fontFamily:'Nunito, sans-serif', }} variant="body2">
                Uploaded on: {Assignment.uploadDate?.split('T')[0]} 
              </Typography>
              <p style={{color: newtheme.palette.secondary.footer, fontWeight:'bold',
               margin:0, padding:10, border:"1px solid #1665b5", width:'17%', borderRadius:10,
                cursor:'pointer'}}><LuView fontSize={22} 
                style={{marginBottom:-6, marginRight:5, fontFamily:'Nunito, sans-serif',}}/>View Assignment</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
    
    </>
  );
}