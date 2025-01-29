import * as React from "react"
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant"
import { Badge, Button, useMediaQuery } from "@mui/material"
import { useBio } from "../context/BioManageProvider"
import { CustomCenterModal } from "../CustomCenterModal"
import CustomAccordion from "../CustomAccordion"
import CustomAccordionNoFetch from "../CustomAccordionNoFetch"

export default function CustomFab() {
  const { notificationData, handleCloseModal, open, modalTitle, modalOpener } =
    useBio()
  console.log("notificationData", notificationData)

  const notificationTotalCount = notificationData?.reduce(
    (acc, curr) => acc + curr.noFetchedDates.length,
    0
  )
  return (
    <>
      <CustomModalNoFetch
        openner={open}
        modalTitle={modalTitle}
        comptitle={"asdfasdf"}
        handleCloseBTN={handleCloseModal}
        data={notificationData}
      />
      <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            modalOpener("nofetch")
          }}
        >
          <Badge badgeContent={notificationTotalCount} color="error">
            <NotificationImportantIcon sx={{ margin: "10px" }} />
          </Badge>
        </Fab>
      </Box>
    </>
  )
}

function CustomModalNoFetch({
  openner,
  modalTitle,
  comptitle,
  handleCloseBTN,
  data,
}) {
  const matches = useMediaQuery("(min-width: 565px)")
  console.log(data)
  return (
    <CustomCenterModal
      key={"open1"}
      compSize={"40%"}
      matches={matches}
      openner={openner && modalTitle === "nofetch"}
      comptitle={comptitle}
      handleCloseBTN={handleCloseBTN}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box>
          sdfsdf
          <CustomAccordionNoFetch data={data ? data : []} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text" onClick={handleCloseBTN}>
            Cancel
          </Button>
        </Box>
      </Box>
    </CustomCenterModal>
  )
}
