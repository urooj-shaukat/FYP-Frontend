import { useState } from "react";
import Editor from "@monaco-editor/react";
import CompilerHeader from "./CompilerHeader";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import newtheme from "../../../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import BounceLoader from "react-spinners/BounceLoader";
import http from "../../../../../../Axios/axios";
import axios from "axios";

function Compile() {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python3");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  async function compile() {
    try {
      setLoading(true);
      if (userCode === ``) {
        setUserOutput("Please enter code first");
        setLoading(false)
      } else if (userLang === "c" || userLang === "cpp" ) {
        const response = await axios({
          method: "POST",
          url: "https://online-code-compiler.p.rapidapi.com/v1/",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "9b06c702d6msh4deecd15437647ap1031bajsn4173b410ec45",
            "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
          },
          data: {
            language: userLang,
            version: "latest",
            code: userCode,
            input: userInput,
          },
        });
        console.log(response.data);
        setUserOutput(response.data.output);
        setLoading(false);
      } else if (
        userLang === "java" ||
        userLang === "typescript" ||
        userLang === "python" ||
        userLang === "csharp"
      ) {
        const response = await axios({
          method: "POST",
          url: "https://code-compiler10.p.rapidapi.com/",
          headers: {
            "content-type": "application/json",
            "x-compile": "rapidapi",
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "9b06c702d6msh4deecd15437647ap1031bajsn4173b410ec45",
            "X-RapidAPI-Host": "code-compiler10.p.rapidapi.com",
          },
          data: {
            langEnum: [userLang],
            lang: userLang,
            code: userCode,
            input: userInput,
          },
        });
        console.log(response.data);
        setUserOutput(response.data.output);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  return (
    <ThemeProvider theme={newtheme}>
      <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Online Code Compiler</span></p>
      
      <Box>
        <CompilerHeader
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        ></CompilerHeader>
        <Box style={{ display: "flex", height: "calc(100vh - 50px)",width:'100%' }}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                <Editor
                  options={options}
                  height="calc(100vh - 50px)"
                  width="100%"
                  theme={userTheme}
                  language={userLang}
                  defaultLanguage="python"
                  defaultValue="# Start your solution from here"
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "calc(100vh - 50px)",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#242424",
                  borderLeft: "3px solid #1f65e6",
                  padding: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 2,
                  }}
                >
                  <Button
                    onClick={() => compile()}
                    startIcon={
                      <CodeIcon
                        style={{ color: newtheme.palette.primary.main }}
                      />
                    }
                    sx={{
                      width: 160,
                      backgroundColor: "white",
                      borderRadius: 3,
                      padding: 1,
                      ":hover": {
                        color: newtheme.palette.primary.background,
                        backgroundColor: newtheme.palette.secondary.background,
                      },
                    }}
                  >
                    Run Code
                  </Button>
                  <Button
                    startIcon={
                      <DeleteIcon
                        style={{ color: newtheme.palette.primary.main }}
                      />
                    }
                    onClick={() => {
                      clearOutput();
                    }}
                    sx={{
                      width: 160,
                      backgroundColor: "white",
                      borderRadius: 3,
                      padding: 1,
                      ":hover": {
                        color: newtheme.palette.primary.background,
                        backgroundColor: newtheme.palette.secondary.background,
                      },
                    }}
                  >
                    Clear OutPut
                  </Button>
                </Box>
                <h3 style={{ color: newtheme.palette.primary.background }}>
                  Input:
                </h3>
                <Box sx={{ flex: "50%" }}>
                  <textarea
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      height: "100%",
                      resize: "none",
                      backgroundColor: "#242424",
                      color: "whitesmoke",
                      padding: "5px",
                    }}
                    onChange={(e) => setUserInput(e.target.value)}
                  ></textarea>
                </Box>
                <h3 style={{ color: newtheme.palette.primary.background }}>
                  Output:
                </h3>
                {loading ? (
                  <Box
                    sx={{
                      flex: "50%",
                      backgroundColor: "#242424",
                      overflowY: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BounceLoader
                      size={120}
                      color="#d90700"
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      flex: "50%",
                      backgroundColor: "#242424",
                      overflowY: "auto",
                      color: "white",
                      position: "relative",
                    }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap" }}>{userOutput}</pre>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Compile;
