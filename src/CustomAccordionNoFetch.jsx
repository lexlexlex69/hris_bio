import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Divider, Typography } from "@mui/material";
import CustomSubTable from "./components/CustomSubTable";
import { formatDate } from "./utils/datetimeformat";

export default function CustomAccordionNoFetch({ data }) {
  console.log(data);
  const handleButtonClick = (event, device_id, dates) => {
    event.stopPropagation(); // Prevents accordion expansion
    const payload = [
      {
        device_id,
        datestart: dates[0],
        dateend: dates[dates.length - 1],
      },
    ];
    console.log(payload);
    // console.log(`Reload clicked for device: ${deviceId}`);
  };
  return (
    <>
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item.device_name}
              <Button
                variant="contained"
                onClick={(event) =>
                  handleButtonClick(event, item.device_id, item.noFetchedDates)
                }
                onFocus={(event) => event.stopPropagation()} // Prevents expansion when tabbing to the button
              >
                Reload
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {item.data.map((item, index) => (
              <>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      padding: "10px 5px",
                      borderRadius: "5px",
                      width: "50%",
                    }}
                  >
                    {formatDate(item.datestart)}
                  </Typography>
                  <Typography
                    sx={{
                      padding: "10px 5px",
                      borderRadius: "5px",
                      width: "50%",
                    }}
                  >
                    {"Attempts: "}
                    {item.Success + item.Failed + item.Warning}
                  </Typography>
                </Box>
                {!(index == item?.data?.length - 1) && <Divider />}
              </>
            ))}
          </AccordionDetails>
          {/* <AccordionDetails>
            <CustomSubTable data={item.data} />
            {item.data.map((item) => (
              <>
                <Typography>
                  <p>
                    Date: {item.datestart} Attempts:{" "}
                    {item.Success + item.Failed}
                  </p>
                </Typography>
              </>
            ))}
          </AccordionDetails> */}
        </Accordion>
      ))}
    </>
  );
}
