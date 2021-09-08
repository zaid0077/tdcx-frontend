import axios from 'axios';

let BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default class RestResource {
    async login(data) {
      return axios.post(`${BASE_URL}/auth/login`, data);
    }

    async getDashboardData(data) {
      return await axios.post(`${BASE_URL}/task/getDashboardData`, data);
    }
  }
  