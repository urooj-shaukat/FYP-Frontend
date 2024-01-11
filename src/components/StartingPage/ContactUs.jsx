import React from 'react';
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import theme from '../../Themenew'
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import Footer from '../LandingPage/Footer';
import Navbar from "./Navbar";
import Aos from 'aos';
import 'aos/dist/aos.css'

function ContactUs() {
  const theme = useTheme();
  React.useEffect(()=>{
    Aos.init({duration:2500});
  },[])
  return (
    

      <>
      <Navbar />


<Grid container spacing={2} sx={{ marginBottom: 16 }}>
  <Grid xs={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: 25, alignItems: 'center' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }} data-aos="fade-up">
      <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <DoubleArrowIcon sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }} />
          <Typography sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>Contact Us</Typography>
        </Box>
        <Typography variant='h3' sx={{ marginTop: 3, marginBottom: 3, color: theme.palette.primary.main, fontWeight: 'bold' }}>Get In Touch With Us!</Typography>
        <Typography variant='h6' sx={{ color: theme.palette.primary.main, marginRight: 5 }}>  ProGrade provides grading code-based assignments by providing an automated grading system. The application
          will provide other useful features such as plagiarism checking, code compiler, and course management and assignments management.</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: 6 }}>
            <PermPhoneMsgIcon fontSize="large" style={{ border: '2px solid #1665b5', padding: 22, borderRadius: 45, color: theme.palette.secondary.main, fontSize: 90 }} />
            <Box>
              <Typography sx={{ marginLeft: 2, fontWeight: 'bold', color: theme.palette.primary.main }} variant='h5'>Phone</Typography>
              <Typography sx={{ marginTop: 2, marginLeft: 2 }} variant='h6'>+99 (0) 101 0000 888</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <EmailIcon fontSize="large" style={{ border: '2px solid #1665b5', padding: 22, borderRadius: 45, color: theme.palette.secondary.main, fontSize: 90 }} />
            <Box>
              <Typography sx={{ marginLeft: 2, fontWeight: 'bold', color: theme.palette.primary.main }} variant='h5'>Email</Typography>
              <Typography sx={{ marginTop: 2, marginLeft: 2 }} variant='h6'>Info@yourdomain.com</Typography>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  </Grid>



  <Grid xs={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: 25, alignItems: 'center' }} data-aos="fade-left">
    <Box sx={{
      '& > :not(style)': { m: 2, width: '35ch' },marginLeft:3
    }}>
      <TextField sx={{ borderRadius: 22 }} id="outlined-basic" label="Full Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
    </Box>
    <Box sx={{
      '& .MuiTextField-root': { m: 1, width: '73ch' },marginLeft:3
    }}>
      <TextField
        id="outlined-multiline-static"
        label="Message*"
        multiline
        rows={10}

      />
    </Box>
    <Box sx={{ marginTop: 4 }}>
      <Button sx={{backgroundColor: theme.palette.secondary.main, paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, borderRadius: 4,fontWeight:'bold',color: theme.palette.primary.background, ":hover": { backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background } }}>Contact Now</Button>
    </Box>
  </Grid>
</Grid>

<Footer />
      </>


  );
}

export default ContactUs;
