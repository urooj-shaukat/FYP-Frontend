import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { Box} from "@mui/material";
import "../../style.scss";
import { useTheme } from '@emotion/react';
import profile from "../../assets/profile.png"

import IconButton from '@mui/material/IconButton';
import { useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

function Navbar() {
  const theme = useTheme();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const [user, setUser] = React.useState();
  const [profileData, setProfileData] = React.useState(null)
  function getUser() {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
    setProfileData(JSON.parse(user))
  }




  useEffect(() => {
    getUser();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 4,
        backgroundColor:"FFFFFF"
      }}
    >
      {/* <div>
        <Search 
          breakPoint="sm"
          sx={{
            border: "1px solid #1665b5",
            ":hover": { backgroundColor: "#dbdbdb" },
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{color: theme.palette.secondary.main}}/>
          </SearchIconWrapper>
          <StyledInputBase
            style={{ padding: 6 }}
            placeholder="Search here"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{display:'flex',flexDirection:'row', marginTop:-0.8}}>
        <VscColorMode
          size={25}
          style={{
            color:theme.palette.secondary.main,
            marginTop: 8,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            border: "2px solid #E8E8E8",
            padding: 6,
            borderRadius: 6,
            ":hover": { backgroundColor: "#F5F5F5" },
            cursor:'pointer'
          }}
        />
        {/* <MdOutlineNotificationsActive
          size={25}
          style={{
            color:theme.palette.secondary.main,
            marginTop: 8,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            border: "2px solid #E8E8E8",
            padding: 6,
            borderRadius: 6,
            ":hover": { backgroundColor: "#F5F5F5" },
            cursor:'pointer'
          }}
        /> */}
        </Box>
        <Box sx={{':hover':{backgroundColor:'	#F5F5F5', borderRadius:3}, display: "flex", flexDirection: "row", cursor:'pointer' }} aria-haspopup="true" aria-controls={menuId} onClick={handleProfileMenuOpen}>
          <img onClick={()=>{handleProfileMenuOpen}}
            style={{
              borderRadius: 12,
              marginRight: 13,
              border: "1px solid #1665b5",
            }}
            height={40}
            width={40}
            src={profileData?.user.profilePic ? profileData.user.profilePic : profile }
            />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginBottom: 0 }}
          >
            <Typography
              style={{
                marginRight: 13,
                fontWeight: "bold",
                fontFamily:'Nunito, sans-serif',
              }}
            >
              {profileData ? profileData.user.fullName : 'User'}
            </Typography>
            <Typography sx={{ fontSize: 15, color:theme.palette.secondary.main, fontFamily:'Nunito, sans-serif', }}>Teacher</Typography>
          </Box>
          <MdOutlineKeyboardArrowDown
            size={25}
            style={{
              color:theme.palette.secondary.main,
              marginTop: 8,
              marginRight: 1,
              marginLeft:10,
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              border: "2px solid	#E8E8E8",
              padding: 3,
              borderRadius: 6,
              ":hover": { backgroundColor: "#E8E8E8" },
              cursor:'pointer'
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default Navbar;
