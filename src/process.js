export const filterData = (arr, type) => {
  if (type === 0) {
    return arr
  }
  if (type === 1) {
    const result = arr.filter((item) => item.datestart !== item.dateend)
    console.log("result", result)
    return result
  }

  if (type === "show0status") {
    const result = arr.filter((item) => item.status == 0)
    console.log("result", result)
    return result
  }
}

const fetchedExtractor = (obj) => {
  let initialValue = 0
  // console.log("obj", obj)
  if (obj.description.includes("Success")) {
    const match = obj.description.match(/There are (\d+) data fetched/)
    // obj.id === "9172" && console.log("match", match)
    initialValue = initialValue + (match ? parseInt(match[1]) : 0)
  }
  return initialValue
}

export const groupByDevice = (data) => {
  //   console.log("stringify", JSON.stringify(data));
  const grouped = data.reduce((acc, item) => {
    const device_id = item.device_id.trim()
    const device_name = item.device_name.trim()
    const datestart = item.datestart
    const dateend = item.dateend
    const existingGroup = acc.find((group) => group.device_id === device_id)
    if (existingGroup) {
      const existingDate = existingGroup.data.findIndex(
        (group) => group.datestart === datestart
      )
      if (existingDate >= 0) {
        if (item.description.includes("Success")) {
          existingGroup.data[existingDate].Success =
            existingGroup.data[existingDate].Success + 1
        }
        if (item.description.includes("Warning")) {
          existingGroup.data[existingDate].Warning =
            existingGroup.data[existingDate].Warning + 1
        }
        if (item.description.includes("Failed")) {
          existingGroup.data[existingDate].Failed =
            existingGroup.data[existingDate].Failed + 1
        }
        existingGroup.data[existingDate].totalFetched =
          existingGroup.data[existingDate].totalFetched + fetchedExtractor(item)
        existingGroup.data[existingDate].logs.push(item)
      } else {
        existingGroup.data.push({
          datestart,
          logs: [item],
          Success: item.description.includes("Success") ? 1 : 0,
          Warning: item.description.includes("Warning") ? 1 : 0,
          Failed: item.description.includes("Failed") ? 1 : 0,
          totalFetched: fetchedExtractor(item),
        })
      }
    } else {
      acc.push({
        device_id,
        device_name,
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
      })
    }

    return acc
  }, [])
  return grouped
}
