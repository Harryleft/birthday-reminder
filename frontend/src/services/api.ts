import axios from 'axios';
import { Birthday } from '../types';

// 使用相对路径，让 Vite 代理处理
const API_BASE_URL = '/api';

export const BirthdayService = {
  getAllBirthdays: async (): Promise<Birthday[]> => {
    const response = await axios.get(`${API_BASE_URL}/birthday/list`);
    return response.data;
  },

  addBirthday: async (birthday: Omit<Birthday, 'id'>): Promise<Birthday> => {
    const response = await axios.post(`${API_BASE_URL}/birthday/add`, birthday);
    return response.data;
  },

  updateBirthday: async (id: string, birthday: Partial<Birthday>): Promise<Birthday> => {
    const response = await axios.put(`${API_BASE_URL}/birthday/update/${id}`, birthday);
    return response.data;
  },

  deleteBirthday: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/birthday/delete/${id}`);
  }
};
