import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import newtheme from "../../../Themenew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';
import { ImStatsBars } from 'react-icons/im';
import { IoTime } from 'react-icons/io5';
import { MdLanguage } from 'react-icons/md';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={newtheme}>
      <Box className="zoom" sx={{ marginLeft: 2, cursor: "pointer" }} onClick={() => {
            navigate("/Student/Course/" + course._id, {
              state: { course: course },
            });
          }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                width: 359,
                backgroundColor: "white",
                marginBottom: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                ":hover": {
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;",
                },
                borderRadius: 2,
              }}
            >
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center' }}>
                  <img
                    src={course.image}
                    alt="Error Loading Image"
                    style={{ borderRadius: 6,marginTop:25, }}
                    width={295}
                    height={190}
                  />
              </Box>
              <Box sx={{marginLeft:4,display:'flex',flexDirection:'row',justifyContent:'space-between', marginRight:5}}>
                <p style={{fontSize:12, backgroundColor:'#f0f0f0', width:150, padding:7, borderRadius:5,fontWeight:'bold'}}>COMPUTER SCIENCE</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <TiTickOutline fontSize='25'  style={{
                    marginTop: 14,
                    color: newtheme.palette.secondary.footer,
                  }}/>
                  <p style={{fontSize:17,fontWeight:'bolder',color: newtheme.palette.secondary.footer,}}>Enrolled</p>
                </Box>
              </Box>
              <Box sx={{marginLeft:4,display:'flex',flexDirection:'row',justifyContent:'space-between', marginRight:5}}>
                <Box sx={{display:'flex', flexDirection:'row', marginBottom:2}}>
                  <ImStatsBars fontSize='22' style={{color:'#ffd350',marginRight:7}}/>
                  <p style={{margin:0, fontSize:15, marginRight:7}}>Beginner</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', marginBottom:2}}>
                  <IoTime fontSize='22' style={{color:'#ffd350',marginRight:7}}/>
                  <p style={{margin:0, fontSize:15,marginRight:7}}>{course.creditHours} Credits</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', marginBottom:2}}>
                  <MdLanguage fontSize='22' style={{color:'#ffd350',marginRight:7}}/>
                  <p style={{margin:0, fontSize:15,marginRight:7}}>{course.language}</p>
                </Box>
              </Box>
              <Box sx={{marginLeft:4, marginBottom:4}}>
                <p style={{margin:0,fontSize:22,fontWeight:'bolder', marginBottom:18}} >Complete Master Class of: <br/> {course.name}</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{fontSize:18,fontWeight:'bolder', margin:0, color:newtheme.palette.secondary.footer}} >View Course</p>
                  <BsFillArrowRightCircleFill fontSize={24} style={{marginLeft:7, marginTop:3, color:newtheme.palette.secondary.footer}}/>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default CourseCard;
