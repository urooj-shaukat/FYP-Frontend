import React from 'react';
import { useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFormik } from "formik";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import * as Yup from "yup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import  storage  from '../../../firebase';
import AddQuestion from './Components/AddQuestions';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AddAssig } from '../../../../Axios/assigAxios';
import { useNavigate } from 'react-router-dom';
import { EditAssignment } from '../../../../Axios/assigAxios';
import TeacherBody from '../Body/TeacherBody';
import {BsArrowRightSquare } from "react-icons/bs";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import http from '../../../../Axios/axios';

const steps = [
  'Assignment Details',
  'Add Questions',
  'Create an Assignment',
];


const AddAssignment = () => {
  const theme = useTheme()
  const assignment = useLocation().state?.assig
  const location = useLocation();
  const [fileURL,setfileURL] =React.useState('')
  const [id , setID] = React.useState('')
  const [courseID , setcourseID] = React.useState(null)
  const [showAddQuestion, setShowAddQuestion] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [Assignment, setAssignment] = React.useState({ CourseID: "" ,description:  "" 
  ,dueDate: "",dueTime:"",format: "",noOfQuestions : ""});

  const [file,setFile] = React.useState(null)
  const [fileError,setFileError] = React.useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (assignment) {
      setID(assignment._id);
    } else {
      setFile(null);
    }
  }, [assignment]);

  const initialValues = assignment === undefined ? {
    
    description:"",
    dueDate:"",
    dueTime:"",
    format:"",
    questions:"",

  } : {
   
    description : assignment.description, 
    dueDate : dayjs(assignment.dueDate),
    dueTime: dayjs(assignment.dueTime),
    format : assignment.format,
    questions : assignment.questions
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
  useFormik({
    initialValues,
    validationSchema: Yup.object({
      description: Yup.string().min(2).max(55).required("Please Enter the course Description"),
      dueDate: Yup.date().required("Due Date is required"),
      dueTime:Yup.date().required("Due Time is required"),
      format: Yup.string().ensure().required("Please Enter the format"),
      questions: Yup.number().min(1).required("Please Enter the Number of questions"),
      
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const id = location.pathname.split('/').pop();
    setcourseID(id)
  })

  useEffect(() => {
    if(file === null)
    return;
    setFileError('')
  }, [file]);

  const handleClick = async () => {
    if (values.questions === "" || values.questions <= 0) {
      alert("Please enter a valid number of questions");
    }
  else if(values.dueDate.$d < new Date())  {
    alert("Due Date cannot be lesser than upload date")
  }
    else {
      if (!showAddQuestion) {
        setAssignment(
          {
            CourseID : courseID,
            description:values.description,
            dueDate:values.dueDate.$d,
            dueTime:values.dueTime,
            format:values.format,
            noOfQuestions : values.questions
          }
        )
        console.log(values.dueTime)
        setShowAddQuestion(true);
          if (currentQuestion <= values.questions ) {
            setCurrentQuestion(currentQuestion);
          } else {
            alert("You've seen all the questions!");
          }
    }
    }
  };

  const updateAssig = async (assigId,description,dueDate,dueTime,format)=>{
    const res = await http.put('/assignment/editAssignment', 
      {
        assigId,description,dueDate,dueTime,format
      })


    if(res.status === 200){
      navigate(`/Teacher/ViewUploadedAssig/${courseID}/${assigId}`)
    }
    else{
      alert("Error editing assignment")
    }

    
  }


  const handleUpdate = async () => {
 if(values.dueDate.$d < new Date())  {
    alert("Due Date cannot be lesser than upload date")
  }
    else if( values.description != '' && values.format != null) {
      await updateAssig(id, values.description, values.dueDate,values.dueTime, values.format)
    }
    else{
      alert(" Please fill required fields")
    }
  };
  
  window.addEventListener('beforeunload', function (e) {
      const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave this page?';
      (e || window.event).returnValue = confirmationMessage; 
      return confirmationMessage;
    
  });
  
 if(showAddQuestion) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {showAddQuestion && currentQuestion < values.questions && (
      <AddQuestion 
        currentQuestion={currentQuestion} 
        totalQuestions={values.questions}
        assig={Assignment}
        courseID={courseID}
       />
      )}
    </Box>
  )
 }
 else{
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box>
        <p className='underline' style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 1, fontSize:25 }}>
          {assignment  == undefined ? "Add Assignment" : "Edit Assignment Details"}</p>
      </Box>
      <Box sx={{width:'95%', marginTop:3}}>
        <Stepper activeStep={0} alternativeLabel color="secondary">
          {steps.map((label) => (
            <Step key={label} sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.main', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'primary.background', // circle's number (ACTIVE)
              }, 
            }}>
              <StepLabel sx={{color:'red',}}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex',marginTop:3,marginBottom:5, flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, paddingLeft: 5, paddingRight: 5,boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'  }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
             
              <Box sx={{display:'flex', flexDirection:'column',width:'49%'}}>
                <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Select File Format *</p>
                <FormControl sx={{ marginTop: 2, width: '100%' }}>
                  <InputLabel >Select Format</InputLabel>
                  <Select
                    id="outlined-multiline-flexible"
                    label="Select Format"
                    color='secondary'
                    name='format'
                    value={values.format}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={".java"}>.java</MenuItem>
                    <MenuItem value={".cpp"}>.cpp</MenuItem>
                    <MenuItem value={".R"}>.R</MenuItem>
                    <MenuItem value={".py"}>.py</MenuItem>
                    <MenuItem value={".c"}>.c</MenuItem>
                    
                    
                  </Select>
                </FormControl>
              {errors.format && touched.format ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.format}</p>
              ) : null}
              </Box>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column',width:'100%'}}>
              <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Add Description *</p>
            <TextField sx={{ marginTop: 2, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Descripiton"
              color='secondary'
              name='description'
              multiline
              rows={3}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.description && touched.description ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.description}</p>
            ) : null}
            <br/>
            </Box>

            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box sx={{width:'49%'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} sx={{ width: '100%', marginTop: 0 }}>
                    
                    <Box sx={{display:'flex', flexDirection:'column', width:'100%'}}>
                      <p style={{display:'flex',flexDirection:'row',marginBottom:5,marginTop:0,padding:0, textAlign:'start', fontWeight:'bold'}}>Due Date</p>
                      <Box sx={{marginTop:2}}>
                        <DatePicker
                          name='dueDate'
                          id='dueDate'
                          value={values.dueDate}
                          onChange={(value) => setFieldValue("dueDate", value, true)}
                          onBlur={handleBlur}
                          label="Due Date" 
                          slotProps={{ textField: { fullWidth: true,error: false } }} />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        {errors.dueDate && touched.dueDate ? (
                          <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.dueDate}</p>
                        ) : null}
                      </Box>
                    </Box>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box sx={{width:'49%'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <p style={{display:'flex',flexDirection:'row',marginBottom:15,marginTop:6,padding:0, textAlign:'start', fontWeight:'bold'}}>Due Time</p>  
                      <DemoContainer components={['TimePicker']} sx={{width:'100%'}}>
                        <Box sx={{display:'flex', flexDirection:'column', width:'100%'}}>
                        <Box>
                        <TimePicker
                          name="dueTime"
                          id="dueTime"
                          label="Due Time"

                          value={values.dueTime}
                          onChange={(value) => setFieldValue("dueTime", value, true)}
                          onBlur={handleBlur}
                          
                          slotProps={{ textField: { fullWidth: true,error: false } }}
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        {errors.dueTime && touched.dueTime ? (
                          <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.dueTime}</p>
                        ) : null}
                      </Box>
                        </Box>
                      </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
           <Box>

                  
            </Box>
            {
            assignment  == undefined ?
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              
              <Box sx={{display:'flex', flexDirection:'column',width:'100%'}}>
                <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Total Questions *</p>
                <TextField sx={{ marginTop: 2, width: '100%' }}
                  id="outlined-number"
                  label=" No Of Questions"
                  type="number"
                  color='secondary'
                  name='questions'
                  value={values.questions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />{errors.questions && touched.questions ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.questions}</p>
                ) : null}
              </Box>
              
            </Box>
            :
            <></>
            }
            

            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <Box sx={{ width: '55%', marginBottom: 5, marginTop: 4 }}>
                <Button type='submit' 
                onClick={ 
                  assignment  == undefined ?  
                  () => {  handleClick() } :
                  () => {  handleUpdate() }
                } 
          endIcon={<BsArrowRightSquare/>}
                  variant="contained" color="secondary"  sx={{fontFamily:'Nunito, sans-serif', width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold',borderRadius: 2 }}>
                  {assignment == undefined ? 'Next' : 'Update'}
                </Button>
              </Box>
            </Box>
          </Box>
        </form>

      </Box>
    </Box>
  );}
}

export default AddAssignment;