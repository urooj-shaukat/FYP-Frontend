import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import newtheme from '../../Themenew'
import Modal from '@mui/material/Modal';
import { Link } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const navItems = ['Home', 'Courses', 'About', 'Contact',];

export default function StartPageBar() {
  const navigate = useNavigate();
  React.useEffect(()=>{
    Aos.init({duration:2500});
  },[])

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);



  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleProfileOpen = () => setProfileOpen(true);

  const handleProfileClose = () => setProfileOpen(false);



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton className="fontlink" sx={{ textAlign: 'center' }}>
              <Link href="#" sx={{ textDecoration: 'none', color: 'black' }}>
                {item}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Button
              onClick={handleProfileOpen}
              sx={{
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: newtheme.palette.secondary.footer,
                },
                border: 2,
                borderRadius: 10,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: newtheme.palette.secondary.background,
                color: newtheme.palette.primary.background,
              }}
            >
              Sign Up
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  



  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ display: 'flex', color: 'red' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: newtheme.palette.primary.background, padding: '1%', }} >
          <Toolbar >
            <IconButton
              color='theme.palette.primary.background'
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, display:'flex', flexDirection:'row', textAlign:'center', alignItems:'center' }} data-aos="fade-right">
               <img style={{marginRight:10}} height={65} width={60} src='https://t3.ftcdn.net/jpg/01/75/47/24/360_F_175472459_m4dpg0n9MIynKofOrRpbw71HO6xgDlVq.jpg'/>
              <span style={{ color: newtheme.palette.secondary.footer, fontWeight: 'bolder',fontStyle:'oblique' }}>Pro<span style={{color: newtheme.palette.secondary.background}}>Grade</span></span>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              
                <Button className="fontlink" onClick={()=>{navigate('/')}} data-aos="fade-left"  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  Home
                </Button>
                <Button className="fontlink" onClick={()=>{navigate('/')}} data-aos="fade-left"  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  Courses
                </Button>
                <Button className="fontlink" onClick={()=>{navigate('/')}} data-aos="fade-left"  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  About
                </Button>
                <Button className="fontlink" onClick={()=>{navigate('/ContactUs')}} data-aos="fade-left"  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  Contact Us
                </Button>
             
              <Button data-aos="fade-left" className="fontlink"

                onClick={handleProfileOpen}
                sx={{
                  fontWeight: 'bold', ':hover': { backgroundColor: newtheme.palette.secondary.footer }, border: 2, borderRadius: 10, paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2,
                  backgroundColor: newtheme.palette.secondary.background, color: newtheme.palette.primary.background
                }}
                >
                Sign Up
              </Button>
              <Modal
                open={isProfileOpen}
                onClose={handleProfileClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={isProfileOpen}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '90%',
                      maxWidth: '400px',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: newtheme.palette.secondary.main,
                      boxShadow: 24,
                      p: 4,
                      borderRadius: '5%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Typography id="transition-modal-description" sx={{}}>
                      {/* Content of the modal */}
                      <Box
                        sx={{
                          bgcolor: newtheme.palette.secondary.background,
                          border: 1,
                          borderColor: newtheme.palette.secondary.background,
                          borderRadius: 5,
                          ':hover': { backgroundColor: newtheme.palette.secondary.footer },
                        }}
                      >
                        <Link onClick={()=>{navigate('/TeacherSignUp')}} sx={{ textDecoration: 'none', textAlign: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              textAlign: 'center',
                              color: newtheme.palette.primary.background,
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                            }}
                          >
                            SignUp as a Teacher
                          </Typography>
                        </Link>
                      </Box>
                      <br />
                      <Box
                        sx={{
                          bgcolor: newtheme.palette.secondary.background,
                          border: 1,
                          borderColor: newtheme.palette.secondary.background,
                          borderRadius: 5,
                          ':hover': { backgroundColor: newtheme.palette.secondary.footer },
                        }}
                      >
                        <Link onClick={()=>{navigate('/StudentSignUp')}} sx={{ textDecoration: 'none', textAlign: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              textAlign: 'center',
                              color: newtheme.palette.primary.background,
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                            }}
                          >
                            SignUp as a Student
                          </Typography>
                        </Link>
                      </Box>
                      <br />
                      <Box
                        sx={{
                          bgcolor: newtheme.palette.secondary.background,
                          border: 1,
                          borderColor: newtheme.palette.secondary.background,
                          borderRadius: 5,
                          ':hover': { backgroundColor: newtheme.palette.secondary.footer },
                        }}
                      >
                        <Link onClick={()=>{navigate('/SignIn')}} sx={{ textDecoration: 'none', textAlign: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              textAlign: 'center',
                              color: newtheme.palette.primary.background,
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                            }}
                          >
                            SignIn
                          </Typography>
                        </Link>
                      </Box>
                    </Typography>
                  </Box>
                </Fade>
              </Modal>

            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer

            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

            }}
          >
            {drawer}

          </Drawer>

        </Box>


      </Box>
    </ThemeProvider>
  );
}
