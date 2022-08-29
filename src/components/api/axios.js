import axios from 'axios';

export const setAxiosAuthToken = token => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    console.log(token)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAxiosAuthToken;