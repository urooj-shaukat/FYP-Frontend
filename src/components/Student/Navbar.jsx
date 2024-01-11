import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import "../../App.css"
import logo1 from '.././../assets/logo1.png'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import {Menu, MenuItem} from '@mui/material';
import newtheme from '../../Themenew'
import { Link } from '@mui/material';
import profile from '../../assets/profile.png'
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import Aos from 'aos';
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const navItems = ['Home', 'All Courses', 'Reports',];

export default function DrawerAppBar() {
  const navigate = useNavigate();

  function deleteAll() {
    localStorage.removeItem("User");
     localStorage.removeItem("token");
    localStorage.removeItem("loggedIn")
    return navigate('/SignIn')
  }
  const [profileData, setProfileData ] = React.useState(null)
  React.useEffect(()=>{
    Aos.init({duration:2500});
    const  userJSON = localStorage.getItem("User")
    const user = JSON.parse(userJSON)
    setProfileData(user)
  },[])

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);

  const [anchorElCourses, setAnchorElCourses] = useState(null);
  const [anchorElAssignments, setAnchorElAssignments] = useState(null);
  const [anchorE2profile,setAnchorE2profile] = useState(null);
  const handleMenuOpenCourses = (event) => {
    setAnchorElCourses(event.currentTarget);
  };

  const handleMenuCloseCourses = () => {
    setAnchorElCourses(null);
  };

  const handleMenuOpenAssignments = (event) => {
    setAnchorElAssignments(event.currentTarget);
  };

  const handleMenuCloseAssignments = () => {
    setAnchorElAssignments(null);
  };
  const handleMenuOpenProfile = (event) => {
    setAnchorE2profile(event.currentTarget);
  };

  const handleMenuCloseProfile = () => {
    setAnchorE2profile(null);
  };

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
              <Link href="/Student/Home" sx={{ textDecoration: 'none', color: 'black' }}>
                {item}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Button
              onClick={deleteAll}
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
                backgroundColor: newtheme.palette.secondary.footer,
                color: newtheme.palette.primary.background,
              }}
            >
              Sign Out
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
        <AppBar component="nav" sx={{ backgroundColor: newtheme.palette.primary.background, padding: '1%',boxShadow:'none' }} >
          <Toolbar sx={{ justifyContent: 'center' }}>
            <IconButton
              color='theme.palette.primary.background'
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography  onClick={() => { navigate('/Student/Home') }} component="div" sx={{cursor:'pointer', flexGrow: 1, display:'flex', flexDirection:'row', textAlign:'center', alignItems:'center',fontSize:30, fontFamily:'Dela Gothic One' }} data-aos="fade-right">
               <img className='logo' style={{marginRight:10}} height={40} width={50} src={logo1}/>
              <span style={{ color: newtheme.palette.secondary.footer, fontWeight: 'bolder',fontFamily: 'Nunito, sans-serif',}}>PROGRADE</span>
            </Typography>
            

            <div style={{flexGrow:1}} data-aos="fade-left">
              <div className='nav' style={{fontFamily: 'Nunito, sans-serif'}}>
                  <Button className="fontlink" onClick={() => { navigate('/Student/Home') }}  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bolder', marginRight: 2,fontFamily: 'Nunito, sans-serif', ":hover": { borderBottom: '4px solid #1665b5' } }}>
                    Home
                  </Button>
                  <Button className="fontlink" onClick={() => { navigate('/Student/AllCourses') }}  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bolder',fontFamily: 'Nunito, sans-serif', marginRight: 2, ":hover": { borderBottom: '4px solid #1665b5' } }}>
                  All Courses
                  </Button>
                  
                  <Button className="fontlink" onClick={()=>{navigate('/Student/Home')}} sx={{ color: newtheme.palette.primary.main, fontWeight: 'bolder',fontFamily: 'Nunito, sans-serif', marginRight: 2, ":hover": { borderBottom: '4px solid #1665b5' } }}>
                    Reports
                  </Button>
              </div>
            </div>
           
                 <IconButton sx={{color:newtheme.palette.primary.main}}
                    onMouseEnter={handleMenuOpenProfile}
                >
                      <img style={{
                    borderRadius: 20,
                  }}
                  height={40}
                  width={40}
                  src={
                    profileData?.userID?.profilePic ? profileData.userID.profilePic :
                    profile}
                  />
                </IconButton>
                <Menu
                anchorE2={anchorE2profile}
                open={Boolean(anchorE2profile)}
                onClose={handleMenuCloseProfile}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                
                elevation={0}
                sx={{ zIndex: 1500 , marginTop:'3%' }} 
                onMouseEnter={handleMenuOpenProfile}
                
               
                MenuListProps={{onMouseLeave: handleMenuCloseProfile}}
                >
                  <MenuItem sx={{fontFamily: 'Nunito, sans-serif',}} onClick={() => { navigate('/Student/Profile') }}>My profile</MenuItem>
                  <MenuItem sx={{fontFamily: 'Nunito, sans-serif',}} onClick={(e) => {
              e.preventDefault()
              deleteAll()}}>Logout</MenuItem>
                </Menu>

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
