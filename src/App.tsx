import React, { useState } from "react";
import axios from "axios";

import {
  createTheme,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  ThemeProvider, // ThemeProvider 추가
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";

const theme = createTheme({
  typography: {
    h4: {
      fontFamily: "sans-serif",
    },
  },
});

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const content = String(event.target?.result);
      setText(content);
      setIsEditing(true);
    };

    reader.readAsText(file);
  };

  const handleSummarize = async () => {
    const apiUrl = "http://34.64.124.183:8000/api";
    console.log("request sent");
    try {
      const response = await axios.get(apiUrl, {
        params: {
          text: text,
        },
      });

      // Handle the response data as needed
      setSummary(response.data);
      setIsEditing(true);
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error");
    }
  };

  // setSummary("SUMMARIZED TEXT of [" + text + "]");

  const handleSave = () => {
    window.alert("summarization successfully saved!");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom margin="50px">
          자동 상담 요약
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ paddingTop: "2px" }}>
              <Box
                display="flex"
                justifyContent="flex-end"
                margin="5px"
                height="35px"
              >
                {/* <Typography>상담 원본</Typography> */}
                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <FileUploadIcon /> Upload text file
                </label>
              </Box>
              <TextField
                multiline
                fullWidth
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ paddingTop: "2px" }}>
              <Box
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                margin="5px"
                height="35px"
              >
                {/* <Typography>자동 요약</Typography> */}
                <SaveIcon
                  sx={{ marginRight: "8px" }}
                  onClick={handleSave} // SaveIcon에 onClick 추가
                />
                Save summarization
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <TextField
                  multiline
                  fullWidth
                  rows={10}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </Box>
            </Paper>
          </Grid>
          <Button
            variant="contained"
            style={{ marginTop: "16px", backgroundColor: "#01B377" }} // 원하는 색상 지정
            onClick={handleSummarize}
          >
            Generate Summarization
          </Button>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
