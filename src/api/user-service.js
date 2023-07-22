import axios from "axios";

const API_URL = "http://localhost:5432";

export const getAirports = () => {
  return axios.get(`${API_URL}/airports`);
};

export const searchFlights = (flight) => {
  return axios.post(`${API_URL}/searchflights`, flight);
};
