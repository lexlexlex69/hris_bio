import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"

export default function CustomAccordion({ data }) {
  return (
    <div>
      {data &&
        data.map((item, index) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={item.datestart}
              id={item.datestart}
            >
              {item.datestart}
            </AccordionSummary>
            <AccordionDetails>
              {item.logs &&
                item.logs.map((item, index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={item.id}
                      id={item.id}
                    >
                      {item.id}
                    </AccordionSummary>
                    <AccordionDetails>sdfsdfsdfsfsdf</AccordionDetails>
                  </Accordion>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  )
}
