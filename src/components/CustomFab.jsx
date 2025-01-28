import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { Badge, Button, useMediaQuery } from '@mui/material';
import { useBio } from '../context/BioManageProvider';
import { CustomCenterModal } from '../CustomCenterModal';
import CustomAccordion from '../CustomAccordion';

export default function CustomFab() {

    const {notificationData,   handleCloseModal,
        open,} = useBio()
    console.log('notificationData', notificationData)

    const notificationTotalCount =  notificationData?.reduce((acc, curr) => acc + curr.noFetchedDates.length, 0)
  return (
    <>
    <CustomModalNoFetch
     openner={open}
     comptitle={"asdfasdf"}
     handleCloseBTN={handleCloseModal}
    />
    <Box sx={{ position: 'fixed', bottom:'10px', right: '10px' }}>
      <Fab color="primary" aria-label="add">
      <Badge badgeContent={notificationTotalCount} color="error"  >
        <NotificationImportantIcon sx={{margin: '10px'}}/>
</Badge>
      </Fab>
      
    </Box>
    </>
  );
}

function CustomModalNoFetch({ openner, comptitle, handleCloseBTN, data }) {
    const matches = useMediaQuery("(min-width: 565px)");
    console.log(data);
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
    );
  }
