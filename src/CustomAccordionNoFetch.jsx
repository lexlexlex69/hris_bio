import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function CustomAccordionNoFetch({ data }) {
  console.log(data)
  return (
    <div>
      {data?.map((item, index) => (
        <Accordion
          key={index}
          //  defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={item.device_id}
            id={item.device_id}
          >
            {item.device_name}
          </AccordionSummary>
          <AccordionDetails>
            {item.noFetchedDates.map((item) => (
              <p>{item}</p>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
