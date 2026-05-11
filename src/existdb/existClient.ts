import axios from 'axios'

export const existClient = axios.create({
  baseURL:
    'http://localhost:8080/exist/rest/db',

  auth: {
    username: 'admin',
    password: ''
  }
})