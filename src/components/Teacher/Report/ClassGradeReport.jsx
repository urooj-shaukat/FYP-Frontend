import React, { useState, useEffect } from "react";
import http from "../../../../Axios/axios";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Backdrop,
} from "@mui/material";

import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { TbDownload } from "react-icons/tb";
import Grid from "@mui/material/Grid";

function ReportGenerator() {
  const theme = useTheme();
  const [teacherId, setTeacherId] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);
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
        const response = await http.get(
          `/course/assignments/${selectedCourse}`
        );
        setAssignments(response.data);
        console.log(response.data);
        // Assuming response.data is an array of objects
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedCourse) {
      fetchAssignments();
    }
  }, [selectedCourse]);

  const downloadReport = async (selectedAssignment) => {
    try {
      const response = await http.get(`/course/report/${selectedAssignment}`, {
        responseType: "blob",
      });

      // Create a blob URL for the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Assignment__Report.pdf`);

      // Simulate a click on the anchor element to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up after the download is initiated
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the report:", error);
      // Handle error scenarios, such as displaying an error message to the user
    }
  };

  // Usage example - Call the downloadReport function on button click with the selected assignment ID
  const handleDownload = () => {
    const selectedAssignmentId = selectedAssignment; // Replace this with your selected assignment ID

    // Call the downloadReport function with the selected assignment ID
    downloadReport(selectedAssignmentId);
  };

  return (
    <Box>
      <p
        style={{
          fontWeight: "bold",
          marginBottom: 8,
          fontSize: 25,
          marginLeft: 9,
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span className="underline">Class Grade Report</span>
      </p>

      <Box
        sx={{
          marginTop: 5,
          borderRadius: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
        }}
      >
        <Grid container sx={{ marginTop: 5 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 3 }}>
            <p style={{ marginLeft: 20, fontWeight: "bolder", fontSize: 18 }}>
              Select Course
            </p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <select
                id="courseDropdown"
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{
                  width: "97%",
                  height: "50px",
                  fontSize: 14,
                  borderRadius: 7,
                  fontFamily: "Nunito,sans-serif",
                }}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </Box>

            <p style={{ marginLeft: 20, fontWeight: "bolder", fontSize: 18 }}>
              Select Assignment
            </p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <select
                id="assignmentDropdown"
                onChange={(e) => setSelectedAssignment(e.target.value)}
                style={{
                  width: "97%",
                  height: "50px",
                  fontSize: 14,
                  borderRadius: 7,
                  fontFamily: "Nunito,sans-serif",
                }}
              >
                <option value="">Select an assignment</option>
                {assignments.map((assignment) => (
                  <option key={assignment._id} value={assignment._id}>
                    {assignment.assignmentNumber}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Button
            startIcon={<TbDownload />}
            sx={{
              width: "50%",
              padding: 2,
              marginBottom: 5,
              fontWeight: "bold",
              fontFamily: "Nunito,sans-serif",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.background,
              borderRadius: 3,
              ":hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.background,
              },
            }}
            onClick={handleDownload}
          >
            Download Report
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportGenerator;
