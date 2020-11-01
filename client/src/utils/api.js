const axios = require("axios");
const instance = axios.create({
  baseURL: "https://collective-liberty.vercel.app/",
});

export const getArrestData = (data) => {
  const requestURL = `/api/arrests?city=${data.city}&state=${data.state}&time_range=${data.time_range[0]},${data.time_range[1]}`;

  return instance
    .get(requestURL)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);

      return null;
    });
};
