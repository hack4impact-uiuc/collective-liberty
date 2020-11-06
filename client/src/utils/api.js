const axios = require("axios");

const instance = axios.create({
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

export const getArrestData = (data) => {
  const requestURL = `/arrests?city=${data.city}&state=${data.state}&time_range=${data.range[0]},${data.range[1]}`;

  return instance
    .get(requestURL)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);

      return null;
    });
};

export const sendFileData = (file) => {
  console.log(file);
  const requestURL = "/admin";
  return instance.put(requestURL, { file: file });
  // .then((res) => res.data)
  // .catch((err) => {
  //   console.error(err);
  //   return null;
  // });
};
