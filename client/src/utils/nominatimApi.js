const axios = require("axios");

const instance = axios.create({
  baseURL: "http://open.mapquestapi.com/nominatim/v1",
});

export const getBoundsOfPlace = (place) => {
  const requestExtension = `search.php?key=${process.env.REACT_APP_MAP_QUEST_API_KEY}&format=json&q=${place}&addressdetails=1&limit=3&viewbox=-1.99%2C52.02%2C0.78%2C50.94&exclude_place_ids=41697`;

  return instance.get(requestExtension).then(
    (res) => {
      if (res.data[0]) {
        return res.data[0].boundingbox;
      }

      return null;
    },
    (err) => {
      console.error(err);

      return null;
    }
  );
};
