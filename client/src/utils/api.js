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

export const getIncidents = () => {
  const requestString = `/incidents`;
  return instance.get(requestString).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );
};
