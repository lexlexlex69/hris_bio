import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useBio } from "../context/BioManageProvider";
import { Typography } from "@mui/material";
import CustomAccordionReExec from "../CustomAccordionReExec";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialogReExec() {
  const { reExecDialog, handleClosereExecDialog, reExecPayload, handleReExec } =
    useBio();
  console.log("devices", reExecPayload);
  return (
    <React.Fragment>
      <Dialog
        open={reExecDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosereExecDialog}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={"lg"}
        scroll={"paper"}
      >
        <DialogTitle>{"Re-Execute"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {JSON.stringify(reExecPayload)} */}
            <Typography>
              Devices:
              {reExecPayload?.map((item) => (
                <>
                  <CustomAccordionReExec data={[item]} />
                </>
              ))}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReExec}>Proceed</Button>
          <Button onClick={handleClosereExecDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
