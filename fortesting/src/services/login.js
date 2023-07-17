/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('creds', credentials)
  const response = axios.post(baseUrl, credentials)
  console.log('response.data is', response.data)
  return response.data
}

export default { login }