import React, { useRef, useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useTheme } from "@emotion/react";
import { ThemeProvider } from '@mui/material/styles';
import ImageCarousel from './Crousel';
import python from '../../assets/pythonn.png';
import newtheme from '../../Themenew'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Link from "@mui/material/Link";
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { keyframes } from '@mui/system';
import CourseCard from '../LandingPage/CourseCard'
import Grid from '@mui/material/Grid';
import FitbitIcon from '@mui/icons-material/Fitbit';
import LanguageIcon from '@mui/icons-material/Language';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GradeIcon from '@mui/icons-material/Grade';
import Aos from 'aos';
import 'aos/dist/aos.css'
import StartPageBar from "./Navbar";
import '../../App.css'
import Footer from './Footer';
import DrawerAppBar from '../Student/Navbar';

function StartPage() {
  // const newtheme = useTheme()

  const courses = [{
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course02-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  },
  {
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course01-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  },
  {
    student: 40,
    name: 'Data Science',
    image: 'https://egrad.wpengine.com/wp-content/uploads/2022/11/course03-1-640x430.jpg',
    description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
    credits: 3,
    lectures: 15,
    teacher: "Faisal"
  }];
  React.useEffect(() => {
    Aos.init({ duration: 2500 });
    getUser()
  }, [])

  const animation = keyframes`
   0% { transform: translateX(-100%); opacity: 0; }
   100% { transform: translateX(0); opacity: 1; }
  `;

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const getUser = async() =>{
    const checkLogin = await localStorage.getItem('loggedIn');
    if(checkLogin) {
      setIsLoggedIn(true)
    }
  }


  return (
    <ThemeProvider theme={newtheme}>
      <Box>
        {
          isLoggedIn ? 
          <DrawerAppBar /> :
          <StartPageBar />
          }
      </Box>
      <Box
        data-aos="fade-down"
        sx={{

          paddingTop: '4%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* <Box
          sx={{
            padding: '3%',
            width: '50%',

          }}
        >
          <Typography className="fontlink" variant='h3' sx={{ fontWeight: 'bold', marginBottom: 3}}>
            The future depends on what you do today.
          </Typography>

          <Typography  className="fontlink" variant='p'>
            ProGrade provides grading code-based assignments by providing an automated grading system. The application
            will provide other useful features such as plagiarism checking, code compiler, and course management.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
            <GroupsIcon fontSize="large" style={{ color: newtheme.palette.secondary.background, marginRight: '1%' }} />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Over 2k Students
            </Typography>
            <LibraryBooksIcon fontSize="large" style={{ marginLeft: '7%', color: newtheme.palette.secondary.background, marginRight: '1%' }} />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              20+ Courses
            </Typography>
          </Box>

          <Box sx={{ marginTop: 7 }}>
            <Button sx={{ ':hover': { backgroundColor: newtheme.palette.secondary.footer }, border: 2, borderRadius: 10, paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, backgroundColor: newtheme.palette.secondary.background, color: newtheme.palette.primary.background }}>
              Join Now!
            </Button>
          </Box>
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
          <Box width="100%" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <ImageCarousel sx={{ width: '100%' }}></ImageCarousel>
            <Box sx={{ display: 'flex', flexDirection: 'column',position: 'absolute', marginTop: 25 }}>
              <Typography variant='h3' sx={{display:'flex', flexDirection:'row', justifyContent:'center'}} >SELF EDUCATION RESOURCES AND INFOS</Typography>
              <Typography variant='h6' sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:2}} >Technology is Bringng a massive wave of evolution on learning things on different ways.</Typography>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button variant='outlined' sx={{paddingLeft:5,paddingRight:5,paddingTop:2,paddingBottom:2, marginTop:4, borderRadius:10,':hover': { backgroundColor: newtheme.palette.primary.background, color: newtheme.palette.primary.main, border:'2px solid white'}}}>Ready to Get Started?</Button>
              
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


      <Box sx={{
        backgroundColor: newtheme.palette.primary.background,
        paddingTop: '2%',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Box >
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background }}>
            Our Top Courses</Typography>
        </Box>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
          Learn Best Things
        </Typography>
      </Box>




      {/* Languages section */}
      <Box sx={{ overflow: 'hidden' }} data-aos="fade-left">
        <Box
          sx={{
            paddingTop: '1%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '2%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#ecf8ec', borderRadius: 12 }}>
            <img src='https://cdn.pixabay.com/photo/2017/03/30/17/43/c-2189150_1280.png' height={'60%'} width={'70%'} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              }, marginBottom: 2

            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '5%', color: 'black' }}>
                Cpp
              </Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#6ebe6e', fontWeight: 'bolder' }} >4 Courses</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#ffd1ce', borderRadius: 12 }}>
            <img src='https://cdn-icons-png.flaticon.com/512/3664/3664988.png' height={'60%'} width={'60%'} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none', marginTop: '6%'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              },
              marginBottom: "3%"
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Java</Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#ff2712', fontWeight: 'bolder' }}>8 Courses</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#eef6fa', borderRadius: 12 }}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Eo_circle_blue_white_letter-c.svg/1200px-Eo_circle_blue_white_letter-c.svg.png' height={'60%'} width={'60%'} style={{ marginTop: 16 }} />
            <Link href='#' sx={{
              textDecoration: 'none', marginTop: '6%'
              , color: newtheme.palette.secondary.background, '&:hover': {
                color: newtheme.palette.secondary.footer,
              },
              marginBottom: "3%"
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>C</Typography>
            </Link>
            <Typography variant='h6' sx={{ color: '#43ade3', fontWeight: 'bolder' }}>9 Courses</Typography>
          </Box>
        </Box>
      </Box>
      <Box data-aos="fade-right"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '5%',

        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '21%', alignItems: 'center', backgroundColor: '#feecf4', borderRadius: 12 }}>
          <img height={'60%'} width={'60%'} style={{ marginTop: 16, borderRadius: 200 }} src={python} />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Python</Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#e05193', fontWeight: 'bolder' }}>14 Courses</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#fffceb', borderRadius: 12 }}>
          <img src='https://i.redd.it/free-c-logos-to-use-in-your-projects-tutorials-guides-blog-v0-7anluzn3jmea1.png?width=512&format=png&auto=webp&s=f98b03158e581fc8aed0c49f0dc28d9414258fe7' height={'60%'} width={'60%'} style={{ marginTop: 16, borderRadius: 200 }} />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              CSharp
            </Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#f2c900', fontWeight: 'bolder' }}>12 Courses</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', alignItems: 'center', backgroundColor: '#eaf9f9', borderRadius: 12 }}>
          <img src='https://png.pngtree.com/png-vector/20190409/ourmid/pngtree-asm-file-document-icon-png-image_923237.jpg' height={'60%'} width={'60%'} style={{ marginTop: 16, borderRadius: 200 }} />
          <Link href='#' sx={{
            textDecoration: 'none', marginTop: '6%'
            , color: newtheme.palette.secondary.background, '&:hover': {
              color: newtheme.palette.secondary.footer,
            },
            marginBottom: "3%"
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Masm/Nasm</Typography>
          </Link>
          <Typography variant='h6' sx={{ color: '#4cacab', fontWeight: 'bolder' }}>15 Courses</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 7, alignItems: 'center', marginBottom: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: newtheme.palette.primary.background,
            '&:hover': {
              backgroundColor: newtheme.palette.secondary.footer,
              color: newtheme.palette.primary.background,
              border: '2px solid #2a3290'
            },
            paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, fontSize: 16, fontWeight: 'bold', borderRadius: 10, color: newtheme.palette.secondary.background, border: '2px solid #ff2712'
          }} >
          View All
        </Button>
      </Box>



      {/* courses section */}
      <Box sx={{ backgroundColor: '#fbe5e5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, marginBottom: 4 }} >
          <Box >
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background, marginTop: 10 }} data-aos="fade-right">
              Pick Course as per your Area of Interest</Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Most Famous Online Courses</Typography>
        </Box>
        <Box className="courseMain_container" data-aos="fade-down">
          {courses.map((course) => {
            return <CourseCard course={course}></CourseCard>
          })}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 7, alignItems: 'center', marginBottom: 7 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: newtheme.palette.primary.background,
              '&:hover': {
                backgroundColor: newtheme.palette.secondary.footer,
                color: newtheme.palette.primary.background,
                border: '2px solid #2a3290'
              }, marginBottom: 10,
              paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, fontSize: 16, fontWeight: 'bold', borderRadius: 10, color: newtheme.palette.secondary.background, border: '2px solid #ff2712'
            }} >
            View More
          </Button>
        </Box>
      </Box>


      {/* Apply for courses today section */}
      <Box>
        <Grid container spacing={2}>

          <Grid lg={12} md={12} sm={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} data-aos="fade-right">
            <Box sx={{ fontWeight: 'bold', margin: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#93e9c1', color: 'white', borderRadius: 10 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', }}>
                  <Box>
                    <CardContent sx={{ marginTop: 6, marginLeft: 4 }}>
                      <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                        Apply Your Courses Today
                      </Typography>
                      <Typography sx={{ color: 'red', marginBottom: 6, marginRight: 16 }} variant="h6" color="text.secondary">
                        Join in Your Favorite Courses Today and get quick feedback of your Coding assignments!
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ marginRight: 4 }}>
                    <Button sx={{ color: 'black', backgroundColor: '#feb227', paddingTop: 2, paddingBottom: 2, paddingLeft: 6, paddingRight: 6, borderRadius: 4, ":hover": { backgroundColor: "#feb227", color: 'black' } }}>Apply Now</Button>
                  </Box>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>


      {/* About us section */}
      <Box sx={{ backgroundColor: '#e8faff' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, }}>
          <Box >
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background, marginTop: 5 }}>
              Our Services</Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            About Us</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid md={7} sx={{ marginBottom: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} data-aos="zoom-in">
              <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', textAlign: 'center', margin: 4 }}>
                <Card sx={{ maxWidth: 345, marginBottom: 4, backgroundColor: newtheme.palette.secondary.footer, color: 'white', borderRadius: 10 }}>
                  <CardActionArea>
                    <Box sx={{ marginTop: 4, }}>
                      <GradeIcon fontSize="large" style={{ border: '2px solid #feb227', padding: 15, borderRadius: 45, color: '#feb227', fontSize: 80 }} />
                    </Box>
                    <CardContent>
                      <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h4" component="div">
                        Automatic Grading
                      </Typography>
                      <Typography sx={{ color: 'white', marginBottom: 4 }} variant="h6" color="text.secondary">
                        Grading based on automated TestCases
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 345, backgroundColor: newtheme.palette.secondary.footer, color: 'white', borderRadius: 10 }}>
                  <CardActionArea>
                    <Box sx={{ marginTop: 4, }}>
                      <FeedbackIcon fontSize="large" style={{ border: '2px solid #feb227', padding: 15, borderRadius: 45, color: '#feb227', fontSize: 80 }} />
                    </Box>
                    <CardContent>
                      <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h4" component="div">
                        Quick Feedback
                      </Typography>
                      <Typography sx={{ color: 'white', marginBottom: 4 }} variant="h6" color="text.secondary">
                        Feedback will be given after the execution of TestCases
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
              <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                <Card sx={{ maxWidth: 345, marginBottom: 4, marginTop: 8, backgroundColor: newtheme.palette.secondary.footer, color: 'white', borderRadius: 10 }}>
                  <CardActionArea>
                    <Box sx={{ marginTop: 4, }}>
                      <FitbitIcon fontSize="large" style={{ border: '2px solid #feb227', padding: 15, borderRadius: 45, color: '#feb227', fontSize: 80 }} />
                    </Box>
                    <CardContent>
                      <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h4" component="div">
                        TestCases
                      </Typography>
                      <Typography sx={{ color: 'white', marginBottom: 4 }} variant="h6" color="text.secondary">
                        System will generate Automated TestCases on your Assignments
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345, backgroundColor: newtheme.palette.secondary.footer, color: 'white', borderRadius: 10 }}>
                  <CardActionArea>
                    <Box sx={{ marginTop: 4, }}>
                      <LanguageIcon fontSize="large" style={{ border: '2px solid #feb227', padding: 15, borderRadius: 45, color: '#feb227', fontSize: 80 }} />
                    </Box>
                    <CardContent>
                      <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h4" component="div">
                        5+ Languages
                      </Typography>
                      <Typography sx={{ color: 'white', marginBottom: 4 }} variant="h6" color="text.secondary">
                        Our System will support upto 6 languages
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Box>

          </Grid>
          <Grid md={5} sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
              <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignContent: 'center', marginLeft: 3 }} data-aos="fade-up">
                <Typography sx={{ color: 'red' }}>-Our Services</Typography>
                <Typography variant='h3' sx={{ marginTop: 3, marginBottom: 3, fontWeight: 'bold' }}>Why Choose Us?</Typography>
                <Typography variant='h6' sx={{ color: 'black', marginRight: 6 }}>The technological revolution is changing aspect of our lives, and the fabric of society itself. it's also changing the way we learn and what we learn. Factual knowledge is less prized when everything you ever need to know can be found on your phone. There's no imperative to be an expert at doing everything when you can.</Typography>
              </Box>
              <Box sx={{ marginTop: 5, marginLeft: 3, marginBottom: 3 }} data-aos="fade-up">
                <Button sx={{ color: 'black', backgroundColor: '#feb227', paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, borderRadius: 4, ":hover": { backgroundColor: "#feb227", color: 'black' } }}>Contact Us</Button>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>



      {/* Achievements/stats count section */}
      <Box>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} data-aos="fade-left">
          <Grid sm={12} lg={5} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box >
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: newtheme.palette.secondary.background, marginTop: 5 }}>
                  Why Ours</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                Our Best Achievements</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Grid sm={6} lg={3} md={4} sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">
                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                      766
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 6, fontWeight: 'bolder', }} variant="h5" color="text.secondary">
                      Enrolled Students
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid sm={6} lg={3} md={4} sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">
                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                      87
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4, fontWeight: 'bolder', }} variant="h5" color="text.secondary">
                      Instructors
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid sm={6} lg={3} md={4} sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
              <Card sx={{ minWidth: 345, marginRight: 1, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                      16
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4, fontWeight: 'bolder', }} variant="h5" color="text.secondary">
                      Total Courses
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid sm={6} lg={3} md={4} sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
              <Card sx={{ minWidth: 345, marginBottom: 4, backgroundColor: '#fbe5e5', color: 'white', borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }} data-aos="fade-up">

                  <CardContent sx={{ marginTop: 8 }}>
                    <Typography sx={{ fontWeight: 'bolder', color: 'black' }} gutterBottom variant="h2" component="div">
                      100
                    </Typography>
                    <Typography sx={{ color: 'red', marginBottom: 4, fontWeight: 'bolder', }} variant="h5" color="text.secondary">
                      Assignments
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Grid>



      </Box>

      <Box>
        <Footer />
      </Box>
    </ThemeProvider >
  )
}
export default StartPage
