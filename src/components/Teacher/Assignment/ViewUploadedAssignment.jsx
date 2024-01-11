import React, { useEffect } from 'react';
import { Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Backdrop } from '@mui/material';
import  Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import http from '../../../../Axios/axios';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { delAssignment } from '../../../../Axios/assigAxios';
import { useParams } from 'react-router-dom';
import { VscNewFile } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import {RiArrowLeftSLine} from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { FcQuestions } from "react-icons/fc";
import { FcViewDetails} from "react-icons/fc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcAcceptDatabase } from "react-icons/fc";
import { FcPositiveDynamic } from "react-icons/fc";
import PropTypes from 'prop-types';
import QuestionList from './Components/QuestionList';
import TestcaseList from './Components/TestcaseList';
import Contents from './SubmitTable';
import NoSubmission from './NoSubmission';
import BeatLoader from "react-spinners/BeatLoader";
import PlagiarismList from './Components/PlagiarismScanList';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewUploadedTeacherAssig = ()=> {
    
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const Assignmentid = aid;
   
    const [assig,setAssig] = React.useState({})
    const [file,setFile] = React.useState()
    const [isAssignmentViewed, setAssignmentViewed] = React.useState(false);
    const [isAssignmentViewed1, setAssignmentViewed1] = React.useState(false);

    const [questions, setQuestions] = React.useState([]);
    const [testCases, settestCases] = React.useState([]);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [isAlreadySubmitted, setIsSubmitted] = React.useState(false);

    const [Assigdata,setAssigdata] = React.useState(false)

    const [submiteedAssigdata,setSubmiteedAssigdata] = React.useState([])

    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [noCourses, setNoCourses] = React.useState(false);
    const [Reports , setReports] = React.useState([]);
    const [gotReports, setgotReports] = React.useState(false);
    
  const [totalQuestions , setTotalQuestions] = React.useState(0)
    const [qid , setqid] = React.useState(null)
    const [isArray, setisArray] = React.useState(false)
  const [TotalMarks,setTotalMarks] = React.useState(0)
    const [newTestCase, setNewTestCase] = React.useState({
      input: '',
      output: '',
      arraySize : null
    });

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const getSubmission = async ()=>{
      try {
        const res = await http.get('/submit/isSubmitted')
        if(res.data.success){
          setIsSubmitted(true)
        }

      } catch (error) {
        console.log(error);
      }
    }


const getSubmittedAssignments = async ()=> {
      try {
        const res = await http.get(`/submit/AssignmentSubmissions/${Assignmentid}`)
        if(res.data.length == 0){
          setAssigdata(false)
        }
        else{
          setSubmiteedAssigdata(res.data)
          setAssigdata(true)
        }
      } catch (error) {
        console.log(error)
      }
}
 const getReports = async () =>{
  const res = await http.get(`/Plagiarism/getReports/${aid}`)
  setgotReports(res.data.success)
  setReports(res.data.PlagiarismReports)
 }
useEffect(() => {
  setLoading(true);  
  http.get(`/assignment/viewAssignment/${Assignmentid}`)
    .then((response) => {
      // setLoading(true);
      setAssig(response.data.Viewassignment);
      // setLoading(false);
      setFile(response.data.PdfDataUrl);
      setQuestions(response.data.Viewquestions);
      setTotalQuestions(response.data.Viewquestions.length);
      settestCases(response.data.TestCase)
      const sum = response.data.Viewquestions.reduce((total, question) => total + question.questionTotalMarks, 0);
      setTotalMarks(sum);
      getReports()
   
      


      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false); // Make sure to set loading to false in case of an error too
    });

    const userJSON = localStorage.getItem('User')
    const user = JSON.parse(userJSON);
    if(user.user?.role == 'Teacher'){
      setIsTeacher(true)
      getSubmittedAssignments()
    }
    else{
      if(user.userID?.role == 'Student'){
       getSubmission()
       

        setIsTeacher(false)
        }
      
    }
}, [Assignmentid]); 

    
  const handleAssignmentOpen = () => setAssignmentViewed(true);

  const handleAssignmentClose = () => setAssignmentViewed(false);

  const handleAssignmentOpen1 = () => setAssignmentViewed1(true);

  const handleAssignmentClose1 = () => setAssignmentViewed1(false);

    const handleDeleteClick = (id) => () => {
        delAssignment(id, cid)
          .then(() => {
            const url = `/Teacher/ViewUploadedAssigList/${cid}`;
            navigate(url);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
    const theme = useTheme()
    const uploadDate = assig.uploadDate;
    const udate = new Date(uploadDate);

    const formattedUploadDate = `${udate.getDate()}-${udate.getMonth() + 1}-${udate.getFullYear()}`;

    const DueDate = assig.dueDate;
    const ddate = new Date(DueDate);

    const formattedDueDate = `${ddate.getDate()}-${ddate.getMonth() + 1}-${ddate.getFullYear()}`;

    function formatTimeToAMPM(hours, minutes) {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      return `${formattedHours}:${formattedMinutes} ${period}`;
    }
    
    
    const time = assig?.dueTime ? new Date(assig.dueTime) : new Date();
    

const formattedTime = formatTimeToAMPM(time.getHours(), time.getMinutes());

    const handleDownload = () => {
        var downloadURL = file;
        const link = document.createElement('a');
        link.href = downloadURL; 
        link.download = 'assignment.pdf';
        link.click();
      };

      const AddTestCaseInQuestion = async(qid,input,output,arraySize)=>{
          const res = await http.post('/assignment/AddTestCaseInQuestion' , 
          {
            qid,input,output,arraySize
          })
          if(res.status === 200){
            alert('TEst Case added successfully')
            navigate(0)
          }
      }

      const captureThisQuestion = (id , Arr) => {
        setqid(id)
        setisArray(Arr)
        setAssignmentViewed1(true)
      }
      const addTestCase = async () => {
        await AddTestCaseInQuestion(
          qid , 
          newTestCase.input , 
          newTestCase.output , 
          newTestCase.arraySize
          )
        setNewTestCase({
          input: '',
          output: '',
          arraySize : null
        })
        handleAssignmentClose1()
      }
      

    return(
     <>
      <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
      <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
          <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile color="secondary" sx={{color:theme.palette.secondary.main}} value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<FcViewDetails fontSize={25} />} label="Assignment Details" sx={{color:theme.palette.secondary.main, marginRight:7, fontFamily:'Nunito, sans-serif',fontWeight:'bolder'}}/>
            <Tab icon={<FcQuestions fontSize={25} />} label="Questions" color='secondary' sx={{color:theme.palette.secondary.main, marginRight:7, fontFamily:'Nunito, sans-serif',fontWeight:'bolder'}} />
            <Tab icon={<FcAcceptDatabase fontSize={25}/>} label="Submissions" color='secondary' sx={{color:theme.palette.secondary.main, marginRight:7, fontFamily:'Nunito, sans-serif',fontWeight:'bolder'}} />
            <Tab icon={<FcPositiveDynamic fontSize={25}/>} label="Test Cases" sx={{color:theme.palette.secondary.main, marginRight:7, fontFamily:'Nunito, sans-serif',fontWeight:'bolder'}}/>
            <Tab icon={<FcPositiveDynamic fontSize={25}/>} label="Plagiarism Scan" sx={{color:theme.palette.secondary.main, fontFamily:'Nunito, sans-serif',fontWeight:'bolder'}}/>
          </Tabs>
          </Grid>
      </Grid>
      </Box>
      <hr style={{borderTop: '0.1px solid 	#F0F0F0', width:'99%', margin:0}}></hr>

      <CustomTabPanel value={value} index={0}>
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
        <Box>
          <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12}>
            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'flex-end', marginTop:3,marginLeft:2}}>
              {/* <Box sx={{display:'flex', flexDirection:'row', cursor:'pointer'}}>
                <RiArrowLeftSLine fontSize={20} style={{color:theme.palette.secondary.main}}/>
                <p style={{marginTop:0, marginLeft:8, fontSize:16, color:theme.palette.secondary.main, fontWeight:'bold'}}>Back</p>
              </Box> */}
              <Box>
                {
                isTeacher && (
                  <>
                  <Button 
                    variant="contained" color="secondary" 
                      sx={{fontSize: 16, paddingTop:1,paddingBottom:1,paddingLeft:2,paddingRight:2, marginRight:2}}
                      startIcon={<TbEdit/>}
                      onClick={() => navigate(`/Teacher/AddAssignment/${cid}`
                      , {
                          // state: { course: courses.find(c =>  c._id === id) },
                          state: { assig: assig },
                        })
                  }
                      >
                      Edit
                  </Button>
                  <Button 
                    variant="outlined" color="error" 
                    startIcon={<RiDeleteBin5Line/>}
                    sx={{fontSize: 16, padding:1, marginRight:3}}
                      onClick={handleDeleteClick(assig._id)}
                      >
                      Delete
                  </Button>
                  </>
                )
                  }
              </Box>
            </Box>
          </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={12} lg={7}>
              <Box sx={{marginTop:3, marginLeft:2}}>
              <Box>
              <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                  <Box> 
                      <p style={{fontWeight:'bolder', margin:0, fontSize:30}}>Assignment : {assig.assignmentNumber}</p> 
                      <p style={{ marginTop:6, fontSize:16, color:'grey'}}>Due at {formattedDueDate} <span style={{color:'red', fontWeight:'bold'}}>({formattedTime})</span> </p> 
                  </Box>
                  <Box> 
                      <p style={{fontWeight:'bolder', margin:0, fontSize:18}}>Marks</p> 
                      <p style={{ marginTop:6, fontSize:16, color:'grey'}}>Total Points: {TotalMarks}</p> 
                  </Box>
              </Box>
              
            </Box>
            <Box sx={{marginTop:2}}>
                <p style={{fontWeight:'bold', fontSize:18, margin:0}}>Instructions</p>
                <p>{assig.description}</p>
            </Box>
            
            <Box sx={{marginTop:4}}>
                <p style={{fontSize:18}}> <b>File Extension: </b> {assig.format}</p>
            </Box>
            <Box sx={{marginTop:2}}>
                <p style={{fontSize:18}}> <b>Assignment File </b></p>
            </Box>
          
            <Box sx={{display:'flex',flexDirection:'row',marginTop:'1%'}} >
              <Box sx ={{width:'60%',}}>
                <Link style={{textDecoration:'none'}} onClick={handleAssignmentOpen}> 
                    <Box 
                        sx={{border:1,padding:2,flexGrow:1,borderRight:0,borderRadius:1, color:theme.palette.secondary.main}}>View Assignment
                    </Box>
                </Link>
            <Modal
                    open={isAssignmentViewed}
                    onClose={handleAssignmentClose}
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
                <Fade in={isAssignmentViewed}>
                    <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '90%',
                        maxWidth: '800px',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        borderRadius: '25px',
                    }}
                    >
                    <Box sx={{display:'flex' , flexDirection: 'row' , justifyContent:'space-between'}}>
                    <Typography variant='h4' sx={{fontWeight:'bold', paddingBottom:1,}}>Assignment : {assig.assignmentNumber}</Typography>
                <Box sx={{marginY:'1%'}}>
                <Typography variant='p' sx={{color:theme.palette.secondary.main}}> <b>Total Marks: </b> {TotalMarks}</Typography>
            </Box>
                    </Box>
                    {questions.map((question , index) => (
                        <Box sx={{display:'flex' , flexDirection: 'row' , justifyContent:'space-between'}}>
                            <Typography  sx={{my:'1%'}}>
                            <b> Question {index + 1} </b>
                            {question.questionDescription}
                            </Typography>
                            <Typography  sx={{my:'1%', color:theme.palette.secondary.main }}>
                            {`( ${question.questionTotalMarks} )`}
                            
                            </Typography>
                        </Box>
                    ))}
                    </Box>
                </Fade>
                </Modal>

            </Box>
            <Box sx={{width:'30%'}}>
            <Button
                variant="contained" color="secondary" 
                sx={{  height:'100%', 
                  
                  }}
                onClick={handleDownload}
              
            >
                {<FileDownloadOutlinedIcon />}
            </Button>
            </Box>
            </Box>
            
            
              </Box>
            </Grid>
          </Grid>
        </Box>
         )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <QuestionList  questions = {questions} format= {assig.format}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {Assigdata ? <Contents Assignments = {submiteedAssigdata} id = {Assignmentid}   /> : <NoSubmission /> }
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        {
          testCases.length > 0 && 
           testCases.map((t, index) => (
            <>
                <p>
                  <span style={{fontWeight:'bold', fontSize:20}}>Question-{index+1}: </span> 
                  <span style={{fontStyle:'italic', fontSize:20}}>{t._doc.questionDescription}</span>
                  <Button
                    sx={{
                      marginLeft: 2,
                      marginRight: 2,
                      marginTop: 2,
                      marginBottom: 2,
                      padding: 1.5,
                      borderRadius: 7,
                      fontFamily: 'Nunito, sans-serif',
                      width: '15%',
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={()=> {captureThisQuestion( t.testCases[0].Question , t._doc.isInputArray )                  }}
                    startIcon={<VscNewFile style={{ fontSize: 25 }} />}
                  >
                    Add TestCase
                  </Button>
      <Modal
        open={isAssignmentViewed1}
        onClose={handleAssignmentClose1}
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
        <Fade in={isAssignmentViewed1}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              maxWidth: '800px',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              borderRadius: '25px',
            }}
          >
           <Typography variant="h6">
              { 'Add Test Case'}
            </Typography>
           
            <FormControl sx={{ marginBottom: 2 }}>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 10,
                  padding: 0,
                  textAlign: 'start',
                  fontWeight: 'bold',
                }}
              >
                Input
              </p>
              <TextField
                id="input"
                value={newTestCase.input}
                onChange={(e) =>
                   setNewTestCase({
                        ...newTestCase,
                        input: e.target.value,
                      })
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }}>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 10,
                  padding: 0,
                  textAlign: 'start',
                  fontWeight: 'bold',
                }}
              >
                Output
              </p>
              <TextField
                id="output"
                value={newTestCase.output}
                onChange={(e) =>
                  setNewTestCase({
                        ...newTestCase,
                        output: e.target.value,
                      })
                }
              />
            </FormControl>
           {
            isArray &&
            <FormControl sx={{ marginBottom: 2 }}>
            <p
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 0,
                marginTop: 10,
                padding: 0,
                textAlign: 'start',
                fontWeight: 'bold',
              }}
            >
              Array Size
            </p>
            <TextField
              id="arraySize"
              value={newTestCase.arraySize}
              type='number'
              onChange={(e) =>
                setNewTestCase({
                      ...newTestCase,
                      arraySize: e.target.value,
                    })
              }
            />
          </FormControl>
           }
            <Button
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginTop: 2,
                marginBottom: 2,
                padding: 1.5,
                borderRadius: 7,
                fontFamily: 'Nunito, sans-serif',
                width: '40%',
              }}
              variant="contained"
              color="secondary"
              onClick={() => addTestCase()}
            >
              {'Add Test Case'}
            </Button>
          </Box>
        </Fade>
      </Modal>
                </p>
                <TestcaseList testCases = {t.testCases}  />
              </>
           )

           )
        }
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
       { 
       gotReports ? 
       <PlagiarismList  
          PlagiarismReports = {Reports}
          format = {assig.format}
          totalQuestions = {totalQuestions}
          questions = {questions}
        />
        :
        <Typography> No One Has got the report </Typography>
       
       }
      </CustomTabPanel>
     </>
    )
}
export default ViewUploadedTeacherAssig