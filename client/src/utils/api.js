// @flow
const axios = require("axios");

const instance = axios.create({
  // baseURL: "https://collective-liberty.vercel.app/api",
  baseURL: "http://localhost:5000/api",
});

export const getIncidentsByState = (state) => {
  const requestString = `/incidents?state=${state}`;
  return instance.get(requestString).then(
    (res) => res.data.response.items,
    (err) => {
      console.error(err);
      return null;
    }
  );
};

export const getIncidents = (params) => {
  const requestExtension = "/incidents";
  return instance.get(requestExtension, { params }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );
};

export const getAllIncidents = (params) => {
  const requestExtension = "/allIncidents";
  return instance.get(requestExtension, { params }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );
};

export const getArrestData = (data) => {
  const requestURL = `/arrests/stats?city=${data.city}&state=${data.state}&time_range=${data.range[0]},${data.range[1]}`;

  return instance
    .get(requestURL)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);

      return null;
    });
};

export const getCriminalLaws = (data) => {
  let requestURL = `/policies/criminalLaws`;
  if (data?.state && typeof data.state === "string") {
    requestURL = `/policies/criminalLaws?stateTerritory=${data.state}`;
  }
  return instance
    .get(requestURL)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);

      return null;
    });
};

type GetMassageParlorLawsParams = {
  state: String,
  city: String,
};

export const getMassageParlorLaws = (params: GetMassageParlorLawsParams) => {
  const requestExtension = "/policies/massageLaws";
  return instance
    .get(requestExtension, { params })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

type GetYearlyDataParams = {
  state: String,
  city: String,
  time_range: Array<Number>,
  focus: String,
  total_case_count: Boolean,
};

export const getYearlyData = (params: GetYearlyDataParams) => {
  const requestURL = "/arrests/yearlyData";

  return instance
    .get(requestURL, { params })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);

      return null;
    });
};

export const sendFileData = (formData) => {
  const requestURL = "/csvUpload";
  return instance
    .post(requestURL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
