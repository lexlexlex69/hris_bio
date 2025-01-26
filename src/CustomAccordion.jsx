import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Box } from "@mui/material"

export default function CustomAccordion({ data }) {
  console.log(data)
  return (
    <div>
      {data?.logs?.map((item, index) => (
        <Accordion
          key={index}
          //  defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={item.datestart}
            id={item.datestart}
          >
            {item.datetime_loaded}
          </AccordionSummary>
          <AccordionDetails>{item.description}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
