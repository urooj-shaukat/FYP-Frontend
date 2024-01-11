import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import SimilarityResult from "../../Student/Assignment/PlagiarismScreen";
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
  const { aid } = useParams();

  const totalQuestions = useLocation().state?.totalQuestions;
  const format = useLocation().state?.format;
  const questions = useLocation().state?.questions;
  const student = useLocation().state?.student;
  const studentTobeChecked = useLocation().state?.studentTobeChecked;
  const Over_All_Plagiarism = useLocation().state?.Over_All_Plagiarism;

  const [Total_Plagiarism, setTotal_Plagiarism] = useState(Over_All_Plagiarism);
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

  useEffect(() => {
    if (student) {
      const userJSON = localStorage.getItem("User");
      const user = JSON.parse(userJSON);
      setUserId(user.userID._id);
      fetchStudentIDS(user.userID._id);
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
    }
  };

  const contentRef = useRef(null);

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
            fontFamily: "nunito, sans-serif",
            marginTop: "4%",
            marginBottom: "2%",
            // marginBottom: noOneSubmitted ?'3%' : '10%',
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
      </>
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
      <Box id="wrapper">
        {result.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            ></Box>
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
                  marginLeft: 9,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
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
                  {Total_Plagiarism}%{" "}
                </span>
              </p>
            </Box>
          </>
        )}
        <Box>
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
      </Box>
    </div>
  );
};

export default FileUploadForm;
