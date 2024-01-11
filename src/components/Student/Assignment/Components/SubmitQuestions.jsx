import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import http from "../../../../../Axios/axios";
import { useLocation } from "react-router-dom";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FcAddImage } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import newtheme from "../../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import { BsCloudArrowUp } from 'react-icons/bs';
import { BsSendCheck } from 'react-icons/bs';
import { BsArrowRightCircle } from 'react-icons/bs';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';

const steps = ["Upload Solution", "Confirm Submission"];

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="secondary.footer" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Submit() {
  const Questions = useLocation().state?.Questions;
  const format = useLocation().state?.format;
  const courseID = useLocation().state?.courseID;
  const resubmit = useLocation().state?.resubmit;
  console.log(resubmit);
  const AssignmentID = window.location.pathname.split("/").pop();

  const [file, setFile] = React.useState(null);
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      setProgress(50); // Set progress to 50% when file is added
    } else {
      setSelectedFileName('');
      setProgress(0);
    }
  };

  const handleUploadClick = () => {
    setTimeout(() => {
      setProgress(100); // Set progress to 100% when upload is clicked
    }, 1000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      setProgress(50); // Set progress to 50% when file is added
    } else {
      setSelectedFileName('');
      setProgress(0);
    }
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };

  const [index, setIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [userID, setUserId] = useState(null);
  const [questionDescription, setQuestionDescription] = useState(
    Questions[index].questionDescription
  );
  const [questionMarks, setQuestionMarks] = useState(
    Questions[index].questionTotalMarks
  );
  const [nextClick, setNextClick] = useState(false);
  const theme = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem("User");
    const user = JSON.parse(userJSON);
    setUserId(user.userID._id);
  }, []);

  const handleClick = async () => {
    if (fileInput.current.value == "") {
      const confirmUpload = window.confirm(
        "No file selected. Do you want to continue without uploading a file?"
      );
      if (confirmUpload) {
        fileInput.current.value = "";
        const newIndex = index + 1;
        setIndex(newIndex);

        if (newIndex < Questions.length) {
          await setQuestionMarks(Questions[newIndex].questionTotalMarks);
          await setQuestionDescription(Questions[newIndex].questionDescription);
        }
      }
    } else {
      fileInput.current.value = "";
      const newIndex = index + 1;
      setIndex(newIndex);

      if (newIndex < Questions.length) {
        await setQuestionMarks(Questions[newIndex].questionTotalMarks);
        await setQuestionDescription(Questions[newIndex].questionDescription);
      }
    }
  };

  const handleSubmit = async () => {
    if (fileInput.current.value == "") {
      const confirmUpload = window.confirm(
        "No file selected. Do you want to continue without uploading a file?"
      );
      if (confirmUpload) {
        nav(`/Student/ViewUploadedAssig/${courseID}/${AssignmentID}`);
      }
    } else {
      nav(`/Student/ViewUploadedAssig/${courseID}/${AssignmentID}`);
    }
  };
  const fileInput = useRef(null);

  const action = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const selectedFiles = fileInput.current.files;

    if (selectedFiles.length > 0) {
      const FileSplit = selectedFiles[0].name.split(".");
      const FileFormat = `.${FileSplit[FileSplit.length - 1]}`;

      if (FileFormat === format) {
        const fileRef = ref(
          storage,
          `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
        );
        const uploadTask = uploadBytesResumable(fileRef, selectedFiles[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            console.log("error");
          },
          () => {
            console.log("success!");
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //useState
            });
          }
        );
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
        }
        let url;
        switch (format) {
          case ".py":
            url = `/submit/Python/${Questions[index]._id}/${resubmit}`;
            break;
          case ".java":
            url = `/submit/Java/${Questions[index]._id}/${resubmit}`;
            break;
          case ".c":
            url = `/submit/C/${Questions[index]._id}/${resubmit}`;
            break;
          case ".cpp":
            url = `/submit/Cpp/${Questions[index]._id}/${resubmit}`;
            break;
          default:
            break;
        }
        try {
          const response = await http.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("There was an error uploading the file:", error);
        }
      } else {
        alert(`File Format should be  ${format}`);
        fileInput.current.value = "";
      }
    } else {
      alert("Select File to Upload");
    }
  };

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ mt: "5%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "70%", marginTop: 7 }}>
            {index + 1 >= Questions.length && (
              <>
                <Stepper activeStep={1} alternativeLabel color="secondary">
                  {steps.map((label) => (
                    <Step
                      key={label}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "secondary.footer", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                          {
                            color: "secondary.footer", // Just text label (COMPLETED)
                          },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "secondary.footer", // circle color (ACTIVE)
                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                          {
                            color: "secondary.footer", // Just text label (ACTIVE)
                          },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "primary.background", // circle's number (ACTIVE)
                        },
                      }}
                    >
                      <StepLabel sx={{ color: "red" }}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </>
            )}
            {index + 1 < Questions.length && (
              <Stepper activeStep={0} alternativeLabel color="secondary">
                {steps.map((label) => (
                  <Step
                    key={label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "secondary.footer", // circle color (COMPLETED)
                      },
                      "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        {
                          color: "secondary.footer", // Just text label (COMPLETED)
                        },
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "secondary.footer", // circle color (ACTIVE)
                      },
                      "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                        {
                          color: "secondary.footer", // Just text label (ACTIVE)
                        },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "primary.background", // circle's number (ACTIVE)
                      },
                    }}
                  >
                    <StepLabel sx={{ color: "red" }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>
        </Box>
        <Box sx={{ marginLeft: 5 }}>
          <Grid container spacing={2} sx={{ marginTop:3, marginBottom:1, marginLeft:1.5 }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography sx={{fontWeight:'bold', fontSize:30}}>Question # {index + 1}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft:4
                }}
              >
                <Box sx={{ justifyContent: "flex-start" }}>
                  <Typography variant="h6" sx={{}}>
                    Description: {questionDescription}
                  </Typography>
                </Box>
                <Box sx={{ justifyContent: "flex-end", marginRight:10 }}>
                  <Typography variant="h6">Total Points: ( {questionMarks} Marks )</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={{ marginLeft: 4 }}>
                <div style={{ paddingTop: "20px" }}>
                  <form onSubmit={action} encType="multipart/form-data">
                    <div
                      id="uploadForm"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{display: "flex", flexDirection: "row" }}>
                          <Box sx={{width:'80%', marginRight:3}}>
                          <p style={{ fontWeight: 'bold' }}>Upload File*</p>
                          <Button
                            variant="outlined"
                            component="label"
                            color="secondary"
                            sx={{
                              width: "100%",
                              padding: 2,
                              borderStyle: "dashed",
                              borderRadius: 2,
                              borderColor: newtheme.palette.secondary.footer,
                              ":hover": {
                                borderColor: newtheme.palette.secondary.footer,
                              },
                            }}
                          >
                            <Button
                              variant="dashed"
                              component="label"
                              
                              sx={{ color: "#999999" }}
                            >
                              <FcAddImage
                                fontSize={45}
                                style={{ marginRight: 19 }}
                              />
                              Click to browse or <br />
                              Drag and Drop Files
                              <input
                                type="file"
                                name="files"
                                ref={fileInput}
                                hidden
                                onChange={handleFileChange}
                              />
                            </Button>
                          </Button>
                            <Box sx={{ width: '100%', marginTop:2 }}>
                              <LinearProgress color="primary"  variant="determinate" value={progress} />
                            </Box>
                          </Box>
                          <Box sx={{width:'20%'}}>
                          <Button
                        type="Submit"
                        startIcon={<BsCloudArrowUp fontSize={25}/>}
                        className="btn btn-primary"
                        onClick={handleUploadClick}
                        sx={{
                          color: newtheme.palette.primary.background,
                          backgroundColor: newtheme.palette.secondary.footer,
                          width: "70%",
                          // height:'10',
                          marginRight:10,
                          marginBottom:-22,
                          ":hover": {
                            backgroundColor: theme.palette.primary.background,
                            color: theme.palette.secondary.footer,
                          },
                          border: 1,
                          borderRadius: 10,
                          paddingLeft: 2,
                          paddingRight: 2,
                          paddingTop: 2,
                          paddingBottom: 2,
                        }}
                      >
                        Upload
                      </Button>
                          </Box> 
                        </Box>
                        <Box>
                          {selectedFileName && (
                            <p style={{ marginTop: 10 }}>
                              Selected File: {selectedFileName}
                            </p>
                          )}
                        </Box>
                      </Box>
                      
                    </div>
                  </form>
                </div>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:5, marginBottom:5}}>
              {index + 1 < Questions.length && (
                <Button
                  onClick={handleClick}
                  // disabled={index + 1 < Questions.length ? false : true}
                  disabled={progress !== 100}
                  endIcon={<BsArrowRightCircle/>}
                  sx={{
                    color: newtheme.palette.primary.background,
                    backgroundColor: newtheme.palette.secondary.footer,
                    width: "30%",
                    marginBottom:5,
                    marginTop:1,
                    ":hover": {
                      backgroundColor: theme.palette.primary.background,
                      color: theme.palette.secondary.footer,
                    },
                    border: 1,
                    borderRadius: 3,
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  {"Next"}
                </Button>
              )}
              {index + 1 >= Questions.length && (
                <Button
                  onClick={handleSubmit}
                  disabled={progress !== 100}
                  endIcon={<BsSendCheck/>}
                  sx={{
                    color: newtheme.palette.primary.background,
                    backgroundColor: newtheme.palette.secondary.footer,
                    width: "30%",
                    marginBottom:5,
                    marginTop:1,
                    ":hover": {
                      backgroundColor: theme.palette.primary.background,
                      color: theme.palette.secondary.footer,
                    },
                    border: 1,
                    borderRadius: 3,
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  {"Submit"}
                </Button>
              )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
