import React, { useState, useEffect } from "react";
import SidebarChart from "./SidebarChart";
import { getYearlyData, getNewsMediaLaws } from "../utils/api";
import { ARRESTS_CHART_TITLE, NEWS_MEDIA_LAW_ABOUTS, NEWS_MEDIA_LAW_MAX_DISPLAYED } from "../utils/constants";

type Props = {
  locationInfo: Object,
  range: Array<Number>,
};

const ArrestsSidebar = ({ locationInfo, range }: Props) => {
  const [yearlyData, setYearlyData] = useState([]);
  const [laws, setLaws] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setYearlyData(
        await getYearlyData({
          city: locationInfo.city || "",
          state: locationInfo.state || "",
          time_range: range,
          total_case_count: true,
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
          lawAboutList: [
            NEWS_MEDIA_LAW_ABOUTS.HUMAN_OR_PROSTITUTION,
            NEWS_MEDIA_LAW_ABOUTS.PROSTITUTION,
            NEWS_MEDIA_LAW_ABOUTS.HUMAN,
          ],
          amount: NEWS_MEDIA_LAW_MAX_DISPLAYED
        })) || []
      );
    }

    fetchData();
  }, [locationInfo]);

  return (
    <>
      <SidebarChart
        title={ARRESTS_CHART_TITLE}
        laws={laws}
        arrests={yearlyData}
        arrestsDataLabel={"Arrests"}
        range={range}
      />
    </>
  );
};

export default ArrestsSidebar;
