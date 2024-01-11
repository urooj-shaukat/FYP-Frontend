import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const SimilarityResult = ({
  similarityPercentage,
  fileAContent,
  similarContent,
  stuName,
  currQuestion,
}) => {
  const [highlightedContent, setHighlightedContent] = useState("");

  const highlightSimilarContent = () => {
    const contentWords = fileAContent.match(/(\S+|\s)/g) || [];
    const similarWords = similarContent.match(/(\S+|\s)/g) || [];

    const highlightedWords = contentWords.map((word, index) => {
      const isWhitespace = /\s/.test(word);

      if (isWhitespace) {
        return <React.Fragment key={index}>{word}</React.Fragment>;
      }

      const space = index < contentWords.length - 1 ? " " : "";

      if (similarWords.includes(word.trim())) {
        return (
          <React.Fragment key={index}>
            <span style={{ color: "red" }}>{word}</span>
            {space}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={index}>
          <span>{word}</span>
          {space}
        </React.Fragment>
      );
    });

    setHighlightedContent(highlightedWords);
  };

  React.useEffect(() => {
    highlightSimilarContent();
  }, []);

  return (
    <div>
      <Box>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: 45,
            fontSize: 25,
            marginLeft: 9,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span> Q : {currQuestion}</span>
        </p>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          sx={{
            borderColor: "#dbdbdb",
            borderRadius: 5,
            marginRight: 3,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginTop: 4, marginBottom: 4 }}
          >
            <CircularProgress
              style={{ color: "red" }}
              size="5rem"
              color="secondary"
              variant="determinate"
              value={similarityPercentage}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bolder", fontSize: 20 }}>
                {Math.round(similarityPercentage, 3)}%{" "}
              </p>
              <p>Plagiarised</p>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          sx={{
            borderColor: "#dbdbdb",
            borderRadius: 5,
            marginRight: 3,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginTop: 4, marginBottom: 4 }}
          >
            <CircularProgress
              style={{ color: "green" }}
              size="5rem"
              color="secondary"
              variant="determinate"
              value={100 - similarityPercentage}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bolder", fontSize: 20 }}>
                {Math.round(100 - similarityPercentage, 3)}%{" "}
              </p>
              <p>Unique</p>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 6 }}>
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
          <span>Content Checked For Plagiarism</span>
        </p>
      </Box>

      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box>
            <p style={{ fontWeight: "bolder", fontSize: 20 }}>
              Content of file:
            </p>
            <p>{highlightedContent}</p>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
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
          <span>Matched Source</span>
        </p>
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <Box>
            <p style={{ fontWeight: "bold", fontSize: 19 }}>
              Similarity: {similarityPercentage}
            </p>
            <p style={{ fontWeight: "bold", fontSize: 16 }}>
              Similar with Student:{" "}
              <span style={{ color: "blue" }}> {stuName}</span>
            </p>
            <p style={{ fontWeight: "bold", fontSize: 16 }}>
              Similar Content:{" "}
              <span style={{ color: "blue" }}> {similarContent}</span>
            </p>
          </Box>
          <hr
            style={{
              borderTop: "4px solid 	green",
              width: "100%",
              marginBottom: 20,
            }}
          ></hr>
        </Grid>
      </Grid>
    </div>
  );
};

export default SimilarityResult;