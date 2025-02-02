import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import { useBio } from "../context/BioManageProvider"
import { monthList, yearlist } from "../utils/datetimeformat"

export default function CustomAutoComplete() {
  const { getExecData, selectDevice, setSelectDevice, date, setDate } = useBio()

  const defaultPropsYear = {
    options: yearlist,
    getOptionLabel: (option) => option.toString(),
  }
  const defaultPropsMonth = {
    options: monthList,
    getOptionLabel: (option) => option.label,
  }
  const defaultProps = {
    options: getExecData,
    getOptionLabel: (option) => option.device_name,
  }

  return (
    <Stack direction="row" spacing={1} sx={{ width: "auto" }}>
      <Autocomplete
        sx={{ width: "180px" }}
        {...defaultPropsMonth}
        id="controlled-demo"
        value={date?.month}
        onChange={(event, newValue) => {
          setDate((prev) => ({ ...prev, month: newValue }))
        }}
        renderInput={(params) => (
          <TextField {...params} label="Month" variant="outlined" />
        )}
      />
      <Autocomplete
        sx={{ width: "180px" }}
        {...defaultPropsYear}
        id="controlled-demo"
        value={date?.year}
        onChange={(event, newValue) => {
          setDate((prev) => ({ ...prev, year: newValue }))
        }}
        renderInput={(params) => (
          <TextField {...params} label="Year" variant="outlined" />
        )}
      />
      <Autocomplete
        sx={{ width: "300px" }}
        {...defaultProps}
        id="controlled-demo"
        value={selectDevice ? selectDevice : null}
        onChange={(event, newValue) => {
          setSelectDevice(newValue)
        }}
        renderInput={(params) => (
          <TextField {...params} label="Devices" variant="outlined" />
        )}
      />
    </Stack>
  )
}
