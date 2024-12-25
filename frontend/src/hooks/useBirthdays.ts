import { useState, useEffect } from 'react';
import { Birthday } from '../types';
import { BirthdayService } from '../services/api';

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBirthdays = async () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await BirthdayService.getAllBirthdays();
        setBirthdays(data);
      } catch (error) {
        console.error('Failed to fetch birthdays:', error);
        setError('Failed to load birthdays');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  return { birthdays, loading, error, refetch: fetchBirthdays };
}
