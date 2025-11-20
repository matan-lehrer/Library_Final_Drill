import axiosClient from './axiosClient';
import { Book } from '../types/Book';

export const booksService = {
  getAll: () => axiosClient.get<Book[]>('/books/'),
  getById: (id: number) => axiosClient.get<Book>(`/books/${id}`),
  create: (data: Partial<Book>) => axiosClient.post('/books/', data),
  update: (id: number, data: Partial<Book>) => axiosClient.put(`/books/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/books/${id}`),
};
