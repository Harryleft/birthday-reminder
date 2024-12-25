import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { BirthdayDisplay } from './components/BirthdayDisplay/BirthdayDisplay';
import { ManageButton } from './components/ManageButton/ManageButton';
import { BirthdayService } from './services/api';
import { DateCalculator } from './utils/dateUtils';
import { Birthday } from './types';
import { BirthdayManage } from './components/BirthdayManage';

export const App: React.FC = () => {
  const [nextBirthday, setNextBirthday] = useState<Birthday | null>(null);
  const [daysUntil, setDaysUntil] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isManageOpen, setIsManageOpen] = useState(false);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        const birthdays = await BirthdayService.getAllBirthdays();
        const next = DateCalculator.getNextBirthday(birthdays);
        if (next) {
          setNextBirthday(next.birthday);
          setDaysUntil(next.daysUntil);
        }
      } catch (error) {
        console.error('Failed to fetch birthdays:', error);
        setError('无法加载生日信息');
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
    // 每天更新一次
    const interval = setInterval(fetchBirthdays, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManage = () => {
    setIsManageOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {loading && <div>加载中...</div>}
      {error && <div>错误: {error}</div>}
      {nextBirthday && <BirthdayDisplay birthday={nextBirthday} daysUntil={daysUntil} />}
      <ManageButton onClick={handleManage} isManageOpen={isManageOpen} />
      <BirthdayManage 
        isOpen={isManageOpen} 
        onClose={() => setIsManageOpen(false)} 
      />
    </ThemeProvider>
  );
};

export default App;
