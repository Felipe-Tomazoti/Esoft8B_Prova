import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imoveisAPI = {
  getAll: () => api.get('/imoveis'),
  getById: (id) => api.get(`/imoveis/${id}`),
  create: (data) => api.post('/imoveis', data),
  update: (id, data) => api.put(`/imoveis/${id}`, data),
  delete: (id) => api.delete(`/imoveis/${id}`),
  addComodo: (id, data) => api.put(`/imoveis/addComodo/${id}`, data),
  removeComodo: (id, data) => api.put(`/imoveis/removeComodo/${id}`, data),
};

export const comodosAPI = {
  getAll: () => api.get('/comodos'),
  getById: (id) => api.get(`/comodos/${id}`),
  create: (data) => api.post('/comodos', data),
  update: (id, data) => api.put(`/comodos/${id}`, data),
  delete: (id) => api.delete(`/comodos/${id}`),
};

export default api;
