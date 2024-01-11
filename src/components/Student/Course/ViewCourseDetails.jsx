import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import About from "./CourseData/AboutCourse";
import Assignments from "./CourseData/Assignments";
import Compiler from "./CourseData/Compiler/Compile";
import Members from "./CourseData/members";
import Instructor from "./CourseData/Instructor";
import Grades from "./CourseData/Grades";
import CourseContent from "./CourseData/CourseContent";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ThemeProvider } from "@mui/material/styles";
import newtheme from "../../../Themenew";
import { MdOutlineAssignment } from "react-icons/md";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlineGrade } from "react-icons/md";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { TbBrandCpp } from "react-icons/tb";
import { TbNotes } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { SiAssemblyscript } from "react-icons/si";
import http from "../../../../Axios/axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function ViewCourseDetails({ courses }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [Code, setCode] = React.useState("");
  const [Cname, setCname] = React.useState("");
  const [Description, setCDescription] = React.useState("");
  const [Cphoto, setCphoto] = React.useState("");
  const [creditHours, setcreditHours] = React.useState();
  const [language, setLanguage] = React.useState("");
  const [Sdate, setSdate] = React.useState("");
  const [Ldate, setLdate] = React.useState("");
  const [instructor, setInstructor] = React.useState("");
  const [selectedTab, setSelectedTab] = useState("about");
  const course = location.state?.course;
  const [grades , setGrades] = useState([])


  const getGrades = async()=>{
     const res = await http.get(`/submit/GetGrades/${course._id}`)
     setGrades(res.data)
  }
  
  React.useEffect(() => {
    // setCode(course.courseCode)
    setCname(course?.name);
    // setCDescription(course.description)
    setCphoto(course?.image);
    // setcreditHours(course.creditHours)
    setLanguage(course?.language);
    setSdate(course?.startingDate);
    setLdate(course?.endingDate);
    setInstructor(course?.teacher.user.fullName);
    // console.log(course.teacher.user)
    getGrades()
  },[]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const startDate = course?.startingDate;
  const sdate = new Date(startDate);

  const formattedStartDate = `${sdate.getDate()}-${
    sdate.getMonth() + 1
  }-${sdate.getFullYear()}`;

  const endDate = course?.endingDate;
  const edate = new Date(endDate);

  const formattedEndDate = `${edate.getDate()}-${
    edate.getMonth() + 1
  }-${edate.getFullYear()}`;

  return (
    <ThemeProvider theme={newtheme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          scrollButtons 
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "20%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 2,
              marginRight: 2,
              cursor: "pointer",
            }}
          >
            <img
              src={Cphoto}
              height={80}
              width={80}
              style={{ borderRadius: 10 }}
            ></img>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <Typography sx={{ fontWeight: "bolder", fontSize: 24,fontFamily:'Nunito, sans-serif', }}>
                {Cname}
              </Typography>
              <PiDotsThreeOutlineLight
                fontSize={22}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <hr
              style={{
                borderTop: 1,
                borderColor: "divider",
                width: "100%",
                margin: 0,
              }}
            ></hr>
            {/* <Tab icon={<HiOutlineInformationCircle fontSize={25} />} iconPosition="start" sx={{color:newtheme.palette.secondary.footer, margin:0}} label="About" {...a11yProps(0)} /> */}
          </Box>

          <Tab
            icon={<MdOutlineAssignment fontSize={25} style={{ marginRight: 10 }} />}
            iconPosition="start"
            sx={{ color: newtheme.palette.secondary.footer, fontSize:16, fontFamily:'Nunito, sans-serif', }}
            label="Assignments"
            {...a11yProps(1)}
          />
          <Tab
            icon={<MdOutlineGrade fontSize={25} />}
            iconPosition="start"
            sx={{ color: newtheme.palette.secondary.footer, fontSize:16, fontFamily:'Nunito, sans-serif',  }}
            label="Grades"
            {...a11yProps(2)}
          />
          <Tab
            icon={<TbNotes fontSize={25} />}
            iconPosition="start"
            sx={{ color: newtheme.palette.secondary.footer, fontSize:16, fontFamily:'Nunito, sans-serif',  }}
            label="Lectures"
            {...a11yProps(3)}
          />
          <Tab
            icon={<BsCodeSlash fontSize={25} />}
            iconPosition="start"
            sx={{ color: newtheme.palette.secondary.footer,  fontSize:16,fontFamily:'Nunito, sans-serif',  }}
            label="Compiler"
            {...a11yProps(4)}
          />
          {/* <Tab
            icon={<PiStudent fontSize={25} />}
            iconPosition="start"
            sx={{ color: newtheme.palette.secondary.footer, fontSize:17,  }}
            label="Students"
            {...a11yProps(5)}
          /> */}
        </Tabs>
        <Box sx={{width:'80%'}}>
        <TabPanel value={value} index={0}>
          <About />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Assignments />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grades grades= {grades} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CourseContent />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Compiler />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Members />
        </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ViewCourseDetails;
