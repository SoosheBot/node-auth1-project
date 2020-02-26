import axios from 'axios';

export const axiosWithAuth = () => {
  // console.log('axiosWithAuth is firing!');
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
      authorization: token
    }
  });
};