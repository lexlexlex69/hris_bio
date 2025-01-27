import { fakeResponse2 } from "./fakeData";

export const filterData = (arr, type) => {
  if (type === 0) {
    return arr;
  }
  if (type === 1) {
    const result = arr.filter((item) => item.datestart !== item.dateend);
    console.log("result", result);
    return result;
  }

  if (type === "show0status") {
    const result = arr.filter((item) => item.status == 0);
    console.log("result", result);
    return result;
  }
};

const fetchedExtractor = (obj) => {
  let initialValue = 0;
  // console.log("obj", obj)
  if (obj.description.includes("Success")) {
    const match = obj.description.match(/There are (\d+) data fetched/);
    // obj.id === "9172" && console.log("match", match)
    initialValue = initialValue + (match ? parseInt(match[1]) : 0);
  }
  return initialValue;
};

// const noFetchCount = (currentCount, obj) => {
//   const fetched = fetchedExtractor(obj)

//     currentCount =  fetched? 0 : currentCount  += 1

//   return currentCount
// }

export const groupByDevice = (data) => {
  //   console.log("stringify", JSON.stringify(data));
  const grouped = data.reduce((acc, item) => {
    const device_id = item.device_id.trim();
    const device_name = item.device_name.trim();
    const datestart = item.datestart;
    const dateend = item.dateend;
    const existingGroup = acc.find((group) => group.device_id === device_id);
    const existingDate =
      existingGroup &&
      existingGroup.data.findIndex((group) => group.datestart === datestart);
    const ifExistNoFetched =
      existingGroup &&
      existingGroup.noFetchDateCount.find((item) => item === datestart);
    if (existingGroup) {
      if (existingDate >= 0) {
        if (item.description.includes("Success")) {
          existingGroup.data[existingDate].Success += 1;
        }
        if (item.description.includes("Warning")) {
          existingGroup.data[existingDate].Warning += 1;
        }
        if (item.description.includes("Failed")) {
          existingGroup.data[existingDate].Failed += 1;
        }
        existingGroup.data[existingDate].totalFetched += fetchedExtractor(item);
        existingGroup.data[existingDate].logs.push(item);

        // console.log(existingGroup);
        if (existingGroup.data[existingDate].totalFetched != 0) {
          if (existingGroup.data[existingDate].totalFetched > 0) {
            const updatedData = existingGroup.noFetchDateCount.filter(
              (item) => item === datestart
            );
            existingGroup.noFetchDateCount = updatedData;
          }
        }
        // if (
        //   existingGroup.data[existingDate].totalFetched == 0 &&
        //   !ifExistNoFetched
        // ) {
        //   existingGroup.noFetchDateCount.push(datestart);
        // }
        /////////////////
        // if (existingGroup.data[existingDate].totalFetched > 0) {
        //   console.log("asdf");
        //   const updatedData = existingGroup.noFetchDateCount.filter(
        //     (item) => item === datestart
        //   );
        //   // console.log("updatedData", updatedData);
        //   existingGroup.noFetchDateCount = updatedData;
        // } else {
        //   if (
        //     fetchedExtractor(item) == 0 &&
        //     !existingGroup.noFetchDateCount.find((item) => item === datestart)
        //   )
        //     existingGroup.noFetchDateCount.push(datestart);
        // }
      } else {
        existingGroup.data.push({
          datestart,
          logs: [item],
          Success: item.description.includes("Success") ? 1 : 0,
          Warning: item.description.includes("Warning") ? 1 : 0,
          Failed: item.description.includes("Failed") ? 1 : 0,
          totalFetched: fetchedExtractor(item),
        });
      }
    } else {
      acc.push({
        device_id,
        device_name,
        noFetchDateCount: fetchedExtractor(item) ? [] : [datestart],
        data: [
          {
            datestart,
            logs: [item],
            Success: item.description.includes("Success") ? 1 : 0,
            Warning: item.description.includes("Warning") ? 1 : 0,
            Failed: item.description.includes("Failed") ? 1 : 0,
            totalFetched: fetchedExtractor(item),
          },
        ],
      });
    }

    return acc;
  }, []);
  return grouped;
};

const groupedData = fakeResponse2.reduce((acc, curr) => {
  // Find or create an entry for the current device
  let deviceEntry = acc.find((item) => item.device_id === curr.device_id);

  if (!deviceEntry) {
    deviceEntry = {
      device_id: curr.device_id,
      device_name: curr.device_name,
      data: [],
    };
    acc.push(deviceEntry);
  }

  // Find or create an entry for the current date
  let dateEntry = deviceEntry.data.find(
    (item) => item.datestart === curr.datestart
  );

  if (!dateEntry) {
    dateEntry = {
      datestart: curr.datestart,
      logs: [],
      Success: 0,
      Warning: 0,
      Failed: 0,
      totalFetched: 0,
    };
    deviceEntry.data.push(dateEntry);
  }

  // Add log and update counts
  const fetchedCount = curr.description.match(
    /(\d+) data fetched successfully/
  )?.[1];
  if (curr.status === "1") {
    dateEntry.Success++;
    dateEntry.totalFetched += fetchedCount ? parseInt(fetchedCount, 10) : 0;
  } else if (curr.status === "0") {
    dateEntry.Failed++;
  }

  dateEntry.logs.push(curr);

  return acc;
}, []);
console.log("groupedData", groupedData);
