import React, { useState, useEffect } from "react";
import SidebarChart from "./SidebarChart";
import { getYearlyData } from "../utils/api";

type Props = {
  chartTitle: String,
  locationInfo: Object,
  range: Array<Number>,
};

const MassageParlorSidebar = ({ chartTitle, locationInfo, range }: Props) => {
  const [yearlyIncidents, setYearlyIncidents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setYearlyIncidents(
        await getYearlyData({
          state: locationInfo.state || "",
          city: locationInfo.city || "",
          time_range: range,
          focus: "Massage Parlor Trafficking",
          total_case_count: true,
        })
      );
    }

    fetchData();
  }, [locationInfo, range]);

  return (
    <>
      <SidebarChart
        title={chartTitle}
        laws={[]}
        arrests={yearlyIncidents}
        arrestsDataLabel={"Incidents"}
        range={range}
      />
    </>
  );
};

export default MassageParlorSidebar;
