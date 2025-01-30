import { Backdrop, Box, Fab, Modal, Typography } from "@mui/material"
import { forwardRef, Fragment, useEffect, useState } from "react"
import {
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  Draw as DrawIcon,
  Article as ArticleIcon,
  Edit as EditIcon,
  Chair as ChairIcon,
  Delete as DeleteIcon,
  RestartAlt as RestartAltIcon,
  Preview as PreviewIcon,
  Cached as CachedIcon,
} from "@mui/icons-material"
import { red } from "@mui/material/colors"
const colorRed = red[500]

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "0px",
}

export function CustomCenterModal({
  children,
  matches,
  openner,
  handleCloseBTN,
  comptitle,
  compSize,
}) {
  return (
    <Modal
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: matches ? (matches === "" ? matches : "65%") : "100%",
          height: "100vh",
          margin: "0",
        },
        borderRadius: "5px!important",
        border: "1px solid black",
      }}
      open={openner}
      onClose={handleCloseBTN}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Box sx={{ ...modalStyle, width: matches ? compSize : "100%" }}>
        {comptitle === "" ? (
          <></>
        ) : (
          <>
            <Box
              sx={{
                background: "rgb(21, 101, 192)",
                padding: "14px 8px",
                color: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {" "}
                {comptitle ? comptitle : ""}{" "}
              </Typography>
              <Box sx={{ flex: "1 1 auto" }} />
              <Box>
                <Fab
                  color="default"
                  aria-label="add"
                  size="small"
                  onClick={handleCloseBTN}
                >
                  <CloseIcon sx={{ fontSize: "1.35rem" }} />
                </Fab>
              </Box>
            </Box>
          </>
        )}
        <Box
          sx={{ p: 2, overflowY: "scroll", maxHeight: "calc(100vh - 20vh)" }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  )
}
