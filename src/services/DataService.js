import axios from 'axios';

let BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default class RestResource {

  async getTasks(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/getTasks`, data);
  }

  async getCount(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/getCount`, data);
  }

  async deleteTask(taskId) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/deleteTask`, { taskId });
  }

  async saveTask(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/saveTask`, data);
  }

  async getDashboardData(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/getDashboardData`, data);
  }
  
  async changeTaskStatus(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/changeTaskStatus`, data);
  }

  async updateTask(data) {
    let token = await localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    return await axios.post(`${BASE_URL}/task/updateTask`, data);
  }

}
