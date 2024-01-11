import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CourseCard from "../Course/CourseCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import BeatLoader from "react-spinners/BeatLoader";
import Aos from "aos";
import Grid from "@mui/material/Grid";
import { BsBootstrapReboot } from "react-icons/bs";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import http from "../../../../Axios/axios";
import { useLocation } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SiCoursera } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { FcViewDetails } from "react-icons/fc";
import { TbBrandCpp } from "react-icons/tb";
import { TbBrandPython } from "react-icons/tb";
import { MdOutlineBallot } from "react-icons/md";
import { SiAssemblyscript } from "react-icons/si";
import noCoursesImage from "../../../assets/noCourses.png"

function Homepage() {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [noCourses, setNoCourses] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  const [myCourses, setMyCourses] = useState([]);
  

  async function getCourses() {
    const user = JSON.parse(localStorage.getItem("User"));
    console.log(user);
    try {
      setLoading(true);
      const response = await http.get("/course/studentCoursesList/" + user._id);
      setMyCourses(response.data.courses);
      console.log(response.data.courses);

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
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          width:'100%'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 5,
            }}
          >
            <p
              style={{
                fontWeight: "bolder",
                fontSize: 30,
                margin: 0,
              }}
            >
              My Courses
            </p>
            <p
              style={{
                fontSize: 16,
                margin: 0,
                color: "grey",
              }}
            >
              Welcome to Prograde My Courses page
            </p>
          </Box>
          <Box onClick={() => { navigate('/Student/AllCourses') }} sx={{ marginRight: 4 }}>
            <p
              style={{
                fontSize: 16,
                margin: 0,
                borderRadius: 15,
                padding: 12,
                cursor: "pointer",
                backgroundColor: newtheme.palette.secondary.footer,
                color: newtheme.palette.primary.background,
              }}
            >
              <IoIosAddCircleOutline
                fontSize={24}
                style={{ marginBottom: -6, marginRight: 10 }}
              />
              Join New Course
            </p>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            justifyContent: "center",
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          <Tabs
            color="secondary"
            sx={{ color: newtheme.palette.secondary.footer,fontFamily: 'Nunito, sans-serif', }}
            value={value}
            variant="scrollable"
            scrollButtons 
            allowScrollButtonsMobile
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab
              icon={<MdOutlineBallot fontSize={25} />}
              label="All"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder' }}
            />
            <Tab
              icon={<FaJava fontSize={25} />}
              label="Java"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder'  }}
            />
            <Tab
              icon={<TbBrandPython fontSize={25} />}
              label="Python"
              color="secondary"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder'  }}
            />
            <Tab
              icon={<TbBrandCpp fontSize={25} />}
              label="Cpp"
              color="secondary"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7 ,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder' }}
            />
            <Tab
              icon={<BsBootstrapReboot fontSize={25} />}
              label="A Language"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7 ,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder' }}
            />
            <Tab
              icon={<SiCoursera fontSize={25} />}
              label="C Language"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder'  }}
            />
            {/* <Tab
              icon={<SiAssemblyscript fontSize={25} />}
              label="Masm / Nasm"
              sx={{ color: newtheme.palette.secondary.footer, marginRight: 7,fontFamily: 'Nunito, sans-serif',fontWeight:'bolder'  }}
            /> */}
          </Tabs>
        </Box>
        {loading ? (
          <Box
          sx={{
            backgroundColor: "white",
            height:'80vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader color="#1665b5"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : noCourses ? ( // Check if there are no courses
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection:'column'
        }}
      >
        <Typography variant="h4">No Courses Found</Typography>
        <img src={noCoursesImage}  height={200} width={200}/>
      </Box>
    ) : ( 
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 1.5,
          marginRight: 2,
        }}
      >
        <Box
          data-aos="fade-up"
          onClick={() => {
            navigate("/Student/Course/" + id, {
              state: { course: myCourses.find((c) => c._id === id) },
            });
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          {myCourses.map((course) => {
            return <CourseCard course={course}></CourseCard>;
          })}
        </Box>
      </Box>

      )}
       


        <Box
          sx={{
            marginRight: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              fontSize: 16,
              width: "10%",
              margin: 0,
              borderRadius: 10,
              padding: 12,
              cursor: "pointer",
              backgroundColor: newtheme.palette.secondary.footer,
              color: newtheme.palette.primary.background,
            }}
          >
            Show More
          </p>
        </Box>
      </Box>

    </ThemeProvider>
  );
}

export default Homepage;
