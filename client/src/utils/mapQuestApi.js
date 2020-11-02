const axios = require("axios");

const instance = axios.create({
  baseURL: "https://www.mapquestapi.com",
});

export const reverseGeocode = (lat, long) => {
  const requestExtension = `/geocoding/v1/reverse?key=${process.env.MAP_QUEST_API_KEY}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;

  return instance.get(requestExtension).then(
    (res) => {
      const location = res.data.results[0].locations[0];

      if (location.adminArea3 && location.adminArea5) {
        return location.adminArea5 + ", " + location.adminArea3;
      }

      // if (location) {
      //   return location;
      // }

      return null;
    },
    (err) => {
      console.error(err);

      return null;
    }
  );
};
