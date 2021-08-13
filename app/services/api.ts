import axios from 'axios';

const api = axios.create({
  baseURL: 'https://iot-lamp1223.herokuapp.com',
})

export default api;