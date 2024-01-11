import React, { useState, useEffect } from "react";
import http from "../../../../Axios/axios";
import {Button,} from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { TbDownload } from "react-icons/tb";
import Grid from "@mui/material/Grid";

function StudentIndividualReport() {
    const theme = useTheme()
    const [teacherId, setTeacherId] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [students, setStudents] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState("");
  
    useEffect(() => {
      // Fetch teacher ID from local storage
      const storedUser = JSON.parse(localStorage.getItem("User"));
      if (storedUser && storedUser._id) {
        setTeacherId(storedUser._id);
      }
    }, []);
  
    useEffect(() => {
      async function fetchCourses() {
        try {
          const response = await http.get(`/course/courses/${teacherId}`);
          setCourses(response.data); // Assuming response.data is an array of objects
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
  
      if (teacherId) {
        fetchCourses();
      }
    }, [teacherId]);
  
    useEffect(() => {
        async function fetchAssignments() {
          try {
            const response = await http.get(`/course/Students/${selectedCourse}`);
            const { students } = response.data; // Extract students array from the response
            setStudents(students); // Set only the array of students to the state
            console.log(students);
          } catch (error) {
            console.error(error);
          }
        }
      
        if (selectedCourse) {
          fetchAssignments();
        }
      }, [selectedCourse]);
      
  
      const downloadStudentReport = async (studentId) => {
        try {
          const response = await http.get(`/course/studentReport/${studentId}`, {
            responseType: "blob",
          });
      
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Student_Report.pdf`);
          document.body.appendChild(link);
          link.click();
      
          // Clean up
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error downloading the student report:", error);
        }
      };
      
      const handleDownload = () => {
        const selectedStudentId = selectedAssignment;
        downloadStudentReport(selectedStudentId);
      };
  
    return (
      <Box>
          <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Student Course Report</span></p>
         
          <Box sx={{marginTop:5, borderRadius:2, boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",}}>
        <Grid container sx={{marginTop:5}}>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginTop:3}}>
              <p style={{marginLeft:20, fontWeight:'bolder',fontSize:18}}>Select Course</p>
             <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center',marginBottom:3}}>
                  <select
                      id="courseDropdown"
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      style={{ width: '97%', height: '50px',fontSize:14,borderRadius:7,fontFamily:'Nunito,sans-serif' }}
                  >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                          {course.name}
                      </option>
                      ))}
                  </select>
             </Box>
  
              <p style={{marginLeft:20, fontWeight:'bolder',fontSize:18}}>Select Student</p>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <select
                  id="assignmentDropdown"
                  onChange={(e) => setSelectedAssignment(e.target.value)}
                  style={{ width: '97%', height: '50px',fontSize:14,borderRadius:7,fontFamily:'Nunito,sans-serif' }}
              >
                  <option value="">Select a Student</option>
                  {students.map((student) => (
                  <option key={student._id} value={student._id}>
                      {student.userName}
                  </option>
                  ))}
              </select>
              </Box>
          </Grid>
        </Grid>
  
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:5, marginBottom:5}}>
          <Button startIcon={<TbDownload/>} sx={{width:'50%', padding:2, marginBottom:5,fontWeight:'bold', fontFamily:'Nunito,sans-serif',backgroundColor:theme.palette.secondary.main,color:theme.palette.primary.background, borderRadius:3, ":hover":{backgroundColor:theme.palette.secondary.main,color:theme.palette.primary.background,}}} onClick={handleDownload}>Download Report</Button>
        </Box>
      </Box>
      </Box>
    );
}

export default StudentIndividualReport