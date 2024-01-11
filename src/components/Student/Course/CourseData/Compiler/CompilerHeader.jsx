import React from "react";
import Select from "react-select";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import newtheme from "../../../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UploadIcon from '@mui/icons-material/Upload';

const CompilerHeader = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C Sharp" },
    { value: "typescript", label: "Typescript" },
    { value: "c", label: "C" },

  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <ThemeProvider theme={newtheme}>
      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              height: '70%',
              textAlign: "center",
              color: newtheme.palette.secondary.background,
              backgroundColor: "#474747",
              gap: "20px",
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
              marginTop: 5,
            }}
          >
            <h2
              style={{
                color: newtheme.palette.primary.background,
                fontWeight: "bolder",
              }}
            >
              Compiler
            </h2>
            <Select
              options={languages}
              value={userLang}
              onChange={(e) => setUserLang(e.value)}
              placeholder={userLang}
            />
            <Select
              options={themes}
              value={userTheme}
              onChange={(e) => setUserTheme(e.value)}
              placeholder={userTheme}
            />
            {/* <Button
              startIcon={<FileDownloadIcon />}
              sx={{
                backgroundColor: newtheme.palette.primary.background,
                borderRadius: 3,
                padding: 1,
                ":hover": {
                  color: newtheme.palette.primary.background,
                  backgroundColor: newtheme.palette.secondary.background,
                },
              }}
            >
              Download
            </Button>
            <Button
              startIcon={<TaskAltIcon />}
              sx={{
                backgroundColor: newtheme.palette.primary.background,
                borderRadius: 3,
                padding: 1,
                ":hover": {
                  color: newtheme.palette.primary.background,
                  backgroundColor: newtheme.palette.secondary.background,
                },
              }}
            >
              Submit
            </Button> */}
            {/* <Button
              startIcon={<UploadIcon />}
              sx={{
                backgroundColor: newtheme.palette.primary.background,
                borderRadius: 3,
                padding: 1,
                ":hover": {
                  color: newtheme.palette.primary.background,
                  backgroundColor: newtheme.palette.secondary.background,
                },
              }}
            >
              Upload
            </Button> */}
            <label
              style={{
                color: newtheme.palette.primary.background,
                fontSize: 18,
              }}
            >
              Font Size:
            </label>
            <input
              type="range"
              min="13"
              max="30"
              value={fontSize}
              step="2"
              onChange={(e) => {
                setFontSize(e.target.value);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CompilerHeader;
