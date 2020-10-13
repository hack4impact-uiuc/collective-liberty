const axios = require("axios");

const instance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
});

export const getBoundsOfPlace = (place) => {
  const requestExtension = `search?q=${place}&format=jsonv2&polygon_geojson=1`;
  return instance.get(requestExtension).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    }
  );
};
