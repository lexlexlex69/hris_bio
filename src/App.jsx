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
import { Box } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const { getExecData } = useBio();

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            margin: "15px 0px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CustomAutoComplete />
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
