import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

export default function CustomAccordionNoFetch({ data }) {
  console.log(data);
  const handleButtonClick = (event, deviceId) => {
    event.stopPropagation(); // Prevents accordion expansion
    console.log(`Reload clicked for device: ${deviceId}`);
  };
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
            <Button
              onClick={(event) => handleButtonClick(event, item.device_id)}
              onFocus={(event) => event.stopPropagation()} // Prevents expansion when tabbing to the button
            >
              Reload
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            {item.data.map((item) => (
              <>
                <p>{item.datestart}</p>
                <p>{item.Success + item.Failed}</p>
              </>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
