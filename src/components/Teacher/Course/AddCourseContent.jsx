import React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import http from "../../../../Axios/axios";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import storage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcAddImage } from "react-icons/fc";
import { GrNotes } from "react-icons/gr";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ClipLoader from "react-spinners/ClipLoader";

const CreateCourseContent = ({ courses }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course;
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [selectedFileName, setSelectedFileName] = React.useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };

  console.log(course.courseContent);
  const initialValues = {
    lecNo: "",
    title: "",
    fileType: "",
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
      lecNo: Yup.number()
        .nullable(true)
        .required("Lecture number are required!"),
      title: Yup.string()
        .min(3)
        .max(25)
        .required("Please Enter the content title!"),
      fileType: Yup.string()
        .ensure()
        .required("File Type is required required!"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  //console.log(course)
  async function addContent(downloadURL) {
    try {
      const url = "/course/addCourseContent/" + course._id;
      const content = {
        lecNo: values.lecNo,
        title: values.title,
        fileType: values.fileType,
        file: downloadURL,
      };
      const response = await http.put(url, content);
      console.log("content added");
      return navigate("/Teacher/ContentList/" + course._id, {
        state: { course: course },
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (file === null) return;
    setFileError("");
  }, [file]);

  const handleClick = () => {
    if (file === null) {
      setFileError("File is required!");
      return;
    }
    if (values.lecNo === "" || values.title === "" || values.fileType === "")
      return;
    setIsSubmitting(true);
    const imgRef = ref(storage, `courseImages/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log("error");
      },
      () => {
        console.log("success!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addContent(downloadURL);
          console.log(downloadURL);
        });
      }
    );
    addContent(downloadURL).then(() => setIsSubmitting(false));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 1,
              fontSize: 25,
            }}
          >
            <span className="underline">Add Contents</span>{" "}
          </p>
        </Box>
        <Box sx={{ width: "95%" }}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                marginTop: 3,
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: 2,
                paddingLeft: 5,
                paddingRight: 5,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
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
                      marginTop: 20,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Lecture Number
                  </p>
                  <TextField
                    sx={{ marginTop: 2 }}
                    id="outlined-adornment-name"
                    type="number"
                    color="secondary"
                    label="Lec No"
                    name="lecNo"
                    value={values.lecNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.lecNo && touched.lecNo ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: 0,
                        marginLeft: 4,
                        marginBottom: 0,
                      }}
                    >
                      {errors.lecNo}
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
                      marginTop: 20,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Lecture Title
                  </p>
                  <TextField
                    sx={{ marginTop: 2 }}
                    id="outlined-adornment-name"
                    color="secondary"
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: 0,
                        marginLeft: 4,
                        marginBottom: 0,
                      }}
                    >
                      {errors.title}
                    </p>
                  ) : null}
                </Box>
              </Box>
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 0,
                  marginTop: 13,
                  padding: 0,
                  textAlign: "start",
                  fontWeight: "bold",
                }}
              >
                Select File
              </p>
              <FormControl sx={{ marginTop: 2, marginBottom: 1 }} fullWidth>
                <InputLabel id="demo-simple-select-label" color="secondary">
                  File Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  color="secondary"
                  id="demo-simple-select"
                  name="fileType"
                  value={values.fileType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="File Type"
                >
                  <MenuItem value={"Lecture Notes"} color="secondary">
                    Lecture Notes
                  </MenuItem>
                  <MenuItem value={"Helping Material"} color="secondary">
                    Other Helping Material
                  </MenuItem>
                  <MenuItem value={"Coding File"} color="secondary">
                    Coding file
                  </MenuItem>
                </Select>
              </FormControl>
              {errors.fileType && touched.fileType ? (
                <p
                  style={{
                    color: "red",
                    marginTop: 0,
                    marginLeft: 4,
                    marginBottom: 0,
                  }}
                >
                  {errors.fileType}
                </p>
              ) : null}

              <Box sx={{ marginTop: 2, marginBottom: 2, fontWeight: "bold" }}>
                <p style={{ marginTop: 0, marginBottom: 10 }}>Upload File*</p>
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
                        onChange={handleFileChange}
                        hidden
                        accept="file/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  </Button>
                  {selectedFileName && (
                    <p style={{ marginTop: 10 }}>
                      Selected Image: {selectedFileName}
                    </p>
                  )}
                </p>
                <p
                  style={{
                    color: "red",
                    fontWeight: "normal",
                    marginTop: 0,
                    marginLeft: 4,
                    marginBottom: 0,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {fileError}
                </p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <Button
                    type="submit"
                    onClick={() => handleClick()}
                    variant="contained"
                    color="secondary"
                    endIcon={
                      isSubmitting ? null : ( 
                        <DescriptionOutlinedIcon fontSize='large' sx={{ color: 'white' }} />
                      )
                    }
                    sx={{
                      width: "100%",
                      padding: 2,
                      fontSize: 16,
                      fontWeight: "bold",
                      backgroundColor: isSubmitting ? '#1665b5' : '#1665b5',
                      fontFamily:'Nunito, sans-serif',
                    }}
                    // disabled={isSubmitting} 
                  >
                    {isSubmitting ? ( 
                      <ClipLoader color="#ffffff"
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader" />
                    ) : (
                      "Add Course Content"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreateCourseContent;
