import { httpClient } from '../api/httpClient';

export const bookService = {
  async list() {
    const response = await httpClient.get('/books');
    return response.data;
  },
  async create(book) {
    const response = await httpClient.post('/books', book);
    return response.data;
  },
  async find(id) {
    const response = await httpClient.get(`/books/${id}`);
    return response.data;
  },
  async update(id, book) {
    const response = await httpClient.put(`/books/${id}`, book);
    return response.data;
  },
  async remove(id) {
    await httpClient.delete(`/books/${id}`);
  },
};