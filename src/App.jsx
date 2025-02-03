import React, { useEffect, useState } from "react";
// import { getExecLogs } from "./DTRManagementRequests"
import "./table.css";
import { fakeResponse2 } from "./fakeData";
import { groupByDevice } from "./process";
import CustomStack from "./CustomStack";
import { useBio } from "./context/BioManageProvider";
import CustomSelectBio from "./components/CustomSelectBio";
import CustomTableBio from "./components/CustomTableBio";
import CustomFab from "./components/CustomFab";
import CustomAutoComplete from "./components/CustomAutoComplete";
import CustomManualReExec from "./components/CustomManualReExec";
import { Box, Button } from "@mui/material";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use((config) => {
  const token = "178532|N2iLg8yqQq83vZMottdVXPisyPwbIHDX4eFGj1PC";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  const { handleDisplay } = useBio();

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            margin: "15px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <CustomAutoComplete />
            <Button variant="contained" onClick={handleDisplay} size="small" se>
              Display
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <CustomManualReExec />
            <CustomFab />
          </Box>
        </Box>
        <CustomTableBio />
      </Box>
    </Box>
  );
}

export default App;
