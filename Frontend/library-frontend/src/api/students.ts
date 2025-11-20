import axiosClient from './axiosClient';
import { Student } from '../types/Student';

export const studentsService = {
  getAll: () => axiosClient.get<Student[]>('/students/'),
  getById: (id: number) => axiosClient.get<Student>(`/students/${id}`),
  create: (data: Partial<Student>) => axiosClient.post('/students/', data),
  update: (id: number, data: Partial<Student>) => axiosClient.put(`/students/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/students/${id}`),
};
