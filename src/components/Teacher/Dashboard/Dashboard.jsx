import React,{useEffect} from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Chart from "react-apexcharts";
import teacherlogo from "../../../assets/teacherlogo.svg";
import courses from "../../../assets/courses.svg";
import assign from "../../../assets/assign.svg";
import reports from "../../../assets/reports.svg";
import students from "../../../assets/students.svg";
import feedback from "../../../assets/feedback.svg";
import welcome from "../../../assets/welcome.svg";
import python from "../../../assets/python.jpg";
import cpp from "../../../assets/cpp.jpg";
import c from "../../../assets/C.jpg";
import java from "../../../assets/21.jpg";
import { CiTimer } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";
import { FcComboChart } from "react-icons/fc";
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import AntDesignGrid from './CourseOverviewTable';
import profile from '../../../../src/assets/profile.png';
import BeatLoader from "react-spinners/BeatLoader";
import http from "../../../../Axios/axios";

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [counts, setCounts] = React.useState({
    assignmentsCount: 0,
    coursesCount: 0,
    submissionsCount: 0,
    teachersCount: 0,
    studentsCount: 0,
  });

  useEffect(() => {
    http.get('/course/assignmentsCount')
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  //donut chart
  const [pieChart,setPieChart] =React.useState({
    series: [40, 65, 50,80],
            options: {
              chart: {
                width: 380,
                type: 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                  expandOnClick: true,
                  donut: {
                    labels:{
                      show: true,
                      total: {
                      show: true,
                      label: 'Completed',
                      fontWeight:'bold',
                      formatter: () => '25%'
                      }
                    },
                    size: '70%'
                  }
                  
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              labels: ["Completed","In Progress","Not Completed","Not Started"],
              legend: {
                position: 'bottom',
                fontSize: '14px',
                fontWeight: 'bold',
            },
            colors: ["#ff0000", "#c758d0", "#24e4ac", "#007ed6"],
             
              title: {
                text: 'Course Progress',
                align:'center',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  
                }
              }]
            },
  })

  //bar chart
  const [newChart, setNewChart] = React.useState({
    series: [{
      // data: [5, 40, 34, 52, 10, 50, 60, 11, 12, 38,55,8]
      data: []
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        labels: ["Students Enrolled"],
      },
      title: {
        text: 'Students With Time Sent Monthywise',
        align:'center'
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October',"November","December"
        ],
      },
      colors: ["#c758d0"]
    },
  
  });

  useEffect(() => {
    http.get('/course/coursesCountByMonth')
      .then((response) => {
        const data = response.data;
        const chartSeriesData = {
          series: [{
            data: data.map(item => item.count)
          }],
          options: {
            xaxis: {
              categories: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
              ]
            },
          },
        };
        setNewChart(chartSeriesData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  //assignments created small chart
  const [currentHours, setCurrentHours] = React.useState({
    series: [
      {
        data: [
          {
            x: "Jan",
            y: [28, 45],
          },
          {
            x: "Feb",
            y: [12, 41],
          },
          {
            x: "Mar",
            y: [29, 78],
          },
          {
            x: "Apr",
            y: [9, 46],
          },
          {
            x: "May",
            y: [12, 51],
          },
          {
            x: "Jun",
            y: [25, 65],
          },
          {
            x: "Jul",
            y: [41, 56],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [["#638cff", "#79cfff"]],
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "start",
        customLegendItems: ["Courses", "Assignments"],
        colors: ["#F44336", "#E91E63"],
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          gradientToColors: ["#638cff", "#638cff"],
          inverseColors: true,
          stops: [0, 100],
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        tickPlacement: "on",
        lines: {
          show: false,
        },
        title: {
          text: "Assignment Created",
        },
      },
    },
  });
  const [profileData, setProfileData] = React.useState(null)


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
        const userJSON = await localStorage.getItem('User')
        const user = JSON.parse(userJSON);
        setProfileData(user)
        
    }

    fetchProfile()
    setLoading(false)
    
  },[])
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
  }));
  

  return (
    <>
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
      ) : ( 
        <Box sx={{ backgroundColor:theme.palette.primary.background,}}>
    
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={6.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ecf2ff",
            justifyContent: "space-between",
            borderRadius: 3,
            marginLeft: 2,
            marginRight: 2,
            overflow:'hidden',
            marginTop:2
          }}
        >
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
              }}
            >
              <img
                style={{
                  borderRadius: 20,
                  marginRight: 13,
                }}
                height={40}
                width={40}
                src={profileData?.user?.profilePic ? profileData.user.profilePic : profile }
              />
              <p style={{ fontWeight: "bolder", fontSize: 18, marginTop: 10 }}>
                Welcome, {profileData ? profileData.user.fullName : 'User'}
              </p>
            </Box>
            <Box>
              <p style={{ marginBottom: 0, marginTop: 5 }}>
                Your Students completed 85% of tasks
              </p>
              <p style={{ marginTop: 3 }}>Progress is excellent!</p>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FcComboChart style={{ fontSize: "27" }} />}
                onClick={() => { navigate('/Teacher/CoursesList') }}
                sx={{
                  // backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                  padding: 1.5,
                  borderRadius: 10,
                  ":hover": {
                    backgroundColor: theme.palette.primary.background,
                    color: theme.palette.secondary.main,
                    border:1
                  },
                }}
              >
                View Progress
              </Button>
            </Box>
          </Box>
          <Box className="example" sx={{maxHeight:'10', width:'20'}}>
            {/* <img className="example" src={welcome}></img> */}
            <lottie-player className="example" id="myLottieAnimation" src="https://lottie.host/11998279-e778-4cff-81ac-9c5d817778b4/donNh0tGbl.json" background="##FFFFFF" speed="1" loop autoplay direction="1" mode="normal"></lottie-player>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          lg={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid #ecf2ff",
            borderRadius: 3,
            marginRight: 1,
            marginTop:2,
            // ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Box>
            <Chart
              width="175"
              height="215"
              options={{
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "75%",
                    },
                  },
                },
                labels: ["Working Hour"],
                colors: ["#638cff"],
                horizontalAlign:'center'
              }}
              series={[85]}
              type="radialBar"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3.1}
          sx={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid #ecf2ff",
            borderRadius: 3,
            marginTop:2,
            // ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Chart
              options={currentHours.options}
              series={currentHours.series}
              type="rangeBar"
              width="97%"
              height="182"
            />
          </Box>
        </Grid>
      </Grid>




      <Grid container sx={{ marginTop: 1 }} spacing={2}>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #ecf2ff",
              ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={students} />
            </Box>
            <Box>
              <p style={{ color: "#7d9fff", marginBottom: 7, fontSize: 18 }}>
                Students
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#7d9fff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                {counts.studentsCount}+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #fef5e5",
              ":hover": { backgroundColor: "#fef5e5", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={teacherlogo} />
            </Box>
            <Box>
              <p style={{ color: "#ffbd4a", marginBottom: 7, fontSize: 18 }}>
                Teachers
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#ffbd4a",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                {counts.teachersCount}+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #e8f7ff",
              ":hover": { backgroundColor: "#e8f7ff", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={courses} />
            </Box>
            <Box>
              <p style={{ color: "#85d3ff", marginBottom: 7, fontSize: 18 }}>
                Courses
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#85d3ff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                {counts.coursesCount}+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #fdede8",
              ":hover": { backgroundColor: "#fdede8", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={assign} />
            </Box>
            <Box>
              <p style={{ color: "#fa9c83", marginBottom: 7, fontSize: 18 }}>
                Assignments
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#fa9c83",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                {counts.assignmentsCount}+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #e6fffa",
              ":hover": { backgroundColor: "#e6fffa", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={feedback} />
            </Box>
            <Box>
              <p style={{ color: "#2be2c0", marginBottom: 7, fontSize: 18 }}>
                Responses
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#2be2c0",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                {counts.submissionsCount}+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #ebf3fe",
              ":hover": { backgroundColor: "#ebf3fe", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={reports} />
            </Box>
            <Box>
              <p style={{ color: "#65a5ff", marginBottom: 7, fontSize: 18 }}>
                Reports
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#65a5ff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                 {counts.submissionsCount}+
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>




      <Grid container spacing={2} sx={{marginTop:1}}>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,minHeight:'62vh',overflow:'hidden',':hover':{overflowY:'scroll'},borderRadius:2}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Popular Courses</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:5}} src={cpp}></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <p style={{marginBottom:0,marginTop:5, fontWeight:'bold'}}>CPP Basics</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <CiTimer style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>3 Hours</p>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, marginLeft:2}}>
                      <MdLanguage style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}> Cpp</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:5}} src={python}></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <p style={{marginBottom:0,marginTop:5, fontWeight:'bold'}}>Introduction to Python</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <CiTimer style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>4 Hours</p>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, marginLeft:2}}>
                      <MdLanguage style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>Python</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:5}} src={c}></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <p style={{marginBottom:0,marginTop:5, fontWeight:'bold'}}>C Basics</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <CiTimer style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>3 Hours</p>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, marginLeft:2}}>
                      <MdLanguage style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}> C lang</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:5}} src={java}></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <p style={{marginBottom:0,marginTop:5, fontWeight:'bold'}}>Java Coding</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <CiTimer style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>4 Hours</p>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, marginLeft:2}}>
                      <MdLanguage style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}> Java</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:5}} src={cpp}></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <p style={{marginBottom:0,marginTop:5, fontWeight:'bold'}}>CPP Basics</p>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <CiTimer style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}>3 Hours</p>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, marginLeft:2}}>
                      <MdLanguage style={{marginTop:3, marginRight:3}}/>
                      <p style={{margin:0, color:'grey'}}> CPP</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
          </Box>
        </Grid>


        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,borderRadius:2,minHeight:'60vh'}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Students Overview</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:10, marginBottom:10,fontSize:16}}>Good</p>
                <p style={{marginTop:10, marginBottom:10,fontSize:16,fontWeight:'bold'}}>80%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={80} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#525ce5' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Satisfied</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>75%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={75} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#9c52fd' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Excellent</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>72%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={72} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#24e4ac' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,}}>Average</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>65%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={65} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#ffb22b' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Below Average</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>50%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={50} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#2f89f5' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Unsatisfied</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>40%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={40} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#ec5646' : '#308fe8',
              }}}/>
            </Box>
          </Box>
        </Grid>


        <Grid item xs={12} md={6} lg={4}>
        <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,minHeight:'62vh',overflow:'hidden',':hover':{overflowY:'scroll'},borderRadius:2}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Famous Instructor</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:30}} src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{marginBottom:0, marginTop:5, fontWeight:'bold', marginRight:75}}>Lilian Blake</p>
                  <p style={{marginBottom:0, marginTop:5, color:'grey', fontSize:14}}>Daily: 2 Hours</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <p style={{margin:0, color:'grey',fontSize:14}}>Web Designer</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>  
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:30}} src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{marginBottom:0, marginTop:5, fontWeight:'bold', marginRight:75}}>Lilian Blake</p>
                  <p style={{marginBottom:0, marginTop:5, color:'grey', fontSize:14}}>Daily: 2 Hours</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <p style={{margin:0, color:'grey',fontSize:14}}>Web Designer</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr> 
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:30}} src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{marginBottom:0, marginTop:5, fontWeight:'bold', marginRight:75}}>Lilian Blake</p>
                  <p style={{marginBottom:0, marginTop:5, color:'grey', fontSize:14}}>Daily: 2 Hours</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <p style={{margin:0, color:'grey',fontSize:14}}>Web Designer</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr> 
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:30}} src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{marginBottom:0, marginTop:5, fontWeight:'bold', marginRight:75}}>Lilian Blake</p>
                  <p style={{marginBottom:0, marginTop:5, color:'grey', fontSize:14}}>Daily: 2 Hours</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <p style={{margin:0, color:'grey',fontSize:14}}>Web Designer</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr> 
            <Box sx={{ flexGrow: 1, marginBottom:1 , display:'flex', flexDirection:'row'}}>
              <Box sx={{marginTop:1}}>
                <img style={{height:45, width:45, borderRadius:30}} src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"></img>
              </Box>
              <Box sx={{marginLeft:2}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <p style={{marginBottom:0, marginTop:5, fontWeight:'bold', marginRight:75}}>Lilian Blake</p>
                  <p style={{marginBottom:0, marginTop:5, color:'grey', fontSize:14}}>Daily: 2 Hours</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display:'flex', flexDirection:'row', marginTop:0.5, }}>
                      <p style={{margin:0, color:'grey',fontSize:14}}>Web Designer</p>
                    </Box>
                  </Box>
  
                </Box>
              </Box>
            </Box>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr> 
          </Box>
        </Grid>
      </Grid>





      <Grid container spacing={1} sx={{marginTop:3,}}>
        <Grid className="charts" item xs={12} md={12} lg={6.8} sx={{marginTop:2,border:'2px solid #ecf2ff', borderRadius:2,marginRight:2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
          <Box>
            <Chart
              options={newChart.options}
              series={newChart.series}
              type="bar"
              // width="98%"
              // height="98%"
            />
          </Box>
        </Grid>
        <Grid className="charts" item xs={12} md={12} lg={5} sx={{marginTop:2,border:'2px solid #ecf2ff',  borderRadius:2,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
          <Box sx={{}}>
            <Chart
              options={pieChart.options}
              series={pieChart.series}
              type="donut"
              // width="98%"
              // height="100%"
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{height:'93vh',borderRadius:2,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',marginTop:3,marginBottom:2,padding:2, overflow:'hidden'}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Courses Overview</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <AntDesignGrid />
            </Box>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
      )}
    </>
    
  );
}

export default Dashboard;
