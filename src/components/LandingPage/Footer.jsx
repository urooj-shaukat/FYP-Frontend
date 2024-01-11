import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Button} from '@mui/material';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import newtheme from '../../Themenew'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import Aos from 'aos';
import 'aos/dist/aos.css'

export default function Footer() {
  const [email, setEmail] = React.useState('')
  React.useEffect(()=>{
    Aos.init({duration:2500});
  },[])

  return (
    <ThemeProvider theme={newtheme}>
    <Box
      component="footer"
      sx={{
        backgroundColor: newtheme.palette.secondary.footer,
        color: newtheme.palette.primary.background,
        p: 6,
        overflowX:'hidden'
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={4} data-aos="fade-right">
            <Typography variant="h4" sx={{fontWeight:'bold',color: newtheme.palette.primary.background}}  gutterBottom>
              ProGrade
            </Typography>
            <Typography variant="body2">
              We are dedicated to providing the best service to our
              users.
            </Typography>
          </Grid>
          <Grid item xs={4} sm={2} data-aos="fade-up">
            <Typography variant="h5"sx={{fontWeight:'bold',color: newtheme.palette.secondary.icon}} gutterBottom>
              Catogeries
            </Typography>
            
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none'}}>
              <Typography sx={{marginTop:'7%',marginBottom:'5%',marginLeft:'3%' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              },}}>Python</Typography>
            </Link>
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginTop:'7%',marginBottom:'5%',marginLeft:'3%'}}>Cpp</Typography>
            </Link>
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginTop:'7%',marginBottom:'5%',marginLeft:'3%'}}>Java</Typography>
            </Link>
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginTop:'7%',marginBottom:'5%',marginLeft:'3%'}}>C Language</Typography>
            </Link>
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginLeft:'3%'}}>R Language</Typography>
            </Link>
            
          </Grid>
          <Grid item xs={4} sm={2} data-aos="fade-up">
            <Typography variant="h5"sx={{fontWeight:'bold',color: newtheme.palette.secondary.icon}} gutterBottom>
              Support
            </Typography>
            
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginTop:'7%',marginBottom:'5%',marginLeft:'3%'}}>Profile</Typography>
            </Link>
            <Link href="#"  sx={{color: newtheme.palette.primary.background,textDecoration:'none' ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Typography sx={{marginLeft:'3%'}}>Contact</Typography>
            </Link>
            
          </Grid>
          <Grid item xs={12} sm={4} data-aos="fade-left">
            <Typography variant="h5"  sx={{fontWeight:'bold',color: newtheme.palette.secondary.icon}} gutterBottom>
              Get in Touch
            </Typography>
            <FormControl sx={{ width: '100%', marginTop: 4 }}  >
                        <InputLabel htmlFor="outlined-adornment-email" sx={{color : newtheme.palette.primary.background}}>Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            sx={{color:newtheme.palette.primary.background,
                              '& fieldset': {
                                borderColor: newtheme.palette.primary.background,
                              },
                            }}
                            
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        aria-label="toggle email visibility"
                                        edge="end"
                                        sx={{color: newtheme.palette.primary.background}}
                                    >
                                        {<EmailIcon />}
                                    </Button>
                                </InputAdornment>
                            }
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <Box sx={{padding:'10%'}}>
            <Link href="https://www.facebook.com/"  sx={{color: newtheme.palette.secondary.icon ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}>
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              
              sx={{ pl: 1, pr: 1 ,marginLeft:'8%' ,color: newtheme.palette.secondary.icon ,'&:hover': {
                color:newtheme.palette.secondary.background ,
              }}}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" sx={{ pl: 1, pr: 1 ,marginLeft:'8%',
            color:newtheme.palette.secondary.icon ,'&:hover': {
              color:newtheme.palette.secondary.background ,
            }}}>
              <Twitter />
            </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2"  align="center">
            {"Copyright @ "}
            <Link  href="#" sx={{color:newtheme.palette.primary.background}}>
              ProGrade
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
    </ThemeProvider>
  );
}