import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useBio } from "../context/BioManageProvider";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { CustomCenterModal } from "../CustomCenterModal";
import CustomAccordion from "../CustomAccordion";

export default function CustomTableBio() {
  const {
    displayData,
    modalTitle,
    modalData,
    handleCloseModal,
    open,
    modalOpener,
  } = useBio();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  const columns = [
    {
      field: "Device Name",
      headerName: "Device name",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      // width: "auto",
      flex: 1,
      valueGetter: (value, row) => `${row.logs[0].device_name} `,
    },
    {
      field: "datestart",
      headerName: "Date",
      // width: 100,
      flex: 1,
      disableClickEventBubbling: true,
      valueGetter: (value, row) => `${formatDate(row.datestart)} `,
    },
    {
      field: "Success",
      headerName: "Success",
      // width: 130,
      flex: 0.5,
      disableClickEventBubbling: true,
    },
    {
      field: "Failed",
      headerName: "Failed",
      // width: 130,
      flex: 0.5,
      disableClickEventBubbling: true,
    },
    {
      field: "Warning",
      headerName: "Warning",
      // width: 130,
      flex: 0.5,
      disableClickEventBubbling: true,
    },
    {
      field: "totalFetched",
      headerName: "Total fetch",
      // width: 130,
      flex: 0.5,
      disableClickEventBubbling: true,
    },
    {
      field: "action",
      headerName: "Action",
      // width: 180,
      sortable: false,
      flex: 0.5,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          currentRow && modalOpener("table", currentRow.datestart);
          // return alert(JSON.stringify(currentRow, null, 4))
        };

        return (
          <Box>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClick}
            >
              Open
            </Button>
          </Box>
        );
      },
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    // },
  ];
  const row = displayData && displayData.data;
  function getRowId(row) {
    return row.datestart;
  }

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <CustomModalDisplay
        openner={open}
        comptitle={"table"}
        handleCloseBTN={handleCloseModal}
        data={modalData}
        modalTitle={modalTitle}
      />
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <DataGrid
          rows={row}
          getRowId={getRowId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          // checkboxSelection
        />
      </div>
    </div>
  );
}

function CustomModalDisplay({
  openner,
  comptitle,
  handleCloseBTN,
  data,
  modalTitle,
}) {
  const matches = useMediaQuery("(min-width: 565px)");
  console.log(data);
  return (
    <CustomCenterModal
      key={"open1"}
      compSize={"40%"}
      matches={matches}
      openner={openner && modalTitle === "table"}
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
  );
}
