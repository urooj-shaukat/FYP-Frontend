import React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LogoImage from "../assets/logo.png";
import SignInImage from "../assets/Saly.png";
import CircleImage from "../assets/circle.png";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ClipLoader from "react-spinners/ClipLoader";
import { useTheme } from "@emotion/react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import { login, loginStudent } from "../../Axios/axiosall";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { CircleGrid } from "react-awesome-shapes";
import GoogleImage from "../../src/assets/google.png";
import FbImage from "../../src/assets/fb.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [user, setUser] = React.useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  async function loginUser() {
    setIsLoading(true);
    await login(email, pass);
  }

  function getUser() {
    const user = localStorage.getItem("User");
    const p = JSON.parse(user);
    console.log(p);
    setUser(JSON.parse(user));
  }

  const AuthStudent = async (token) => {
    // const res =
    const decoded = jwtDecode(token);
    console.log(decoded.email);

    await loginStudent(decoded.email);
    // if(res){
    //     navigate('/')
    // }
  };

  useEffect(() => {
    getUser();
  }, []);
  const [isProfileOpen, setProfileOpen] = React.useState(false);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.background,
          width: "80%",
          borderBottomRightRadius: 29,
          borderTopRightRadius: 29,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginLeft: 10, marginRight: 10 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <p
              style={{
                fontWeight: "bolder",
                fontSize: 27,
                color: theme.palette.secondary.main,
              }}
            >
              PROGRADE
            </p>
            <p
              onClick={handleProfileOpen}
              style={{
                cursor: "pointer",
                color: theme.palette.secondary.main,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                fontWeight: "bolder",
                fontSize: 15,
                border: "1px solid grey",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Sign Up
            </p>
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
                    backgroundColor: theme.palette.primary.background,
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "5%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography id="transition-modal-description" sx={{}}>
                    {/* Content of the modal */}
                    <Box
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        border: 1,
                        borderColor: theme.palette.secondary.main,
                        borderRadius: 5,
                        ":hover": {
                          backgroundColor: theme.palette.secondary.main,
                          cursor: "pointer",
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Box
                        onClick={() => {
                          navigate("/TeacherSignUp");
                        }}
                        sx={{ textDecoration: "none", textAlign: "center" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            color: theme.palette.primary.background,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                          }}
                        >
                          SignUp as a Teacher
                        </Typography>
                      </Box>
                    </Box>
                    <br />
                    <Box
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        border: 1,
                        borderColor: theme.palette.secondary.main,
                        borderRadius: 5,
                        ":hover": {
                          backgroundColor: theme.palette.secondary.main,
                          cursor: "pointer",
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Box
                        onClick={() => {
                          navigate("/StudentSignUp");
                        }}
                        sx={{ textDecoration: "none", textAlign: "center" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            color: theme.palette.primary.background,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                          }}
                        >
                          SignUp as a Student
                        </Typography>
                      </Box>
                    </Box>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                marginLeft: 10,
                marginRight: 10,
                width: "65%",
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontWeight: "bolder",
                  marginBottom: 1,
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 27,
                }}
              >
                Log In to Your ProGrade Account!
              </p>
              <p
                style={{
                  marginBottom: 1,
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 15,
                  color: "grey",
                }}
              >
                Discover a supportive community of online instructors. Get
                instant access to all course creation resources.
              </p>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: 1,
                }}
              >
                <FormControl sx={{ width: "100%", marginTop: 4 }}>
                  <InputLabel
                    htmlFor="outlined-adornment-email"
                    color="secondary"
                  >
                    Email
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
                          {<EmailIcon />}
                        </Button>
                      </InputAdornment>
                    }
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl
                  sx={{ width: "100%", marginTop: 4 }}
                  variant="outlined"
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    color="secondary"
                  >
                    Password
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    }
                    label="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <p color="secondary">
                    <Link
                      to="/ForgotPassword"
                      style={{
                        textDecoration: "none",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Forgot Password ?
                    </Link>
                  </p>
                </Box>
              </Box>
              <Box sx={{ marginTop: 1 }}>
                <Button
                  onClick={loginUser}
                  variant="contained"
                  color="secondary"
                  endIcon={
                    isLoading ? null : (
                      <LoginIcon fontSize="large" sx={{ color: "white" }} />
                    )
                  }
                  sx={{
                    width: "100%",
                    padding: 2,
                    fontSize: 16,
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                >
                  {isLoading ? (
                    <ClipLoader color="white" size={20} loading={isLoading} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p variant="body1" sx={{ color: theme.palette.primary.main }}>
                    - OR -
                  </p>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <GoogleLogin
                    onSuccess={(res) => {
                      AuthStudent(res.credential);
                    }}
                    onFailure={() => {
                      alert("Unauthorized User");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className="signin"
        bgcolor={theme.palette.secondary.main}
        sx={{ width: "58%" }}
      >
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <CircleGrid color="#696969" size="140px" zIndex={1} />
        </Box> */}
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            height: "200",
          }}
        >
          {/* <img style={{ maxWidth: '100%', height: '72vh' , marginBottom:30, marginTop:30}} src={SignInImage} /> */}
          <lottie-player
            src="https://lottie.host/b57c9ed8-0260-4f7d-854b-2dc2c917ae58/TyWXqR6aPZ.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            direction="1"
            mode="normal"
          ></lottie-player>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <CircleGrid color="#696969" size="140px" zIndex={1} />
        </Box> */}
      </Box>
    </Box>
  );
}

export default SignIn;
