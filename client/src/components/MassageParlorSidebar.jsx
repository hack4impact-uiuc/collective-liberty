import React, { useState, useEffect } from "react";
import SidebarChart from "./SidebarChart";
import { getYearlyData, getNewsMediaLaws } from "../utils/api";
import {
  MASSAGE_LAWS_CHART_TITLE,
  NEWS_MEDIA_LAW_ABOUTS,
} from "../utils/constants";

type Props = {
  locationInfo: Object,
  range: Array<Number>,
};

const MassageParlorSidebar = ({ locationInfo, range }: Props) => {
  const [yearlyData, setYearlyData] = useState([]);
  const [laws, setLaws] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setYearlyData(
        await getYearlyData({
          city: locationInfo.city || "",
          state: locationInfo.state || "",
          time_range: range,
          focuses: ["Massage Parlor Trafficking"],
        })
      );
    }

    fetchData();
  }, [locationInfo, range]);

  useEffect(() => {
    async function fetchData() {
      setLaws(
        (await getNewsMediaLaws({
          city: locationInfo.city || "",
          state: locationInfo.state || "",
          lawAbout: NEWS_MEDIA_LAW_ABOUTS.MASSAGE_PARLOR,
        })) || []
      );
    }

    fetchData();
  }, [locationInfo]);

  return (
    <>
      <SidebarChart
        title={MASSAGE_LAWS_CHART_TITLE}
        laws={laws}
        arrests={yearlyData}
        arrestsDataLabel={"Incidents"}
        range={range}
      />
    </>
  );
};

export default MassageParlorSidebar;
