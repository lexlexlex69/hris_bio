import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import { formatDate, formatDateTime } from "./utils/datetimeformat";
import { useBio } from "./context/BioManageProvider";

export default function CustomAccordionReExec({ data }) {
  const { getExecData } = useBio();
  console.log("deviceszz", data);
  return (
    <div>
      {data?.map((item, index) => (
        <Accordion key={index} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={item.datestart}
            id={item.datestart}
          >
            <Typography>
              {
                getExecData?.find((dat) => item.device_id == dat.device_id)
                  .device_name
              }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.dates.map((date) => (
              <Typography>{formatDate(date)}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
