import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewCourse = ({ courses }) => {
  const theme = useTheme()
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
  useEffect(() => {
    const course = location.state.course
    setCode(course.courseCode)
    setCname(course.name)
    setCDescription(course.description)
    setCphoto(course.image)
    setcreditHours(course.creditHours)
    setLanguage(course.language)
    setSdate(course.startingDate)
    setLdate(course.endingDate)
  })
  return (
    <>
      <Box>
        <Box sx={{
          display: 'flex', flexDirection: 'row',
        }}
        >
          <Box sx={{ width: '15%', flex: 1, paddingLeft: '5%' }}>

            <Typography variant='h4'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                paddingTop: 6,

              }}>{Code}</Typography>
            <Typography variant='h4'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                paddingTop: 1,

                minWidth: "50%"
              }}>{Cname}</Typography>
            <br />
            <Typography variant='p'
              sx={{
                color: theme.palette.primary.main,
                paddingTop: 1,
              }}>{Description}</Typography>
            <Box sx={{ marginTop: '7%', display: 'flex', flexDirection: 'row', }}>

              <Button onClick={() => { navigate('/Teacher/ContentList') }}
                variant="contained" color="secondary" endIcon={< ArrowForwardIosIcon />}
                sx={{
                  width: '37%', height: '10%', padding: 1, fontSize: 16,
                  fontWeight: 'bold', paddingRight: '3%'
                }}>
                View Course Contents

              </Button>

              <Button
                variant="contained" color="secondary" endIcon={< ArrowForwardIosIcon />}
                sx={{
                  width: '37%', height: '10%',
                  padding: 1, fontSize: 16, marginLeft: '5%',
                  fontWeight: 'bold', paddingRight: '3%'
                }} onClick={() => navigate('/Assignment/ViewUploadedAssigList')}>
                View Course Assignments
              </Button>

            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img src={Cphoto} style={{
              width: 350, height: 300, marginLeft: '20%', marginTop: "25%"
            }} ></img>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: theme.palette.secondary.main, borderRadius: 10
          , display: 'flex', flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Box>
            <Typography variant='h6' sx={{ color: 'white' }}><b>Starting Date </b> <br />  {Sdate}</Typography>
            <br />
            <Typography variant='h6' sx={{ color: 'white' }}
            ><b>Ending Date</b>  <br />  {Ldate}</Typography>
          </Box>

          <Box>
            <Typography variant='h6' sx={{ color: 'white' }}
            ><b>Language </b> <br />  {language}</Typography><br />
            <Typography variant='h6' sx={{ color: 'white' }}
            > <b>CreditHours</b>  <br />  {creditHours}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default ViewCourse;