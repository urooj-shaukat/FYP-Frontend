import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Aos from "aos";
import Grid from "@mui/material/Grid";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import http from "../../../../Axios/axios";
import { useTheme } from '@emotion/react';
import EnrollCourseCard from "./EnrollCourseCard";
import BeatLoader from "react-spinners/BeatLoader";
import noCoursesImage from "../../../assets/noCourses.png"

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

function ViewAllCourses() {
  const theme = useTheme();
    const navigate = useNavigate()
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [noCourses, setNoCourses] = React.useState(false);
    
    async function getCourses() {
      const user = JSON.parse(localStorage.getItem('User'))
      console.log(user)  
      try {
        setLoading(true)
          const response = await http.get('/course/ViewAllAvailableCourses/' + user._id)
          setCourses(response.data.courses)
          console.log(response.data.courses)

          if (response.data.courses.length === 0) {
            setNoCourses(true); // Set noCourses to true if there are no courses
          }
        } catch (e) {
          console.log(e);
        }finally {
          setLoading(false); // Set loading back to false when the API call completes
        }
      }

    React.useEffect(() => {
        getCourses();
      }, []);
    

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ flexGrow: 1,  marginBottom: 10 }}>
        <Grid container>
          
{/* SEARCH SECTION */}
          <Grid
            item
            xs={12}
            md={5}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 4,
            }}
          >
            <Box sx={{ minWidth: 350 }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", marginBottom: 3 }}
                >
                  Search
                </Typography>
                <TextField
                  placeholder="Search Courses"
                  sx={{
                    marginBottom: 2,
                    "& fieldset": { border: "none" },
                    borderRadius: 10,
                    width: "80%",
                    backgroundColor: "#f5f5f7",
                  }}
                ></TextField>
                <Button
                  endIcon={<SearchOutlinedIcon sx={{}} />}
                  sx={{
                    borderRadius: 10,
                    width: "80%",
                    padding: 1.5,
                    backgroundColor: newtheme.palette.secondary.footer,
                    color: newtheme.palette.primary.background,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: newtheme.palette.secondary.footer,
                      color: newtheme.palette.primary.background,
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", marginTop: 6, marginBottom: 4 }}
                >
                  Categories
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      Java
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.footer, fontWeight:'bold' }}>
                      (4)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      Python
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.footer, fontWeight:'bold'  }}>
                      (6)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      C++ Courses
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{color: newtheme.palette.secondary.footer, fontWeight:'bold' }}>
                      (2)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      {" "}
                      C Sharp
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.footer, fontWeight:'bold'  }}>
                      (7)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      C Language
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.footer, fontWeight:'bold'  }}>
                      (3)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <BpCheckbox />
                    <Typography variant="h6" sx={{ color: "#747d8f" }}>
                      MASM/NASM
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: newtheme.palette.secondary.footer, fontWeight:'bold' }}>
                      (1)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>


          <Grid container xs={12} md={7} lg={9} spacing={6} sx={{marginBottom:10}}> 

{/* FEATURED COURSES HEADING */}
            <Grid item
              xs={12}
              sm={12}
              md={12}
              lg={12}>
               <Typography
                  variant="h4"
                  sx={{ fontWeight: "bolder", marginTop:2}}
                >
                  Featured Courses
                </Typography>
            </Grid>

{/* COURSE CARD */}
<Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
{loading ? (
          <Box sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
          }}>
            <Box
          sx={{
            backgroundColor: "white",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <BeatLoader color="#1665b5"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
          </Box>
      ) : noCourses ? ( // Check if there are no courses
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection:'column' 
        }}
      >
        <Typography variant="h4">No New Courses Found</Typography>
        <img src={noCoursesImage}  height={200} width={200}/>
      </Box>
    ) : ( 
            <Box
              sx={{
                display: "flex",
                flexDirection:'row',
                flexWrap: 'wrap',
                marginTop: 4,
               
              }}
            >
              <Box sx={{display:'flex',flexDirection:'row',
                flexWrap: 'wrap', }}>
                  {courses.map((card) => {
                  return <EnrollCourseCard key={card._id} card={card}></EnrollCourseCard>;
                })}
              </Box>
            </Box>
    )}
</Grid>
             
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ViewAllCourses;
