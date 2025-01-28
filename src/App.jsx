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

function App() {
  const [loading, setLoading] = useState(false)
  const { getExecData } = useBio()

  return (
    <div>
      <CustomSelectBio />
      {/* <CustomStack items={getExecData} /> */}
      <CustomTableBio />
      <CustomFab/>
    </div>
  )
}

export default App
