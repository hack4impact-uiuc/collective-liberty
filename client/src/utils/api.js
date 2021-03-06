// @flow
const axios = require("axios");

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_TEST_API_HOSTNAME || ""}/api`,
  withCredentials: true,
});

export const formatAPILink = (extension) =>
  `${process.env.REACT_APP_TEST_API_HOSTNAME || ""}/api${extension}`;

export const get = (extension, params) =>
  instance.get(extension, { params }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );

export const post = (extension, params, config) =>
  instance
    .post(extension, params || {}, config || {})
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });

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

export const login = () => get("/login");
export const logout = () => post("/logout");
export const getUserRole = () =>
  get("/getUserRole").then((data) => data && data.role);
export const getUsers = () => get("/users");
export const deleteUsers = (ids) => post("/users/delete", { ids });
export const getVacaturLaws = (params) => get("/policies/vacaturLaws", params);
export const getMassageLaws = () => get("/policies/massageLaws");
export const getNewsMediaLaws = (params) =>
  get("/policies/newsMediaLaws", params);

export const updateUserRoles = (userIdToRoles) =>
  post("/users/updateRoles", { id_to_roles: userIdToRoles });

export const getDataFiles = () => get("/dataFiles");
export const deleteDataFile = (_id) => post("/dataFiles", { _id });
