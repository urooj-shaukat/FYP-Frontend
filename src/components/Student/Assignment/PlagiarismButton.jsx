import React, { useEffect, useState } from "react";
import axios from "axios";
import SimilarityResult from "./PlagiarismScreen";
import storage from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import http from "../../../../Axios/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AirRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const FileUploadForm = () => {
  const navigate = useNavigate();
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [result, setResult] = useState([]);
  const [Name, setName] = useState([]);
  const [currQuestion, setCurrQuestion] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [userID, setUserId] = useState(null);
  const [students_for_comparison, setStudents_for_comparison] = useState(null);
  const [noOneSubmitted, setNoOneSubmitted] = useState(false);
  const [PlagiarismPercentage, setPlagiarismPercentage] = useState(null)
  const { aid } = useParams();

  const totalQuestions = useLocation().state?.totalQuestions;
  const format = useLocation().state?.format;
  const questions = useLocation().state?.questions;
  const student = useLocation().state?.student;
  const studentTobeChecked = useLocation().state?.studentTobeChecked;
  const isAlreadyReport = useLocation().state?.isAlreadyReport

  const fetchStudentIDS = async (Uid) => {
    const res = await http.get(`/assignment/getStudentIds/${aid}`);
    // console.log(res.data.studentInfo)
    const students = res.data.studentInfo.filter(
      (student) => student.id != Uid
    );
    setStudents_for_comparison(students);
    if (students.length == 0) {
      setNoOneSubmitted(true);
    }
  };

  const getPlagiarismReport = async () => {
    if(isAlreadyReport){
      const res = await http.get(`/Plagiarism/isSubmitted/${aid}`)
      setPlagiarismPercentage(res.data.message.Overall_PlagiarismPercentage)
    }
  }

  useEffect(() => {
    if (student) {
      const userJSON = localStorage.getItem("User");
      const user = JSON.parse(userJSON);
      setUserId(user.userID._id);
      fetchStudentIDS(user.userID._id);
      getPlagiarismReport()
    } else {
      setUserId(studentTobeChecked);
      fetchStudentIDS(studentTobeChecked);
    }

    setQuestionIds(questions.map((question) => question._id));
  }, []);

  const fetchFile_to_be_checked = async (AssignmentID, index, format) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );

      const downloadURL = await getDownloadURL(fileRef);
      //console.log('Download URL:', downloadURL);

      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
      // console.log(`File: ${fileBlob}`);

      const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
        type: fileBlob.type,
        lastModified: new Date().getTime(),
      });

      setFileA(customFileObject);
      //  console.log('File fetched successfully.');

      return customFileObject;
    } catch (error) {
      console.error("Error fetching file:", error);
      return null;
    }
  };

  const fetchFile_for_comaprison = async (
    AssignmentID,
    userID,
    index,
    format
  ) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );

      const downloadURL = await getDownloadURL(fileRef);
      //console.log('Download URL:', downloadURL);

      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
      const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
        type: fileBlob.type,
        lastModified: new Date().getTime(),
      });

      setFileB(customFileObject);
      return customFileObject;
    } catch (error) {
      console.error("Error fetching file:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (students_for_comparison.length == 0) {
      alert("No one else has submitted");
    } else {
      const maxArr = [];

      for (let index = 0; index < totalQuestions; index++) {
        let maxSimilarityPercentage = 0;

        setFileA(null);
        const a = await fetchFile_to_be_checked(aid, index, format);

        for (let j = 0; j < students_for_comparison.length; j++) {
          try {
            setFileB(null);
            const b = await fetchFile_for_comaprison(
              aid,
              students_for_comparison[j].id,
              index,
              format
            );

            const formDataB = new FormData();
            formDataB.append("file_a", a);
            formDataB.append("file_b", b);

            const responseB = await axios.post(
              "http://127.0.0.1:8000/get_plagiarism",
              formDataB,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            maxSimilarityPercentage = Math.max(
              maxSimilarityPercentage,
              responseB.data.similarity_percentage
            );

            setCurrQuestion((prevResult) => [...prevResult, index + 1]);
            setName((prevResult) => [
              ...prevResult,
              students_for_comparison[j].name,
            ]);
            setResult((prevResult) => [...prevResult, responseB.data]);
          } catch (error) {
            console.error("Error uploading files:", error);
          }
        }

        maxArr.push(maxSimilarityPercentage);
      }

      console.log("Max Similarity Percentages:", maxArr);

      // mean of maxArr
      if (!isAlreadyReport) {
        const Overall_PlagiarismPercentage =
          maxArr.reduce((sum, value) => sum + value, 0) / totalQuestions;

        console.log(
          "Overall Plagiarism Percentage:",
          Overall_PlagiarismPercentage
        );

        setPlagiarismPercentage(Math.round(Overall_PlagiarismPercentage,4))

        for (let index = 0; index < totalQuestions; index++) {
          let plag = maxArr[index];
          try {
            const res = await http.put(
              `/Plagiarism/updateSubmission/${questionIds[index]}`,
              { plag }
            );
            console.log(res.data);
          } catch (error) {
            console.error("Error ", error);
          }
        }
        let Checked_With_No_Of_Submissions = students_for_comparison.length;

        console.log(Checked_With_No_Of_Submissions);
        const res = await http.post("/Plagiarism/makePlagReport", {
          aid,
          Overall_PlagiarismPercentage,
          Checked_With_No_Of_Submissions,
        });

        console.log(res.data);
      }
    }
  };

  const downloadPlagiarismReport = async () => {
    const url = window.location.href;
    const assignmentId = url.substring(url.lastIndexOf("/") + 1);
    console.log(assignmentId);

    const userId = JSON.parse(localStorage.getItem("User")).userID._id;
    console.log(userId);

    try {
      const response = await http.get(
        `/course/downloadPlagiarismReport/${userId}/${assignmentId}`,
        {
          responseType: "blob", // Set responseType as blob
        }
      );

      // Check if the response is successful
      if (response.status === 200) {
        // Convert the response to blob and create a URL
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Plagiarism_Report.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error("Failed to download the report");
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
    }
  };

  const generatePDF = () => {
    const element = document.getElementById("wrapper");
    if (element) {
      const opt = {
        margin: 10,
        filename: "Plagiarism_Report.pdf",
        image: { type: "png" },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4" },
      };
      html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding:"1%"
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#1665b5",
            color: "white",
            fontWeight: "bold",
            padding: 3,
            borderRadius: 10,
            marginRight: 7,
            fontFamily: "nunito, sans-serif",
            marginBottom: noOneSubmitted ? "10%" : "2%",
            ":hover": { backgroundColor: "#1665b5", color: "white" },
          }}
          disabled={noOneSubmitted}
        >
          Check Plagiarism
        </Button>
      </Box>
      <>
        {noOneSubmitted && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "2%",
            }}
          >
            <Typography variant="h4">No one Else has submitted</Typography>
          </Box>
        )}
         {!noOneSubmitted && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "4.3%",
            }}
          >
            <Typography variant="h6">Note: Please wait for the Plagiarism to completly check your files before you download Report</Typography>
          </Box>
        )}
      </>
      {result.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={generatePDF}
              startIcon={<FiDownload />}
              sx={{
                backgroundColor: "#1665b5",
                color: "white",
                fontWeight: "bold",
                padding: 2,
                borderRadius: 10,
                marginRight: 7,
                fontFamily: "nunito, sans-serif",
                ":hover": { backgroundColor: "#1665b5", color: "white" },
              }}
            >
              Download Report
            </Button>
          </Box>
          <Box>
            <p
              style={{
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 45,
                fontSize: 25,
                marginLeft: 9,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <span className="underline">Plagiarism Scan Report</span>
            </p>
            <p
                style={{
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 45,
                  fontSize: 22,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  marginRight : "4%"
                }}
              >
                <span> Over All Plagiarism : </span>
                <span
                  style={{
                    color: "red",
                    marginLeft: 5,
                  }}
                >
                  {" "}
                  {PlagiarismPercentage}%{" "}
                </span>
              </p>
          </Box>
          
        </>
      )}
      <Box id='wrapper'>
        {result.map((res, index) => (
          <div key={index}>
            <pre>
              <SimilarityResult
                similarityPercentage={res["similarity_percentage"]}
                fileAContent={res["file_a_content"]}
                similarContent={res["similar_content"]}
                stuName={Name[index]}
                currQuestion={currQuestion[index]}
              />
            </pre>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default FileUploadForm;
