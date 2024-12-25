import React, { useState, useEffect } from 'react';
import { BirthdayDisplay } from './components/BirthdayDisplay/BirthdayDisplay';
import { ManageButton } from './components/ManageButton/index';
import { BirthdayManage } from './components/BirthdayManage';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { useBirthdays } from './hooks/useBirthdays';
import { Birthday } from './types';
import { Lunar } from 'lunar-typescript';

export const App: React.FC = () => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const { birthdays, refetch } = useBirthdays();
  const [nextBirthday, setNextBirthday] = useState<Birthday | null>(null);
  const [daysUntil, setDaysUntil] = useState(0);

  const calculateNextBirthday = (birthdays: Birthday[]) => {
    if (!birthdays.length) return;

    const today = new Date();
    let nearestBirthday: Birthday | null = null;
    let minDays = Infinity;

    birthdays.forEach(birthday => {
      try {
        if (!birthday.lunar_date?.month || !birthday.lunar_date?.day) return;

        const currentLunar = Lunar.fromDate(today);
        const currentYear = currentLunar.getYear();
        
        const thisYearLunar = Lunar.fromYmd(currentYear, birthday.lunar_date.month, birthday.lunar_date.day);
        const thisYearSolar = thisYearLunar.getSolar();
        
        const nextDate = new Date(
          thisYearSolar.getYear(),
          thisYearSolar.getMonth() - 1,
          thisYearSolar.getDay()
        );

        if (nextDate < today) {
          const nextYearLunar = Lunar.fromYmd(currentYear + 1, birthday.lunar_date.month, birthday.lunar_date.day);
          const nextYearSolar = nextYearLunar.getSolar();
          nextDate.setFullYear(nextYearSolar.getYear());
          nextDate.setMonth(nextYearSolar.getMonth() - 1);
          nextDate.setDate(nextYearSolar.getDay());
        }

        const days = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (days < minDays) {
          minDays = days;
          nearestBirthday = {
            ...birthday,
            solar_date: {
              year: nextDate.getFullYear(),
              month: nextDate.getMonth() + 1,
              day: nextDate.getDate()
            }
          };
        }
      } catch (error) {
        console.error('Error calculating birthday:', error);
      }
    });

    if (nearestBirthday) {
      setNextBirthday(nearestBirthday);
      setDaysUntil(minDays);
    }
  };

  useEffect(() => {
    calculateNextBirthday(birthdays);
  }, [birthdays]);

  const handleManageClose = async () => {
    setIsManageOpen(false);
    await refetch();  // 关闭管理界面时刷新数据
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {nextBirthday && (
        <BirthdayDisplay
          birthday={nextBirthday}
          daysUntil={daysUntil}
        />
      )}
      <ManageButton onClick={() => setIsManageOpen(true)} />
      <BirthdayManage
        isOpen={isManageOpen}
        onClose={handleManageClose}
      />
    </ThemeProvider>
  );
};

export default App;
