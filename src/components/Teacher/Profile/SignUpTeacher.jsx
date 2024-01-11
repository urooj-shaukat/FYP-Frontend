import React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SignupImage from "../../../assets/signup.png";
import LogoImage from "../../../assets/logo.png";
import GoogleImage from "../../../assets/google.png";
import FbImage from "../../../assets/fb.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { CircleGrid } from "react-awesome-shapes";
import FormControl from "@mui/material/FormControl";
import storage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Person2Icon from "@mui/icons-material/Person2";
import { MuiTelInput } from "mui-tel-input";
import { Link } from "react-router-dom";
import { Register } from "../../../../Axios/axiosall";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [Cpass, setCPass] = React.useState("");

  const [pic, setPic] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [selectedImageName, setSelectedImageName] = React.useState("");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setSelectedImageName(selectedFile ? selectedFile.name : ""); // Set the name or an empty string if no file is selected
  };

  const ValidateName = (name, setError) => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (name == "") {
      setError("Name cannot be empty");
      return false;
    } else if (!namePattern.test(name)) {
      setError("Invalid Name");
      return false;
    }
    setError("");
    return true;
  };

  const ValidateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9_.-]+@comsats\.edu\.pk$/;

    if (email === "") {
      setEmailError("Email cannot be empty");
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Email Error");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePasswords = () => {
    if (pass == "" || Cpass == "") {
      setPassError("Passwords cannot be empty");
      return false;
    } else if (pass != Cpass) {
      setPassError("Passwords do not match");
      return false;
    }
    setPassError("");
    return true;
  };

  const validateFile = () => {
    if (file == null || file == "") {
      setFileError("File is required");
      return false;
    }
    setFileError("");
    return true;
  };

  const handleClick = () => {
    const isNameValid = ValidateName(name, setNameError);
    const isEmailValid = ValidateEmail();

    const isPassValid = validatePasswords();
    if (isNameValid && isEmailValid && isPassValid) {
      handleClickImage();
    } else {
      alert("Please enter required Fields");
    }
  };

  const registerTeacher = (downloadURL) => {
    const isNameValid = ValidateName(name, setNameError);
    const isEmailValid = ValidateEmail();

    const isPassValid = validatePasswords();
    if (isNameValid && isEmailValid && isPassValid) {
      setIsLoading(true);
      const response = Register(
        name,
        email,
        pass,
        "Teacher",
        downloadURL,
        "/123",
        null
      );
      if (response) {
        navigate("/SignIn");
      } else {
        alert("Error Occured");
      }
    }
  };

  const handleClickImage = () => {
    if (image === null) {
      return;
    }
    // setIsSubmitting(true);
    const imgRef = ref(storage, `courseImages/${image.name}`);
    const uploadTask = uploadBytesResumable(imgRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log("error");
      },
      () => {
        console.log("success!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          registerTeacher(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        maxHeight: "200vh",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.background,
          width: "80%",
          borderBottomRightRadius: 29,
          borderTopRightRadius: 29,
        }}
      >
        <Box
          sx={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 0,
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
              style={{
                pointer: "cursor",
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
              {" "}
              <Link
                to="/SignIn"
                style={{
                  textDecoration: "none",
                  color: theme.palette.secondary.main,
                }}
              >
                Sign In
              </Link>
            </p>
          </Box>
          <Box
            sx={{
              marginLeft: 10,
              marginRight: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bolder",
                  marginBottom: 0,
                  fontSize: 25,
                  width: "90%",
                }}
              >
                Become a ProGrade Instructor Now!
              </p>
              <p style={{ fontSize: 15, color: "grey", width: "90%" }}>
                Discover a supportive community of online instructors.
              </p>
            </Box>
            {/* all the textfields */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                  marginTop: 1,
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel
                    htmlFor="outlined-adornment-name"
                    color="secondary"
                  >
                    Full Name
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
                          {<Person2Icon />}
                        </Button>
                      </InputAdornment>
                    }
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormHelperText>
                    <Typography variant="body2" color="error">
                      {nameError}
                    </Typography>
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "100%", marginTop: 2 }}>
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
                  <Typography variant="body2" color="error">
                    {emailError}
                  </Typography>
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControl
                    sx={{ width: "100%", marginTop: 2, marginRight: 2 }}
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
                  <FormControl
                    sx={{ width: "100%", marginTop: 2 }}
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      color="secondary"
                    >
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      color="secondary"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </Button>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      value={Cpass}
                      onChange={(e) => setCPass(e.target.value)}
                    />
                    <FormHelperText>
                      <Typography variant="body2" color="error">
                        {passError}
                      </Typography>
                    </FormHelperText>
                  </FormControl>
                </Box>
                {/* <FormControl sx={{ width: '100%', marginTop: 4 }}  >
                                    <InputLabel htmlFor="outlined-adornment-email" color='secondary'>Phone</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        color='secondary'
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Button
                                                    aria-label="toggle email visibility"
                                                    edge="end"
                                                    color='secondary'
                                                >
                                                    {<PhoneEnabledIcon />}
                                                </Button>
                                            </InputAdornment>
                                        }
                                        label="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <Typography variant="body2" color="error">
                                                {phoneError}
                                            </Typography>
                                </FormControl> */}

                <Box sx={{ marginTop: 2, marginBottom: 2, fontWeight: "bold" }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    Profile Picture{" "}
                    <Button
                      variant="outlined"
                      component="label"
                      color="secondary"
                      sx={{
                        width: "100%",
                        padding: 0.5,
                        borderStyle: "dashed",
                        borderRadius: 2,
                      }}
                    >
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
                          type="file"
                        />
                      </Button>
                    </Button>
                    {selectedImageName && (
                      <p style={{ marginTop: 10 }}>
                        Selected Image: {selectedImageName}
                      </p>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* submit button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                onClick={() => handleClick()}
                variant="contained"
                color="secondary"
                endIcon={
                  isLoading ? null : (
                    <HowToRegIcon fontSize="large" sx={{ color: "white" }} />
                  )
                }
                sx={{
                  width: "90%",
                  padding: 2,
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 1,
                  borderRadius: 2,
                }}
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#fff" loading={isLoading} />
                ) : (
                  "Sign Up as a Teacher"
                )}
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <p sx={{ fontWeight: "bold" }}>- OR -</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ padding: 1, borderRadius: 2 }}
                >
                  {" "}
                  <img
                    src={GoogleImage}
                    height={28}
                    style={{ marginRight: 5 }}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* image side */}
      <Box bgcolor={theme.palette.secondary.main} sx={{ width: "58%" }}>
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            height: "200",
            marginTop:18
          }}
        >
          {/* <img
            style={{
              maxWidth: "100%",
              height: "72vh",
              marginBottom: 30,
              marginTop: 50,
            }}
            src="https://png.pngtree.com/png-vector/20220609/ourmid/pngtree-woman-working-at-computer-sitting-at-table-png-image_4840281.png"
          /> */}

          <lottie-player
            src="https://lottie.host/0507cd32-fc15-492a-9313-4dd2b186971a/qqjqQgw8EH.json"
            background="##FFFFFF"
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
          <CircleGrid color="#696969" size="120px" zIndex={1} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default SignUp;
