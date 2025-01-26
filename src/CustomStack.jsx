import * as React from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import { CustomCenterModal } from "./CustomCenterModal"
import { Button, useMediaQuery } from "@mui/material"
import CustomAccordion from "./CustomAccordion"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))
export default function CustomStack({ items }) {
  const [open, setOpen] = React.useState(false)
  const [openData, setOpenData] = React.useState([])

  const handleRowClick = (data) => {
    console.log(data)
    setOpen(true)
    setOpenData(data)
  }
  const handleCloseModal = () => {
    setOpen(false)
    setOpenData([])
  }
  return (
    <Box sx={{ width: "100%" }}>
      <CustomModalDisplay
        openner={open}
        comptitle={"asdfasdf"}
        handleCloseBTN={handleCloseModal}
        data={openData}
      />
      <Stack spacing={1}>
        {items &&
          items.map((item, index) => (
            <Item key={index} onClick={() => handleRowClick(item.data)}>
              {item.device_id} {item.device_name}
            </Item>
          ))}
      </Stack>
    </Box>
  )
}

function CustomModalDisplay({ openner, comptitle, handleCloseBTN, data }) {
  const matches = useMediaQuery("(min-width: 565px)")
  console.log(data)
  return (
    <CustomCenterModal
      key={"open1"}
      compSize={"40%"}
      matches={matches}
      openner={openner}
      comptitle={comptitle}
      handleCloseBTN={handleCloseBTN}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box>
          <CustomAccordion data={data ? data : []} />
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
