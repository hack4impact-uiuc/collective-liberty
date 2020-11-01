const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*export const getIncidents = (focus,state,start_date,end_date) => {
    const requestString = `/incidents?focus=${focus}&state=${state}&start_date=${start_date}&end_date=${end_date}`;
    return instance.get(requestString).then(
        res => res.data,
        err => {
            console.error(err);
            return null;
        },
    );
};
*/
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
