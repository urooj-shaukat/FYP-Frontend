import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Radio, RadioGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import http from "../../../../../Axios/axios";
import { CgAddR } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { FcAddImage } from "react-icons/fc";
import { GrNotes } from "react-icons/gr";

import { useFormik } from "formik";
import * as Yup from "yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { RiDeleteBin5Line } from "react-icons/ri";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ClipLoader from "react-spinners/ClipLoader";
import { generateArrayTestCases } from "./ArrayAutomation";
import { formatTestCasesAsObjects } from "./SimpleInputAutomation";

const steps = ["Assignment Details", "Add Questions", "Create an Assignment"];

export default function AddQuestion({
  currentQuestion,
  totalQuestions,
  assig,
  courseID,
}) {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(currentQuestion);
  const [question, setQuestion] = useState("");
  const [questionTotalMarks, setQuestionTotalMarks] = useState(0);
  const [isTestcaseArray, setIsTestcaseArray] = useState(false);
  const [testCases, setTestCases] = useState([
    { input: "", output: "", arraySize: "" },
  ]);
  // const [arraySize, setArraySize] = useState([]);

  //solution code only input test case
  const [inputTestCases, setInputTestCases] = useState([
    { input: "", arraySize: "" },
  ]);
  const [file, setFile] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //for automation
  const [automatedInput, setAutomatedInput] = useState(null);

  //for radio button testcase option
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [inputOption, setInputOption] = useState("");
  const handleInputChange = (event) => {
    setInputOption(event.target.value);
  };

  const initialValues = {
    arraySize: "",
    numInputs: "",

    numTestCases: "",
    startRange: "",
    endRange: "",
    dataType: "",
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      arraySize: Yup.number().required("Please Enter the array size"),
      numInputs: Yup.number().required(
        "Please Enter the number of inputs required"
      ),

      numTestCases: Yup.number().required("Number of testcases is required"),
      startRange: Yup.number().required("Please Enter the start range"),
      endRange: Yup.number().required("Please Enter the end range"),
      dataType: Yup.string().ensure().required("Please Enter the data type"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log(values);
    },
  });
  //checkbox for input array option
  const handleSold = (event) => {
    setIsTestcaseArray(event.target.checked);
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const handleAddTestCase = () => {
    // Adding new test case
    setTestCases([...testCases, { input: "", output: "", arraySize: "" }]);
  };

  const handleAddInput = () => {
    // Adding new input test case
    setInputTestCases([...inputTestCases, { input: "", arraySize: "" }]);
  };

  const handleRemoveInputTestCase = (index) => {
    // Remove the input test case at the specified index
    const updatedTestCases = [...inputTestCases];
    updatedTestCases.splice(index, 1);
    setInputTestCases(updatedTestCases);
  };

  const handleRemoveTestCase = (index) => {
    // Remove the test case at the specified index
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleClick = async () => {
    try {
      if (selectedOption === "testcase") {
        if (
          testCases[0].input !== "" &&
          testCases[0].output !== "" &&
          question !== ""
        ) {
          const newQuestion = {
            questionDescription: question,
            questionTotalMarks: questionTotalMarks,
            testCases: testCases.map((testCase) => ({
              input: isTestcaseArray
                ? parseInput(testCase.input)
                : testCase.input,
              output: testCase.output,
              arraySize: isTestcaseArray ? testCase.arraySize : null,
            })),
            isInputArray: isTestcaseArray,
          };

          console.log("new question ", newQuestion);

          questions.push(newQuestion);

          console.log("questions", questions);

          setQuestion("");
          setQuestionTotalMarks(0);
          setIsTestcaseArray(false);
          setTestCases([{ input: "", output: "", arraySize: "" }]);

          setQuestionNumber(questionNumber + 1);

          if (questionNumber === totalQuestions - 1) {
            console.log(
              "inside full questions questionNumber ",
              questionNumber
            );
            const response = await http.post("/assignment/addAssignment", {
              questions,
              assig,
            });
            console.log(
              "Assignment added successfully ",
              response.data.success
            );
            if (response.data.success) {
              alert("Assignment Created Successfully");
              navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
            }
          }
        } else {
          alert(
            "Please enter at least 1 test case, question, and total marks \n Note : Question marks should be less than total Assignment Marks"
          );
        }
      } else if (selectedOption === "solutionCode") {
        if (
          inputTestCases.length > 0 &&
          inputTestCases[0].input !== "" &&
          question !== "" &&
          file !== null
        ) {
          const formData = new FormData();

          const FileSplit = file.name.split("."); // q1.java  [q1, java]
          const FileFormat = `.${FileSplit[FileSplit.length - 1]}`;

          console.log(assig.format);
          console.log(FileFormat);

          if (assig.format === FileFormat) {
            formData.append("files", file);

            console.log(inputTestCases);

            let testCasesString;

            if (isTestcaseArray) {
              testCasesString = JSON.stringify(
                inputTestCases.map((testCase) => ({
                  input: parseInput(testCase.input),
                  arraySize: testCase.arraySize,
                }))
              );
            } else {
              testCasesString = JSON.stringify(inputTestCases);
            }

            let url;

            switch (FileFormat) {
              case ".py":
                url = `/submit/getOutputPython/${testCasesString}/${isTestcaseArray}`;
                break;
              case ".java":
                url = `/submit/getOutputJava/${testCasesString}/${isTestcaseArray}`;
                break;
              case ".c":
                url = `/submit/getOutputC/${testCasesString}/${isTestcaseArray}`;
                break;
              case ".cpp":
                url = `/submit/getOutputCpp/${testCasesString}/${isTestcaseArray}`;
                break;
              default:
                break;
            }
            const res = await http.post(
              url,
              formData,

              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const testCases = res.data;

            console.log(testCases);

            const newQuestion = {
              questionDescription: question,
              questionTotalMarks: questionTotalMarks,
              testCases: testCases.map((testCase) => ({
                input: Array.isArray(testCase.input)
                  ? testCase.input
                  : testCase.input,
                output: testCase.output,
                arraySize: Array.isArray(testCase.input)
                  ? testCase.arraySize
                  : null,
              })),

              isInputArray: isTestcaseArray,
            };

            console.log("new question ", newQuestion);

            questions.push(newQuestion);

            console.log("questions ", questions);

            setQuestion("");
            setQuestionTotalMarks(0);
            setIsTestcaseArray(false);
            setTestCases([{ input: "", output: "", arraySize: "" }]);
            //setArraySize('')
            setFile(null);
            setInputTestCases([{ inputs: "", arraySize: "" }]);
            setSelectedOption("");
            setQuestionNumber(questionNumber + 1);
            if (questionNumber === totalQuestions - 1) {
              console.log(
                "inside full questions questionNumber ",
                questionNumber
              );
              const response = await http.post("/assignment/addAssignment", {
                questions,
                assig, //send usestate here
              });
              console.log(
                "Assignment added successfully ",
                response.data.success
              );
              if (response.data.success) {
                alert("Assignment Created Successfully");
                navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
              }
            }
          } else {
            alert(
              "File format should be the same as of assignment \n Note : Question marks should be less than total Assignment Marks"
            );
          }
        } else {
          alert("please fill required fields");
        }
      } else if (selectedOption === "automatedTestcase") {
        if (
          question !== "" &&
          file !== null &&
          (values.arraySize !== "" || values.numInputs !== "") &&
          values.dataType !== "" &&
          values.numTestCases !== "" &&
          values.startRange !== "" &&
          values.endRange !== ""
        ) {
          let testcaseInputs;
          let inputs;
          if (isTestcaseArray) {
            testcaseInputs = await generateArrayTestCases(
              values.arraySize,
              values.numTestCases,
              values.startRange,
              values.endRange,
              values.dataType
            );
            inputs = JSON.stringify(
              testcaseInputs.map((testCase) => ({
                input: parseInput(testCase.input),
              }))
            );
            console.log(inputs);
          } else {
            testcaseInputs = await formatTestCasesAsObjects(
              values.numInputs,
              values.numTestCases,
              values.startRange,
              values.endRange,
              values.dataType
            );
            console.log(testcaseInputs);
            inputs = JSON.stringify(testcaseInputs);
            console.log(inputs);
          }
          // Set the inputs to state
          setAutomatedInput(inputs);

          const formData = new FormData();
          const FileSplit = file.name.split(".");
          const FileFormat = `.${FileSplit[FileSplit.length - 1]}`;

          if (assig.format === FileFormat) {
            formData.append("files", file);

            //let testCasesString;

            // if (isTestcaseArray) {
            //   const testCaseCopy = [...automatedInput]; // Create a copy of automatedInput
            //   testCasesString = JSON.stringify(testCaseCopy.map((testCase) => ({
            //     input: parseInput(testCase.input),
            //   })));

            // } else {
            //   const testCaseCopy = automatedInput
            //   testCasesString = JSON.stringify(testCaseCopy);
            // }

            //console.log(testCasesString);
            let url;

            switch (FileFormat) {
              case ".py":
                url = `/submit/getOutputPython/${inputs}/${isTestcaseArray}`;
                break;
              case ".java":
                url = `/submit/getOutputJava/${inputs}/${isTestcaseArray}`;
                break;
              case ".c":
                url = `/submit/getOutputC/${inputs}/${isTestcaseArray}`;
                break;
              case ".cpp":
                url = `/submit/getOutputCpp/${inputs}/${isTestcaseArray}`;
                break;
              default:
                break;
            }
            const res = await http.post(
              url,
              formData,

              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const testCases = res.data;

            console.log(testCases);

            const newQuestion = {
              questionDescription: question,
              questionTotalMarks: questionTotalMarks,
              testCases: testCases.map((testCase) => ({
                input: Array.isArray(testCase.input)
                  ? testCase.input
                  : testCase.input,
                output: testCase.output,
              })),

              isInputArray: isTestcaseArray,
            };

            console.log("new question ", newQuestion);

            questions.push(newQuestion);

            console.log("questions ", questions);

            setQuestion("");
            setQuestionTotalMarks(0);
            setIsTestcaseArray(false);
            setTestCases([{ input: "", output: "" }]);
            setFile(null);
            setInputTestCases([{ inputs: "" }]);
            setSelectedOption("");
            setQuestionNumber(questionNumber + 1);
            values.arraySize = "";
            values.dataType = "";
            values.startRange = "";
            values.endRange = "";
            values.numInputs = "";
            values.numTestCases = "";
            setAutomatedInput(null);
            if (questionNumber === totalQuestions - 1) {
              console.log(
                "inside full questions questionNumber ",
                questionNumber
              );
              const response = await http.post("/assignment/addAssignment", {
                questions,
                assig, //send usestate here
              });
              console.log(
                "Assignment added successfully ",
                response.data.success
              );
              if (response.data.success) {
                alert("Assignment Created Successfully");
                navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
              }
            }
          } else {
            alert(
              "File format should be the same as of assignment \n Note : Question marks should be less than total Assignment Marks"
            );
          }
        } else {
          alert("please fill required fields");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const parseInput = (input) => {
    try {
      const parsedInput = JSON.parse(input);

      if (Array.isArray(parsedInput)) {
        return parsedInput;
      }
    } catch (error) {
      return [input];
    }
  };

  return (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <p
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 1,
          fontSize: 25,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span className="underline">Add Question</span>{" "}
      </p>
      {questionNumber !== totalQuestions - 1 && (
        <>
          <Stepper activeStep={1} alternativeLabel sx={{ marginTop: 3 }}>
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "secondary.main", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "primary.main", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "secondary.main", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "primary.main", // Just text label (ACTIVE)
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
      {questionNumber === totalQuestions - 1 && (
        <>
          <Stepper activeStep={2} alternativeLabel sx={{ marginTop: 3 }}>
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "secondary.main", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "primary.main", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "secondary.main", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "primary.main", // Just text label (ACTIVE)
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
      <Box
        sx={{
          display: "flex",
          marginTop: 3,
          marginBottom: 5,
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          paddingLeft: 5,
          paddingRight: 5,
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 15,
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            Write Description of Question # {questionNumber + 1}
          </p>
          <Grid item lg={12}>
            <TextField
              style={{ width: "100%" }}
              value={question}
              color="secondary"
              multiline
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              label="Enter Question"
            />
          </Grid>
          <Grid item lg={6}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginTop: 10,
                marginBottom: 15,
              }}
            >
              Question Marks*
            </p>
            <TextField
              style={{ width: "100%" }}
              value={questionTotalMarks}
              onChange={(e) => setQuestionTotalMarks(e.target.value)}
              label="Enter Question Marks"
              color="secondary"
              type="number"
            />
          </Grid>
          {/* <Grid item lg={6}>
          <Box sx={{marginTop:5.5}}>
            <FormControlLabel
                sx={{paddingTop:1, fontSize:20}}
                label="Select Box for Input Array"
                control={<Checkbox checked={isTestcaseArray} onChange={handleSold} color='secondary' />}
            />
          </Box>
        </Grid> */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ marginLeft: 2, marginTop: 4 }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  Choose a TESTCASE Option*
                </p>
                <RadioGroup
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    sx={{ paddingTop: 1 }}
                    label="Select to Enter Test cases"
                    value="testcase"
                    control={<Radio color="secondary" />}
                  />
                  <FormControlLabel
                    sx={{ paddingTop: 1 }}
                    label="Select to Upload Solution Code"
                    value="solutionCode"
                    control={<Radio color="secondary" />}
                  />
                  <FormControlLabel
                    sx={{ paddingTop: 1 }}
                    label="Select to Automate Test cases"
                    value="automatedTestcase"
                    control={<Radio color="secondary" />}
                  />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>

          {selectedOption === "testcase" && (
            <>
            <Box sx={{ marginLeft: 2, marginTop: 2, width: "100%" }}>
                <FormControlLabel
                  sx={{ paddingTop: 1, fontSize: 20 }}
                  label="Select Box for Input Array"
                  control={
                    <Checkbox
                      checked={isTestcaseArray}
                      onChange={handleSold}
                      color="secondary"
                    />
                  }
                />
              </Box>
              {isTestcaseArray ? (
                <>
                  {testCases.map((testCase, index) => (
                    <Grid item lg={4} md={3} sm={4} xs={12} key={index}>
                      <Box sx={{ marginRight: 2 }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginTop: 0,
                          }}
                        >
                          Array Size*
                        </p>
                        <TextField
                          sx={{ marginBottom: 2 }}
                          multiline
                          value={testCase.arraySize}
                          onChange={(e) => {
                            const updatedTestCases = [...testCases];
                            updatedTestCases[index].arraySize = e.target.value;
                            setTestCases(updatedTestCases);
                          }}
                          label="Enter Array Size"
                          color="secondary"
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 2,
                        }}
                      >
                        <Box sx={{ marginRight: 2 }}>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginTop: 0,
                            }}
                          >
                            Testcase Input
                          </p>
                          <TextField
                            sx={{ marginBottom: 2 }}
                            multiline
                            value={testCase.input}
                            onChange={(e) => {
                              const updatedTestCases = [...testCases];
                              updatedTestCases[index].input = e.target.value;
                              setTestCases(updatedTestCases);
                            }}
                            label="Enter Array Input"
                            color="secondary"
                          />
                        </Box>
                        <Box>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginTop: 0,
                            }}
                          >
                            Testcase Output
                          </p>
                          <TextField
                            value={testCase.output}
                            multiline
                            onChange={(e) => {
                              const updatedTestCases = [...testCases];
                              updatedTestCases[index].output = e.target.value;
                              setTestCases(updatedTestCases);
                            }}
                            label="Expected Output"
                            color="secondary"
                          />
                        </Box>
                      </Box>
                      <IconButton onClick={() => handleRemoveTestCase(index)}>
                        <RiDeleteBin5Line
                          style={{
                            color: theme.palette.secondary.main,
                            fontSize: 28,
                            marginTop: 0,
                          }}
                        />
                      </IconButton>
                    </Grid>
                  ))}
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAddTestCase}
                      sx={{
                        mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
                        mt: 9,
                        padding: 2,
                        borderRadius: 5,
                      }}
                      startIcon={<CgAddR />}
                    >
                      Add
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  {testCases.map((testCase, index) => (
                    <Grid item lg={4} md={3} sm={4} xs={12} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 2,
                        }}
                      >
                        <Box sx={{ marginRight: 2 }}>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginTop: 0,
                            }}
                          >
                            Testcase Input
                          </p>
                          <TextField
                            sx={{ marginBottom: 2 }}
                            multiline
                            value={testCase.input}
                            onChange={(e) => {
                              const updatedTestCases = [...testCases];
                              updatedTestCases[index].input = e.target.value;
                              setTestCases(updatedTestCases);
                            }}
                            label="Enter Input"
                            color="secondary"
                          />
                        </Box>
                        <Box>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginTop: 0,
                            }}
                          >
                            Testcase Output
                          </p>
                          <TextField
                            value={testCase.output}
                            multiline
                            onChange={(e) => {
                              const updatedTestCases = [...testCases];
                              updatedTestCases[index].output = e.target.value;
                              setTestCases(updatedTestCases);
                            }}
                            label="Expected Output"
                            color="secondary"
                          />
                        </Box>
                      </Box>
                      <IconButton onClick={() => handleRemoveTestCase(index)}>
                        <RiDeleteBin5Line
                          style={{
                            color: theme.palette.secondary.main,
                            fontSize: 28,
                            marginTop: 0,
                          }}
                        />
                      </IconButton>
                    </Grid>
                  ))}
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAddTestCase}
                      sx={{
                        mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
                        mt: 9,
                        padding: 2,
                        borderRadius: 5,
                      }}
                      startIcon={<CgAddR />}
                    >
                      Add
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          {selectedOption === "solutionCode" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontWeight: "bold",
                  width: "100%",
                  marginLeft: 2,
                }}
              >
                <p style={{ marginTop: 0, marginBottom: 10 }}>
                  Upload Solution File*
                </p>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    color="secondary"
                    sx={{
                      width: "100%",
                      padding: 2,
                      borderStyle: "dashed",
                      borderRadius: 2,
                    }}
                  >
                    <Button
                      variant="dashed"
                      component="label"
                      sx={{ color: "#999999" }}
                    >
                      <FcAddImage fontSize={45} style={{ marginRight: 19 }} />
                      Click to browse or <br />
                      Drag and Drop Files
                      <input
                        name="file"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                        hidden
                        accept="file/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  </Button>
                </p>
              </Box>
              <Box sx={{ marginLeft: 2, marginTop: 1, width: "100%" }}>
                <FormControlLabel
                  sx={{ paddingTop: 1, fontSize: 20 }}
                  label="Select Box for Input Array"
                  control={
                    <Checkbox
                      checked={isTestcaseArray}
                      onChange={handleSold}
                      color="secondary"
                    />
                  }
                />
              </Box>
              
              {isTestcaseArray ? (<>
                {inputTestCases.map((testCase, index) => (
                <Grid item lg={3} md={3} sm={4} xs={12} key={index}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ marginRight: 2 }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          marginTop: 0,
                        }}
                      >
                        Array Size*
                      </p>
                      <TextField
                        sx={{ marginBottom: 2 }}
                        multiline
                        value={testCase.arraySize}
                        onChange={(e) => {
                          const updatedTestCases = [...inputTestCases];
                          updatedTestCases[index].arraySize = e.target.value;
                          setInputTestCases(updatedTestCases);
                        }}
                        label="Enter Array Size"
                        color="secondary"
                      />
                    </Box>
                    <Box>
                      <Box>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginTop: 0,
                          }}
                        >
                          Testcase Input
                        </p>
                      </Box>
                      <TextField
                        sx={{ marginBottom: 2 }}
                        value={testCase.input}
                        multiline
                        onChange={(e) => {
                          const updatedTestCases = [...inputTestCases];
                          updatedTestCases[index].input = e.target.value;
                          setInputTestCases(updatedTestCases);
                        }}
                        label="Enter Input"
                        color="secondary"
                      />
                    </Box>
                  </Box>
                  <IconButton onClick={() => handleRemoveInputTestCase(index)}>
                    <RiDeleteBin5Line
                      style={{
                        color: theme.palette.secondary.main,
                        fontSize: 28,
                        marginTop: 0,
                      }}
                    />
                  </IconButton>
                </Grid>
              ))}
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddInput}
                  sx={{
                    mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
                    mt: 6.5,
                    padding: 2,
                    borderRadius: 5,
                  }}
                  startIcon={<CgAddR />}
                >
                  Add
                </Button>
              </Box>
              </>):(<>
                {inputTestCases.map((testCase, index) => (
                <Grid item lg={3} md={3} sm={4} xs={12} key={index}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                      <Box>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginTop: 0,
                          }}
                        >
                          Testcase Input
                        </p>
                      </Box>
                      <TextField
                        sx={{ marginBottom: 2 }}
                        value={testCase.input}
                        multiline
                        onChange={(e) => {
                          const updatedTestCases = [...inputTestCases];
                          updatedTestCases[index].input = e.target.value;
                          setInputTestCases(updatedTestCases);
                        }}
                        label="Enter Input"
                        color="secondary"
                      />
                    </Box>
                  </Box>
                  <IconButton onClick={() => handleRemoveInputTestCase(index)}>
                    <RiDeleteBin5Line
                      style={{
                        color: theme.palette.secondary.main,
                        fontSize: 28,
                        marginTop: 0,
                      }}
                    />
                  </IconButton>
                </Grid>
              ))}
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddInput}
                  sx={{
                    mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
                    mt: 6.5,
                    padding: 2,
                    borderRadius: 5,
                  }}
                  startIcon={<CgAddR />}
                >
                  Add
                </Button>
              </Box>
              </>)}

              
            </>
          )}

          {selectedOption === "automatedTestcase" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontWeight: "bold",
                  width: "100%",
                  marginLeft: 2,
                }}
              >
                <p style={{ marginTop: 0, marginBottom: 10 }}>
                  Upload Solution File*
                </p>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    color="secondary"
                    sx={{
                      width: "100%",
                      padding: 2,
                      borderStyle: "dashed",
                      borderRadius: 2,
                    }}
                  >
                    <Button
                      variant="dashed"
                      component="label"
                      sx={{ color: "#999999" }}
                    >
                      <FcAddImage fontSize={45} style={{ marginRight: 19 }} />
                      Click to browse or <br />
                      Drag and Drop Files
                      <input
                        name="file"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                        hidden
                        accept="file/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  </Button>
                </p>
              </Box>
              <Box sx={{ marginLeft: 2, marginTop: 1, width: "100%" }}>
                <FormControlLabel
                  sx={{ paddingTop: 1, fontSize: 20 }}
                  label="Select Box for Input Array"
                  control={
                    <Checkbox
                      checked={isTestcaseArray}
                      onChange={handleSold}
                      color="secondary"
                    />
                  }
                />
              </Box>
              <Box sx={{ width: "100%", ml: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {isTestcaseArray ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "49%",
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 0,
                          marginTop: 33,
                          padding: 0,
                          textAlign: "start",
                          fontWeight: "bold",
                        }}
                      >
                        Enter Array Size
                      </p>
                      <TextField
                        sx={{ width: "100%", marginTop: 2 }}
                        id="outlined-multiline-flexible"
                        label="Enter array size"
                        type="number"
                        color="secondary"
                        name="arraySize"
                        value={values.arraySize}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.arraySize && touched.arraySize ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: 0,
                            marginLeft: 4,
                            marginBottom: 0,
                          }}
                        >
                          {errors.arraySize}
                        </p>
                      ) : null}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "49%",
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 0,
                          marginTop: 33,
                          padding: 0,
                          textAlign: "start",
                          fontWeight: "bold",
                        }}
                      >
                        Enter Number of Inputs
                      </p>
                      <TextField
                        sx={{ width: "100%", marginTop: 2 }}
                        id="outlined-multiline-flexible"
                        label="Number of Inputs"
                        type="number"
                        color="secondary"
                        name="numInputs"
                        value={values.numInputs}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.numInputs && touched.numInputs ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: 0,
                            marginLeft: 4,
                            marginBottom: 0,
                          }}
                        >
                          {errors.numInputs}
                        </p>
                      ) : null}
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "49%",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 0,
                        marginTop: 33,
                        padding: 0,
                        textAlign: "start",
                        fontWeight: "bold",
                      }}
                    >
                      Enter Number of testcases
                    </p>
                    <TextField
                      sx={{ width: "100%", marginTop: 2 }}
                      id="outlined-multiline-flexible"
                      label="Number of testcases"
                      type="number"
                      color="secondary"
                      name="numTestCases"
                      value={values.numTestCases}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.numTestCases && touched.numTestCases ? (
                      <p
                        style={{
                          color: "red",
                          marginTop: 0,
                          marginLeft: 4,
                          marginBottom: 0,
                        }}
                      >
                        {errors.numTestCases}
                      </p>
                    ) : null}
                  </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "49%",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 0,
                      marginTop: 33,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Enter Start Range
                  </p>
                  <TextField
                    sx={{ width: "100%", marginTop: 2 }}
                    id="outlined-multiline-flexible"
                    label="Start Range"
                    type="number"
                    color="secondary"
                    name="startRange"
                    value={values.startRange}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.startRange && touched.startRange ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: 0,
                        marginLeft: 4,
                        marginBottom: 0,
                      }}
                    >
                      {errors.startRange}
                    </p>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "49%",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 0,
                      marginTop: 33,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Enter End Range
                  </p>
                  <TextField
                    sx={{ width: "100%", marginTop: 2 }}
                    id="outlined-multiline-flexible"
                    label="End Range"
                    type="number"
                    color="secondary"
                    name="endRange"
                    value={values.endRange}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.endRange && touched.endRange ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: 0,
                        marginLeft: 4,
                        marginBottom: 0,
                      }}
                    >
                      {errors.endRange}
                    </p>
                  ) : null}
                </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "49%",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 0,
                      marginTop: 33,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Select Data Type *
                  </p>
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <InputLabel>Select DataType</InputLabel>
                    <Select
                      id="outlined-multiline-flexible"
                      label="Select DataType"
                      color="secondary"
                      name="dataType"
                      value={values.dataType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={"float"}>float</MenuItem>
                      <MenuItem value={"string"}>string</MenuItem>
                      <MenuItem value={"int"}>int</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.dataType && touched.dataType ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: 0,
                        marginLeft: 4,
                        marginBottom: 0,
                      }}
                    >
                      {errors.dataType}
                    </p>
                  ) : null}
                </Box>
              </Box>
            </>
          )}

          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleClick}
              disabled={questionNumber >= totalQuestions ? true : false}
              sx={{
                color: theme.palette.primary.background,
                backgroundColor: theme.palette.secondary.main,
                ":hover": {
                  backgroundColor: theme.palette.primary.background,
                  color: theme.palette.secondary.main,
                  border: 1,
                },
                borderRadius: 3,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                marginBottom: 3,
                borderColor: theme.palette.secondary.Button,
                width: "50%",
                fontWeight: "bold",
                fontFamily: "Nunito, sans-serif",
              }}
              endIcon={<GiConfirmed style={{}} />}
            >
              {questionNumber === totalQuestions - 1
                ? "Confirm Assignemnt"
                : "Next Question"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
