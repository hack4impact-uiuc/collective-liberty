const axios = require("axios");

const instance = axios.create({
  baseURL: "https://collective-liberty.vercel.app/",
});

export const getIncidents = (params) => {
  const requestExtension = "api/incidents";
  return instance.get(requestExtension, { params }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );
};
