import axios from 'axios';

let BASE_URL = 'http://localhost:9300';

export default class RestResource {
    async login(data) {
      return axios.post(`${BASE_URL}/auth/login`, data);
    }
  }
  