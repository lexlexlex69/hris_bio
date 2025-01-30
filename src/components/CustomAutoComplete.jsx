import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useBio } from "../context/BioManageProvider";

export default function CustomAutoComplete() {
  const { getExecData, selectDevice, setSelectDevice } = useBio();

  const defaultProps = {
    options: getExecData,
    getOptionLabel: (option) => option.device_name,
  };

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={selectDevice}
        onChange={(event, newValue) => {
          setSelectDevice(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Devices" variant="outlined" />
        )}
      />
    </Stack>
  );
}
