import { createContext, useContext, useEffect, useState } from "react"
import { filterData, groupByDevice } from "../process"
import { fakeResponse2 } from "../fakeData"

const BioStateContext = createContext()

export const BioContextProvider = ({ children }) => {
  const [getExecData, setGetExecData] = useState()
  const [selectDevice, setSelectDevice] = useState()
  const [displayData, setDisplayData] = useState()
  const [modalData, setModalData] = useState()
  const [open, setOpen] = useState(false)

  const handleTableRowClick = (date) => {
    setOpen(true)
    const toModal = displayData?.data.find((item) => item.datestart == date)
    console.log("toModal", toModal)
    setModalData(toModal)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setModalData([])
  }

  useEffect(() => {
    const toDisplay = getExecData?.find(
      (item, index) => item.device_id == selectDevice
    )
    console.log("toDisplay", toDisplay)
    setDisplayData(toDisplay)
  }, [selectDevice])

  useEffect(() => {
    // setLoading(true);
    // /// --------------     less than or equal || greater than or equal
    // getExecLogs({ datestart: "2024-10-11", dateend: "2024-10-21" })
    //   .then((response) => {
    //     // console.log("response.data", response.data);
    //     const filteredExec = response?.data && filterData(response.data, 2);
    //     setGetExecData(filteredExec);
    //     // setGetExecData(response.data);
    //     response?.data &&
    //       console.log("groupfilteredExec", groupByDevice(response.data));
    //     // console.log("filteredExec", filteredExec);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
    // const filteredExec = filterData(fakeResponse2, 0)
    // setGetExecData(filteredExec)
    console.log("groupfilteredExec", groupByDevice(fakeResponse2))
    // console.log("show0status", filterData(fakeResponse2, "show0status"))
    setGetExecData(groupByDevice(fakeResponse2))
  }, [])

  return (
    <BioStateContext.Provider
      value={{
        getExecData,
        selectDevice,
        setSelectDevice,
        displayData,
        handleTableRowClick,
        handleCloseModal,
        modalData,
        open,
      }}
    >
      {children}
    </BioStateContext.Provider>
  )
}

export const useBio = () => useContext(BioStateContext)
