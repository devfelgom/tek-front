import axios from 'axios'

const BASE_URL = 'https://tek-backend.herokuapp.com'

export const authService = {
  signIn: values => axios.post(`${BASE_URL}/sessions`, values),
  signUp: values => axios.post(`${BASE_URL}/users`, values)
}

export const projectService = {
  list: () =>
    axios(`${BASE_URL}/project`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }),
  create: values =>
    axios.post(`${BASE_URL}/project`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }),
  detail: id =>
    axios(`${BASE_URL}/project/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),
  health: id =>
    axios(`${BASE_URL}/project/health/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),
  ideal: data =>
    axios.post(`${BASE_URL}/project/ideal`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),
  update: (id, data) =>
    axios.put(`${BASE_URL}/project/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
}
