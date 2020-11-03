const axios = require("axios");

const instance = axios.create({
    baseURL: "https://collective-liberty.vercel.app/api",
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
