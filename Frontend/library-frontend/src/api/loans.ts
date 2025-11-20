// src/api/loans.ts
import axiosClient from './axiosClient';
import { BookLoan } from '../types/BookLoan';

export const loansService = {
  getAll: () => axiosClient.get<BookLoan[]>('/loans/'),
  create: (data: Partial<BookLoan>) => axiosClient.post('/loans/', data),
  returnLoan: (id: number, return_date: string) =>
    axiosClient.put(`/loans/${id}/return?return_date=${return_date}`),
};
