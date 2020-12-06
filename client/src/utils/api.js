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

export const getYearlyData = (data) => {
  const requestURL = `/arrests/yearlyData?city=${data.city}&state=${data.state}&time_range=${data.range[0]},${data.range[1]}`;

  return instance
    .get(requestURL)
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
export const getUserRole = () => get("/getUserRole").then((data) => data.role);
export const getUsers = () => get("/users");
