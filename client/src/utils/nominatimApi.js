const axios = require("axios");

const instance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
});

export const getBoundsOfState = (place) => {
  const requestExtension = `search?q=${place}&format=jsonv2&polygon_geojson=1`;

  return instance.get(requestExtension).then(
    (res) => {
      if (res.data[0].geojson.coordinates) {
        return res.data[0].geojson.coordinates;
      }

      return null;
    },
    (err) => {
      console.error(err);

      return null;
    }
  );
};
