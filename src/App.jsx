import React, { useEffect, useState } from "react"
// import { getExecLogs } from "./DTRManagementRequests"
import "./table.css"
import { fakeResponse2 } from "./fakeData"
import { groupByDevice } from "./process"
import CustomStack from "./CustomStack"
import { useBio } from "./context/BioManageProvider"
import CustomSelectBio from "./components/CustomSelectBio"
import CustomTableBio from "./components/CustomTableBio"
import CustomFab from "./components/CustomFab"
import CustomAutoComplete from "./components/CustomAutoComplete"
import CustomManualReExec from "./components/CustomManualReExec"

function App() {
  const [loading, setLoading] = useState(false)
  const { getExecData } = useBio()

  return (
    <div>
      <CustomAutoComplete />
      <CustomManualReExec />
      <CustomTableBio />
      <CustomFab />
    </div>
  )
}

export default App
