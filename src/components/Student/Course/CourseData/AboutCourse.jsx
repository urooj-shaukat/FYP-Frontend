import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Picture2 from "../../../../assets/Picture2.png"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {FiCodepen} from "react-icons/fi"
import {FcViewDetails} from "react-icons/fc"
import {BsCodeSlash} from "react-icons/bs"
import {ImHourGlass} from 'react-icons/im'
import {FaChalkboardTeacher} from "react-icons/fa"
import {AiOutlineBars} from 'react-icons/ai'
import newtheme from '../../../../Themenew';


const About = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [Code, setCode] = React.useState('')
  const [Cname, setCname] = React.useState('')
  const [Description, setCDescription] = React.useState('')
  const [Cphoto, setCphoto] = React.useState("")
  const [creditHours, setcreditHours] = React.useState()
  const [language, setLanguage] = React.useState('')
  const [Sdate, setSdate] = React.useState('')
  const [Ldate, setLdate] = React.useState('')
  const [instructor, setInstructor] = React.useState('')
  const [instructorEmail, setInstructorEmail] = React.useState('')
  const [selectedTab, setSelectedTab] = useState('about');
  const course = location.state?.course
 
  React.useEffect(() => {

    setCode(course.courseCode)
    setCname(course?.name)
    setCDescription(course.description)
    setCphoto(course?.image)
    setcreditHours(course.creditHours)
    setLanguage(course?.language)
    setSdate(course?.startingDate)
    setLdate(course?.endingDate)
    setInstructor(course?.teacher.user.fullName)
    setInstructorEmail(course?.teacher.user.email)
    // console.log(course.teacher.user)
})
  
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
    <Box sx={{minHeight:'150vh'}}>
      <Grid container >
        <Grid item xs={12} sm={12} md={12} lg={12}>
           <Box sx={{ position: "relative", color: "white" }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <img src={Picture2} height={300} width={'100%'} style={{borderRadius:10}}></img>
            </Box>
            <Box
                sx={{
                  position: "absolute",
                  bottom: 28,
                  left: 33,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bolder", marginBottom: 1, backgroundColor:'#485f60', padding:2, borderRadius:2, fontFamily:'Nunito, sans-serif', }}
                >
                  Welcome to the Course!
                </Typography>
                
              </Box>
           </Box>
           <Box sx={{marginTop:3, marginLeft:3}}>
            <Typography variant='h5' sx={{fontWeight:'bold',fontFamily:'Nunito, sans-serif',}}>Complete Master Class of: {Cname}</Typography>
            <Typography sx={{color:'grey',marginTop:1, fontFamily:'Nunito, sans-serif',}}>Includes Programming Assignments, Lectures and Quick feedback for the Assesments</Typography>
           </Box>
        </Grid>
      </Grid>

      <Grid container sx={{marginTop:5, height:'30vh', borderRadius:12}}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Typography sx={{fontWeight:'bolder', fontSize:26, marginBottom:4, color:newtheme.palette.secondary.footer, fontFamily:'Nunito, sans-serif',}}>Course Details</Typography>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row'}}>


            <Box sx={{display:'flex', flexDirection:'column'}}>
              <Box sx={{display:'flex', flexDirection:'row'}}>
                <Box sx={{display:'flex', flexDirection:'column', marginRight:2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius:5}}>
                  <Box sx={{marginTop:2,display:'flex', flexDirection:'column',backgroundColor:newtheme.palette.primary.background, padding:2, borderRadius:7}}>
                    <Typography sx={{fontWeight:'bold', fontSize:20,fontFamily:'Nunito, sans-serif',}}><FiCodepen fontSize={25} style={{marginBottom:-5, marginRight:8}}/>Course Code</Typography>
                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:1}}>
                      <Typography sx={{ fontSize:18,fontFamily:'Nunito, sans-serif',}}>{Code}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{marginTop:2,display:'flex', flexDirection:'column',backgroundColor:newtheme.palette.primary.background, padding:2, borderRadius:7}}>
                    <Typography sx={{fontWeight:'bold', fontSize:20, marginRight:5,fontFamily:'Nunito, sans-serif',}}><BsCodeSlash fontSize={25} style={{marginBottom:-5, marginRight:8}}/>Language</Typography>
                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:1}}>
                      <Typography sx={{ fontSize:18,fontFamily:'Nunito, sans-serif',}}>{language}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{display:'flex', flexDirection:'column',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius:5}}>
                  <Box sx={{display:'flex', flexDirection:'column', textAlign:'center',marginTop:2,marginLeft:3, backgroundColor:newtheme.palette.primary.background, padding:2, borderRadius:7}}>
                    <Typography sx={{fontWeight:'bold', fontSize:20, marginRight:5, marginBottom:3, fontFamily:'Nunito, sans-serif',}}><FaChalkboardTeacher fontSize={25} style={{marginBottom:-5, marginRight:8}}/>Instructor Details</Typography>
                    <Typography sx={{fontSize:18,fontFamily:'Nunito, sans-serif',}}>{instructor}</Typography>
                    <Typography sx={{fontSize:18, marginTop:3,fontFamily:'Nunito, sans-serif',}}>{instructorEmail}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius:5, padding:4, marginTop:3, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Typography sx={{fontWeight:'bold', fontSize:20,fontFamily:'Nunito, sans-serif',}}>Starting From <span style={{color:newtheme.palette.secondary.background,fontFamily:'Nunito, sans-serif',}}>{formattedStartDate}</span> To <span style={{color:newtheme.palette.secondary.background,fontFamily:'Nunito, sans-serif',}}>{formattedEndDate}</span> </Typography>
              </Box>
              
            </Box>

            
            <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius:5, marginLeft:3, width:'50%',}}>
              <Box sx={{marginLeft:3, marginTop:3, marginRight:3, marginBottom:3}}>
                <Typography sx={{fontWeight:'bold', fontSize:20, marginBottom:2,fontFamily:'Nunito, sans-serif',}}><AiOutlineBars fontSize={25} style={{marginBottom:-5, marginRight:5}}/>Course Oultine</Typography>
                <Typography sx={{fontSize:17,fontFamily:'Nunito, sans-serif',}}>{Description}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
