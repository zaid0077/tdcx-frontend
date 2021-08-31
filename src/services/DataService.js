import axios from 'axios';

let BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default class RestResource {

  async getTasks(data) {
    return await axios.post(`${BASE_URL}/task/getTasks`, data);
  }

  async getCount(data) {
    return await  axios.post(`${BASE_URL}/task/getCount`, data);
  }

  async deleteTask(taskId) {
    return await axios.post(`${BASE_URL}/task/deleteTask`, { taskId });
  }

  async saveTask(data) {
    return await axios.post(`${BASE_URL}/task/saveTask`, data);
  }
}
  