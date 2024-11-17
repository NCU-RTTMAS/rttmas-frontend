// import { httpClient } from '@/main'
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getVehicles() {
    return apiClient.get('/vehicles');
  },
  getVehicleById(id) {
    return apiClient.get(`/vehicle/${id}`);
  },
  getUsers() {
    return apiClient.get(`/users`);
  },
  getUserById(id) {
    return apiClient.get(`/user/${id}`);
  },

  getPostById(id) {
    return apiClient.get(`/posts/${id}`);
  },

  // You can add more methods for different endpoints as needed.
};