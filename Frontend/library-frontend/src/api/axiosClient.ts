import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8001', // change port to your FastAPI backend
  headers: { 'Content-Type': 'application/json' },
});

export default axiosClient;
