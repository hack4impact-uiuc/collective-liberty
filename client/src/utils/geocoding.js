export const searchLocation = (input) => {
  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
