import React , {useEffect} from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FbImage from "../../../assets/1.jpg";
import { IoLogOutOutline } from "react-icons/io5";
import { useTheme } from "@emotion/react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { RiDeleteBin5Line } from "react-icons/ri";
import storage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Person2Icon from "@mui/icons-material/Person2";
import { MuiTelInput } from "mui-tel-input";
import { Link } from "react-router-dom";
import { Register, getProfile, updateProfile } from "../../../../Axios/axiosall";
import Grid from "@mui/material/Grid";
import { CiEdit } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { GrStatusGoodSmall } from "react-icons/gr";
import { TbRosetteNumber9 } from "react-icons/tb";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import http from "../../../../Axios/axios";
import { useNavigate } from 'react-router-dom';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ViewProfile() {
  const theme = useTheme(); 
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState(null)

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [previousPass, setPreviousPass] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [Cpass, setCPass] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [image, setImage] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [isProfileOpen, setProfileOpen] = React.useState(false);
  const [selectedImageName, setSelectedImageName] = React.useState("");

  const [imgURL, setImageURL] = React.useState(null)

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setSelectedImageName(selectedFile ? selectedFile.name : ""); 
    handleClickImage(selectedFile)
  };
  
  const handleClickImage = (pic) => {
    console.log("image is  " , pic)
    const imgRef = ref(storage, `ProfilePic/${profileData._id}`);
    const uploadTask = uploadBytesResumable(imgRef, pic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log("error " , error);
      },
      () => {
        console.log("success!");
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("i am download URL " , downloadURL)
          await setImageURL(downloadURL);
          return downloadURL
        });
      }
    );
  };

  const handleChangePassword = async ()=> {

    if(pass !== Cpass){
      alert('Passwords do not match')
    }
    else if(pass === Cpass && previousPass === pass){
      alert('New Password should be different')
    }
    else{
      try {
        const res = await http.put('/users/UpdatePassword' , { previousPass, pass })
        alert(res.data.message)
        setPass('')
        setPreviousPass('')
        setCPass('')
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    
}

  const fetchProfile = async () => {
      const profile = await getProfile()
      setProfileData(profile) 
     
      setName(profile.fullName)
      setEmail(profile.email)
  }

  useEffect(() => {
    fetchProfile()
    
  },[])


  const handleEditProfile = async () => {

    console.log(imgURL)

      const res = await updateProfile( null, name, email, imgURL, null)
      setProfileOpen(false)
      fetchProfile()
  }


  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlelogout = async () => {
    await localStorage.removeItem("User");
    await localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    navigate("/SignIn");
  };

  return (
    <Box sx={{marginBottom:10}}>
      <Box>
        <p
          style={{
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 45,
            fontSize: 25,
            marginLeft: 9,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span className="underline">Profile Information</span>
        </p>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img height={250} width={250} src={profileData?.profilePic? profileData.profilePic:FbImage} style={{borderRadius:165}}></img>
            <p style={{fontWeight:'bold', fontSize:18}}>Student</p>
            <Box sx={{display:'flex', flexDirection:'row'}}>
              
              <Button onClick={handlelogout}>
                <p
                  style={{
                    fontSize: 17,
                    cursor: "pointer",
                    padding: 11,
                    borderRadius: 14,
                    backgroundColor: theme.palette.secondary.footer,
                    color: theme.palette.primary.background,
                  }}
                >
                 <IoLogOutOutline fontSize={22} style={{marginBottom:-3}}/> Sign out
                </p>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            {/* <Box sx={{ boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",}}>
              <p>Name:</p>
            </Box> */}

            <Box sx={{ width: "100%", marginTop: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  <Tab
                    icon={<ImProfile size={20} />}
                    iconPosition="start"
                    sx={{ fontWeight: "bold" }}
                    label="Profile Information"
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<RiLockPasswordLine size={20} />}
                    iconPosition="start"
                    sx={{ fontWeight: "bold" }}
                    label="Change Password"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {/* information */}
                <Grid container gap={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box
                      sx={{
                        height: "70vh",
                        boxShadow:
                          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
                        borderRadius: 5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginLeft: 5,
                          marginRight: 5,
                          marginTop: 1,
                        }}
                      >
                        <Box sx={{ marginTop: 1 }}>
                          <p style={{ fontWeight: "bolder", fontSize: 25 }}>
                            About
                          </p>
                        </Box>
                        <Box sx={{ marginTop: 4 }}>
                          <Button
                            onClick={handleProfileOpen}
                            sx={{
                              ":hover": { backgroundColor: "#4cbb17" },
                              backgroundColor: "#4cbb17",
                              color: theme.palette.primary.background,
                              paddingRight: 3,
                              paddingLeft: 3,
                              paddingTop: 1,
                              paddingBottom: 1,
                              borderRadius: 3,
                            }}
                            startIcon={<CiEdit size={20} />}
                          >
                            Edit
                          </Button>
                        </Box>
                        {/* modal for edit profile */}
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
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "90%",
                                maxWidth: "400px",
                                transform: "translate(-50%, -50%)",
                                backgroundColor:
                                  theme.palette.primary.background,
                                boxShadow: 24,
                                p: 4,
                                borderRadius: "5%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                              }}
                            >
                              <Typography
                                id="transition-modal-description"
                                sx={{}}
                              >
                                {/* Content of the modal */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontWeight: "bolder",
                                      fontSize: 23,
                                      marginTop: 0,
                                    }}
                                  >
                                    Edit Profile Information
                                  </p>
                                </Box>
                                <Box>
                                  <Box
                                    sx={{
                                      textDecoration: "none",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginBottom: 10,
                                        marginTop: 3,
                                        padding: 0,
                                        textAlign: "start",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Full Name*
                                    </p>
                                    <FormControl sx={{ width: "100%" }}>
                                      <InputLabel
                                        htmlFor="outlined-adornment-name"
                                        color="secondary"
                                      >
                                        Enter Full Name
                                      </InputLabel>
                                      <OutlinedInput
                                        id="outlined-adornment-name"
                                        color="secondary"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <Button
                                              aria-label="toggle name visibility"
                                              edge="end"
                                              color="secondary"
                                            >
                                              {
                                                <Person2Icon
                                                  sx={{
                                                    color:
                                                      theme.palette.secondary
                                                        .footer,
                                                  }}
                                                />
                                              }
                                            </Button>
                                          </InputAdornment>
                                        }
                                        label="Enter Full Name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                                <br />
                                <Box>
                                  <Box
                                    sx={{
                                      textDecoration: "none",
                                      textAlign: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginBottom: 10,
                                        marginTop: 3,
                                        padding: 0,
                                        textAlign: "start",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Email Address*
                                    </p>
                                    <FormControl sx={{ width: "100%" }}>
                                      <InputLabel
                                        htmlFor="outlined-adornment-email"
                                        color="secondary"
                                      >
                                        Enter Email Address
                                      </InputLabel>
                                      <OutlinedInput
                                        id="outlined-adornment-email"
                                        color="secondary"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <Button
                                              aria-label="toggle email visibility"
                                              edge="end"
                                              color="secondary"
                                            >
                                              {
                                                <EmailIcon
                                                  sx={{
                                                    color:
                                                      theme.palette.secondary
                                                        .footer,
                                                  }}
                                                />
                                              }
                                            </Button>
                                          </InputAdornment>
                                        }
                                        label="Enter Email Address"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                                <br />
                                <Box>
                                <p style={{ fontWeight: 'bold', margin:0, }}>
                                      Profile Picture*
                                      <Button variant="outlined" component="label" color='secondary' 
                                      sx={{ width: '100%', padding: 0.5, borderStyle: 'dashed', borderRadius: 2 }}>
                                       <Button
                                          variant="dashed"
                                          component="label"
                                          sx={{ color: "#999999" }}
                                        >
                                          Click to browse or <br />
                                          Drag and Drop Files
                                          <input 
                                          name="image"
                                          onChange={handleImageChange}
                                          hidden
                                          accept="image/*"
                                          multiple
                                          type="file" />
                                        </Button>
                                    </Button></p>
                                </Box>
                                <br />
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                      width: "100%",
                                      padding: 2,
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      marginTop: 1,
                                      borderRadius: 2,
                                      backgroundColor:
                                        theme.palette.secondary.footer,
                                      color: theme.palette.primary.background,
                                      ":hover": {
                                        backgroundColor:
                                          theme.palette.secondary.footer,
                                        color: theme.palette.primary.background,
                                      },
                                    }}
                                    onClick={() => {
                                      handleEditProfile();
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </Box>
                              </Typography>
                            </Box>
                          </Fade>
                        </Modal>
                      </Box>
                      <Box sx={{ marginLeft: 4, marginRight: 4 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 2,
                          }}
                        >
                          <GoPerson
                            size={22}
                            style={{ color: "black", marginRight: 5 }}
                          />
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              marginRight: 20,
                            }}
                          >
                            Name :{" "}
                          </p>
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {name}
                          </p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 2,
                          }}
                        >
                          <HiOutlineMail
                            size={22}
                            style={{ color: "black", marginRight: 5 }}
                          />
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              marginRight: 20,
                            }}
                          >
                            Email :{" "}
                          </p>
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {email}
                          </p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 2,
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CiStar
                              size={27}
                              style={{ color: "black", marginRight: 5 }}
                            />
                            <p
                              style={{
                                marginTop: 0,
                                fontSize: 18,
                                marginRight: 20,
                              }}
                            >
                              Role :{" "}
                            </p>
                            <p
                              style={{
                                marginTop: 0,
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              Student
                            </p>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: 2,
                            }}
                          >
                            <GrStatusGoodSmall
                              size={22}
                              style={{ color: "black", marginRight: 5 }}
                            />
                            <p
                              style={{
                                marginTop: 0,
                                fontSize: 18,
                                marginRight: 20,
                              }}
                            >
                              Account Status :{" "}
                            </p>
                            <p
                              style={{
                                marginTop: 0,
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              Active
                            </p>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 2,
                          }}
                        >
                          <TbRosetteNumber9
                            size={22}
                            style={{ color: "black", marginRight: 5 }}
                          />
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              marginRight: 20,
                            }}
                          >
                            Current Courses :{" "}
                          </p>
                          <p
                            style={{
                              marginTop: 0,
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            10
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* change password tab */}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={12} md={12} lg={12}>
                    <Box
                      sx={{
                        minHeight: "80vh",
                        boxShadow:
                          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
                        borderRadius: 5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bolder",
                            fontSize: 27,
                            marginTop: 2,
                            fontFamily: "Nunito, sans-serif",
                          }}
                        >
                          Change Password
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ margin: 0, fontSize: 15, color: "grey" }}>
                          Please Enter your previous password to change it to
                          new password.
                        </p>
                      </Box>
                      <Box
                        sx={{
                          marginTop: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ textDecoration: "none" }}>
                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: 3,
                              marginTop: 0,
                              padding: 0,
                              fontWeight: "bold",
                            }}
                          >
                            Previous Password*
                          </p>
                          <FormControl
                            sx={{ width: "100%", marginRight: 2, marginTop: 1 }}
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="outlined-adornment-password"
                              color="secondary"
                            >
                              Enter Previous Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    color="secondary"
                                    sx={{
                                      color: theme.palette.secondary.footer,
                                    }}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </Button>
                                </InputAdornment>
                              }
                              label="Enter Previous Password"
                              value={previousPass}
                              onChange={(e) => setPreviousPass(e.target.value)}
                            />
                          </FormControl>
                        </Box>

                        <br />

                        <Box
                          sx={{ textDecoration: "none", textAlign: "center" }}
                        >
                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: 3,
                              marginTop: 0,
                              padding: 0,
                              fontWeight: "bold",
                            }}
                          >
                            New Password*
                          </p>
                          <FormControl
                            sx={{ width: "100%", marginRight: 2, marginTop: 1 }}
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="outlined-adornment-password"
                              color="secondary"
                            >
                              Enter New Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    color="secondary"
                                    sx={{
                                      color: theme.palette.secondary.footer,
                                    }}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </Button>
                                </InputAdornment>
                              }
                              label="Enter New Password"
                              value={pass}
                              onChange={(e) => setPass(e.target.value)}
                            />
                          </FormControl>
                        </Box>

                        <br />
                        <Box
                          sx={{ textDecoration: "none", textAlign: "center" }}
                        >
                          <p
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: 3,
                              marginTop: 0,
                              padding: 0,
                              fontWeight: "bold",
                            }}
                          >
                            Confirm Password*
                          </p>
                          <FormControl
                            sx={{ width: "100%", marginRight: 2, marginTop: 1 }}
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="outlined-adornment-password"
                              color="secondary"
                            >
                              Confirm New Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              color="secondary"
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    color="secondary"
                                    sx={{
                                      color: theme.palette.secondary.footer,
                                    }}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </Button>
                                </InputAdornment>
                              }
                              label="Confirm New Password"
                              value={Cpass}
                              onChange={(e) => setCPass(e.target.value)}
                            />
                          </FormControl>
                        </Box>

                        <br />
                        <Box
                          sx={{
                            marginTop: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "40%",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                              width: "100%",
                              padding: 2,
                              fontSize: 16,
                              fontWeight: "bold",
                              borderRadius: 2,
                              backgroundColor: theme.palette.secondary.footer,
                              color: theme.palette.primary.background,
                              ":hover": {
                                backgroundColor: theme.palette.secondary.footer,
                                color: theme.palette.primary.background,
                              },
                            }}
                            onClick={()=> handleChangePassword()}
                          >
                            Save New Password
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ViewProfile;
