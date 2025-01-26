import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useBio } from "../context/BioManageProvider"

export default function CustomSelectBio() {
  const { getExecData, selectDevice, setSelectDevice } = useBio()
  const [age, setAge] = React.useState("")

  const handleChange = (event) => {
    setSelectDevice(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectDevice ? selectDevice : ""}
          label="Age"
          onChange={handleChange}
        >
          {getExecData &&
            getExecData.map((item, index) => (
              <MenuItem key={index} value={item.device_id}>
                {item.device_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  )
}
