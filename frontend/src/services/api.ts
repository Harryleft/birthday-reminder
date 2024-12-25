import axios from 'axios';
import { Birthday } from '../types';

// 使用相对路径，让 Vite 代理处理
const API_BASE_URL = '/api';

export const BirthdayService = {
  getAllBirthdays: async (): Promise<Birthday[]> => {
    const response = await axios.get(`${API_BASE_URL}/birthday/list`);
    return response.data;
  },

  addBirthday: async (data: Omit<Birthday, 'id'>) => {
    const response = await fetch('/api/birthday/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        birth_date: data.birth_date,
        notes: data.notes || '',
        type: data.type,
        lunar_date: data.lunar_date,
        solar_date: data.solar_date
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add birthday');
    }
    return response.json();
  },

  updateBirthday: async (id: string, data: Partial<Birthday>) => {
    const response = await fetch(`/api/birthday/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        birth_date: data.birth_date,
        notes: data.notes || '',
        type: data.type,
        lunar_date: data.lunar_date,
        solar_date: data.solar_date
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update birthday');
    }
    return response.json();
  },

  deleteBirthday: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/birthday/delete/${id}`);
  }
};
