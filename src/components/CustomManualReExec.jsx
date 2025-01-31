import {
  Autocomplete,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useBio } from "../context/BioManageProvider";
import { CustomCenterModal } from "../CustomCenterModal";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { format } from "date-fns";

function CustomManualReExec() {
  const { handleCloseModal, open, modalTitle, modalOpener, getExecData } =
    useBio();
  const handleClick = () => {
    modalOpener("manualfetch");
  };
  return (
    <>
      <CustomModalManualReExec
        openner={open}
        modalTitle={modalTitle}
        comptitle={"manual"}
        handleCloseBTN={handleCloseModal}
        // data={notificationData}
        getExecData={getExecData}
      />
      <Button variant="contained" onClick={handleClick}>
        Manual Re-Exec
      </Button>
    </>
  );
}

function CustomModalManualReExec({
  openner,
  modalTitle,
  comptitle,
  handleCloseBTN,
  getExecData,
}) {
  const matches = useMediaQuery("(min-width: 565px)");
  // console.log(data)

  const [payload, setPayload] = useState({
    device_id: null,
    datestart: null,
    dateend: null,
  });

  const defaultProps = {
    options: getExecData,
    getOptionLabel: (option) => option.device_name,
  };

  const handleSubmit = () => {
    const formattedPayload = [
      {
        ...payload,
        device_id: payload.device_id.device_id,
        datestart: payload.datestart
          ? format(payload.datestart, "yyyy-MM-dd")
          : "",
        dateend: payload.dateend ? format(payload.dateend, "yyyy-MM-dd") : "",
      },
    ];

    console.log(formattedPayload);
  };
  return (
    <CustomCenterModal
      key={"open1"}
      compSize={"40%"}
      matches={matches}
      openner={openner && modalTitle === "manualfetch"}
      comptitle={comptitle}
      handleCloseBTN={handleCloseBTN}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={payload.device_id}
              onChange={(event, newValue) => {
                setPayload((prev) => ({
                  ...prev,
                  device_id: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Devices" variant="outlined" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <MobileDatePicker
                  sx={{ flex: 1 }}
                  label="Date Start"
                  inputFormat="MM/DD/YYYY"
                  value={payload.datestart}
                  onChange={(newValue) => {
                    setPayload((prev) => ({ ...prev, datestart: newValue }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  sx={{ flex: 1 }}
                  label="Date End"
                  inputFormat="MM/DD/YYYY"
                  value={payload.dateend}
                  onChange={(newValue) => {
                    setPayload((prev) => ({ ...prev, dateend: newValue }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text" onClick={handleCloseBTN}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Re-Execute
          </Button>
        </Box>
      </Box>
    </CustomCenterModal>
  );
}

export default CustomManualReExec;
