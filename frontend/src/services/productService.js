import axios from 'axios';

const API = axios.create({
  baseURL: '/api/products',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.response.use(
  res => res.data,
  err => {
    const message =
      err.response?.data?.message || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

const productService = {
  getAll: (params = {})    => API.get('', { params }),
  getById: (id)            => API.get(`/${id}`),
  create: (data)           => API.post('', data),
  update: (id, data)       => API.put(`/${id}`, data),
  delete: (id)             => API.delete(`/${id}`),
  getLowStock: ()          => API.get('/low-stock'),
  getCategories: ()        => API.get('/categories'),
  getDashboard: ()         => API.get('/dashboard'),
};

export default productService;
