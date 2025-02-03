import { createContext, useContext, useEffect, useState } from "react";
import { filterData, groupByDevice } from "../process";
import { fakeResponse2 } from "../fakeData";
import { currentMonth, currentYear, monthList } from "../utils/datetimeformat";
import { getExecLogs, reExec } from "../utils/requests";

const BioStateContext = createContext();

export const BioContextProvider = ({ children }) => {
  const [date, setDate] = useState({
    month: null,
    year: null,
  });
  console.log(date);
  const [getExecData, setGetExecData] = useState();
  const [selectDevice, setSelectDevice] = useState(null);
  const [displayData, setDisplayData] = useState();
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  if (!date?.month && !date?.month) {
    const currentMonthConvert = monthList.find(
      (item) => item.id == currentMonth
    );
    setDate({
      month: currentMonthConvert,
      year: currentYear,
    });
  }

  const handleTableRowClick = (date) => {
    setOpen(true);
  };

  const modalOpener = (title, dates) => {
    setOpen(true);
    setModalTitle(title);
    if (title === "Execution Log") {
      const toModal = displayData?.data.find((item) => item.datestart == dates);
      console.log("toModal", toModal);
      setModalData(toModal);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setModalTitle("");
    setModalData([]);
  };

  const handleDisplay = () => {
    const toDisplay = getExecData?.find(
      (item, index) => item.device_id == selectDevice?.device_id
    );
    console.log("toDisplay", toDisplay);
    setDisplayData(toDisplay);
  };
  const notificationData = getExecData
    ?.filter((item) => item.noFetchedDates.length != 0)
    .map((item) => ({
      ...item,
      data: item.data.filter((item) => item.Success === 0),
    }));

  const handleReExec = async (payload) => {
    // console.log("payload", payload);
    reExec(payload)
      .then((response) => {
        console.log("responseapi", response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setSelectDevice(null);
    // setGetExecData(groupByDevice(fakeResponse2))
    date?.month &&
      date?.month &&
      getExecLogs({
        datestart: `${date.year}-${date.month.id}-01`,
        dateend: `${date.year}-${date.month.id}-31`,
      })
        .then((response) => {
          console.log("responseapi", response);
          console.log("responseapiconverted", groupByDevice(response.data));
          setGetExecData(groupByDevice(response.data));
        })
        .catch((err) => console.log(err));
  }, [date]);

  return (
    <BioStateContext.Provider
      value={{
        date,
        setDate,
        getExecData,
        selectDevice,
        setSelectDevice,
        displayData,
        handleTableRowClick,
        handleCloseModal,
        modalData,
        open,
        modalTitle,
        modalOpener,
        notificationData,
        handleDisplay,
        handleReExec,
      }}
    >
      {children}
    </BioStateContext.Provider>
  );
};

export const useBio = () => useContext(BioStateContext);
