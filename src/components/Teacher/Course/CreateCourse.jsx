import React from "react";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTheme } from "@emotion/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import storage from "../../../firebase";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import http from "../../../../Axios/axios";
import { useNavigate } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import ClipLoader from "react-spinners/ClipLoader";

function CreateCourse() {
  const course = useLocation().state?.course;
  const theme = useTheme();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [user, setUser] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [selectedImageName, setSelectedImageName] = React.useState(""); // Added state for the selected image name
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Update the selected image name when a file is selected
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setSelectedImageName(selectedFile ? selectedFile.name : ""); // Set the name or an empty string if no file is selected
  };

  useEffect(() => {
    if (course) {
      setImage(course.image);
    } else {
      setImage(null);
    }
  }, [course]);

  const initialValues =
    course === undefined
      ? {
          courseCode: "",
          title: "",
          creditHours: "",
          description: "",
          language: "",
          starting: "",
          ending: "",
        }
      : {
          courseCode: course.courseCode,
          title: course.name,
          creditHours: course.creditHours,
          description: course.description,
          language: course.language,
          starting: dayjs(course.startingDate),
          ending: dayjs(course.endingDate),
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
      courseCode: Yup.string()
        .min(4)
        .max(6)
        .required("Please Enter the course Code"),
      title: Yup.string()
        .min(2)
        .max(25)
        .required("Please Enter the course title"),
      creditHours: Yup.number()
        .nullable(false)
        .min(1)
        .max(4)
        .required("Credit Hours are required!"),
      language: Yup.string()
        .ensure()
        .required("Language is required required!"),
      description: Yup.string()
        .min(3)
        .required("Please Enter the course Description"),
      starting: Yup.date().required("Starting Date is required"),
      ending: Yup.date().required("Ending Date is required"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  async function addCourse(downloadURL) {
    try {
      const newCourse = {
        teacher: user._id,
        courseCode: values.courseCode,
        name: values.title,
        description: values.description,
        creditHours: values.creditHours,
        language: values.language,
        startingDate: values.starting,
        endingDate: values.ending,
        image: downloadURL,
      };
      if (course === undefined) {
        const url = "/course/addCourse";
        const response = await http.post(url, newCourse);
        console.log("course added", response);
        return navigate("/Teacher/CoursesList");
      } else {
        const url = "/course/updateCourse/" + course._id;
        const response = await http.patch(url, newCourse);
        console.log("course updated", response);
        return navigate("/Teacher/CoursesList");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function getUser() {
    const user = localStorage.getItem("User");
    const p = JSON.parse(user);
    console.log(p);
    setUser(JSON.parse(user));
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (image === null) return;
    setImageError("");
  }, [image]);

  const handleClick = () => {
    if (image === null) {
      setImageError("Course Image is required!");
      return;
    }
    if (
      image === null ||
      values.courseCode === "" ||
      values.title === "" ||
      values.creditHours === "" ||
      values.description === "" ||
      values.language === "" ||
      values.starting === "" ||
      values.ending === ""
    )
      return;
    setIsSubmitting(true);
    const imgRef = ref(storage, `courseImages/${image.name}`);
    const uploadTask = uploadBytesResumable(imgRef, image);
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
          addCourse(downloadURL);
          console.log(downloadURL);
        });
      }
    );
    addCourse(downloadURL).then(() => setIsSubmitting(false));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: 4,
        backgroundColor: theme.palette.primary.background,
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
          <span className="underline">Create Course</span>{" "}
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
                sx={{ display: "flex", flexDirection: "column", width: "49%" }}
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
                  Course Code
                </p>
                <TextField
                  sx={{ width: "100%", marginTop: 2 }}
                  id="outlined-multiline-flexible"
                  label="Enter Course Code"
                  color="secondary"
                  name="courseCode"
                  value={values.courseCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.courseCode && touched.courseCode ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: 0,
                      marginLeft: 4,
                      marginBottom: 0,
                    }}
                  >
                    {errors.courseCode}
                  </p>
                ) : null}
                <br />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "49%" }}
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
                  Course Name
                </p>
                <TextField
                  sx={{ width: "100%", marginTop: 2 }}
                  id="outlined-multiline-flexible"
                  label="Enter Course Name"
                  color="secondary"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <p
                    style={{
                      color: "red",
                      marginLeft: 4,
                      marginBottom: 0,
                      marginTop: 0,
                    }}
                  >
                    {errors.title}
                  </p>
                ) : null}
                <br />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "49%" }}
              >
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 3,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  Credit Hours
                </p>
                <TextField
                  sx={{ width: "100%", marginTop: 2 }}
                  id="outlined-number"
                  label="Enter Credit Hours"
                  type="number"
                  color="secondary"
                  name="creditHours"
                  value={values.creditHours}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.creditHours && touched.creditHours ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: 0,
                      marginLeft: 4,
                      marginBottom: 0,
                    }}
                  >
                    {errors.creditHours}
                  </p>
                ) : null}
                <br />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "49%" }}
              >
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 3,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                 Language
                </p>
                <FormControl sx={{ marginTop: 2, width: "100%" }}>
                  <InputLabel>Select Language</InputLabel>
                  <Select
                    id="outlined-multiline-flexible"
                    label="Select Language"
                    color="secondary"
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={"Java"}>Java</MenuItem>
                    <MenuItem value={"C++"}>C++</MenuItem>
                    <MenuItem value={"C Sharp"}>C# (sharp)</MenuItem>
                    <MenuItem value={"C Language"}>C Lang</MenuItem>
                    <MenuItem value={"Masm"}>Assembly (MASM)</MenuItem>
                    <MenuItem value={"Mips"}>Assembly (MIPS)</MenuItem>
                    <MenuItem value={"Python"}>Python</MenuItem>
                  </Select>
                </FormControl>
                {errors.language && touched.language ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: 0,
                      marginLeft: 4,
                      marginBottom: 0,
                    }}
                  >
                    {errors.language}
                  </p>
                ) : null}
                <br />
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 3,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  Course Outline
                </p>
                <TextField
                  sx={{ width: "100%", marginTop: 2 }}
                  id="outlined-multiline-flexible"
                  label="Enter Course Description / Outline"
                  color="secondary"
                  multiline
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: 0,
                      marginLeft: 4,
                      marginBottom: 0,
                    }}
                  >
                    {errors.description}
                  </p>
                ) : null}
                <br />
              </Box>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ width: "100%", marginTop: 0 }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "row", width: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 5,
                        marginTop: 0,
                        padding: 0,
                        textAlign: "start",
                        fontWeight: "bold",
                      }}
                    >
                      Starting Date
                    </p>
                    <Box sx={{ marginTop: 2, width: "100%" }}>
                      <DatePicker
                        name="starting"
                        id="starting"
                        value={values.starting}
                        onChange={(value) =>
                          setFieldValue("starting", value, true)
                        }
                        onBlur={handleBlur}
                        label="Select Starting Date"
                        slotProps={{
                          textField: { fullWidth: true, error: false },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      {errors.starting && touched.starting ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: 0,
                            marginLeft: 4,
                            marginBottom: 0,
                          }}
                        >
                          {errors.starting}
                        </p>
                      ) : null}
                    </Box>
                  </Box>
                </Box>
                <br />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 5,
                      marginTop: 0,
                      padding: 0,
                      textAlign: "start",
                      fontWeight: "bold",
                    }}
                  >
                    Ending Date
                  </p>
                  <Box sx={{ marginTop: 2 }}>
                    <DatePicker
                      name="ending"
                      id="ending"
                      value={values.ending}
                      onChange={(value) => setFieldValue("ending", value, true)}
                      onBlur={handleBlur}
                      label="Select Ending Date"
                      slotProps={{
                        textField: { fullWidth: true, error: false },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {errors.ending && touched.ending ? (
                      <p
                        style={{
                          color: "red",
                          marginTop: 0,
                          marginLeft: 4,
                          marginBottom: 0,
                        }}
                      >
                        {errors.ending}
                      </p>
                    ) : null}
                  </Box>
                </Box>
              </DemoContainer>
            </LocalizationProvider>

            <br />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontWeight: "bold", width: "100%", marginTop: 1 }}>
                <p style={{ marginTop: 0, marginBottom: 10 }}>
                  Upload Picture*
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
                        name="image"
                        onChange={handleImageChange}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  </Button>
                  {selectedImageName && (
                    <p style={{ marginTop: 10 }}>
                      Selected Image: {selectedImageName}
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
                  {imageError}
                </p>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 3,
                marginTop: 4,
              }}
            >
              <Box sx={{ width: "55%" }}>
                <Button
                  type="submit"
                  onClick={() => handleClick()}
                  variant="contained"
                  color="secondary"
                  endIcon={
                    isSubmitting ? null : ( 
                      <ImportContactsIcon fontSize='large' sx={{ color: 'white' }} />
                    )
                  }
                  sx={{
                    width: "100%",
                    padding: 2,
                    fontSize: 16,
                    fontWeight: "bold",
                    backgroundColor: isSubmitting ? '#1665b5' : '#1665b5',
                  }}
                > {isSubmitting ? ( 
                  <ClipLoader color="#ffffff"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
                ) : (
                  <Box sx={{fontFamily:'Nunito, sans-serif',}}>
                    {course === undefined ? "Create Course" : "Edit Course"}
                  </Box>
                )}
                  
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CreateCourse;
