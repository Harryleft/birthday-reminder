import React from 'react';
import styled from 'styled-components';
import { Birthday } from '@/types';
import { useI18n } from '../../hooks/useI18n';
import { Lunar } from 'lunar-typescript';

const Card = styled.div`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.sizes.borderRadius};
  padding: 30px;
  box-shadow: 0 10px 30px ${props => props.theme.colors.shadow};
  text-align: center;
  animation: ${props => props.theme.animations.breathe};
  min-width: ${props => props.theme.sizes.cardMinWidth};
  max-width: ${props => props.theme.sizes.cardMaxWidth};
  min-height: 300px;
  max-height: ${props => props.theme.sizes.cardMaxHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px;
    min-height: 250px;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }
`;

const SolarDate = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0.8rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`;

const Countdown = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0.8rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
`;

const LanguageSwitch = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.card};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

interface Props {
  birthday: Birthday;
  daysUntil: number;
}

export const BirthdayDisplay: React.FC<Props> = ({ birthday, daysUntil }) => {
  const { locale, setLocale, t, translateName } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  };

  const formatDate = () => {
    if (birthday.type === 'lunar' && birthday.lunar_date) {
      const month = birthday.lunar_date.month || 1;
      const day = birthday.lunar_date.day || 1;
      
      // 转换为今年的公历日期显示
      const lunar = Lunar.fromYmd(new Date().getFullYear(), month, day);
      const solar = lunar.getSolar();
      const solarMonth = solar.getMonth();
      const solarDay = solar.getDay();
      
      return locale === 'zh'
        ? t('date', { month: solarMonth, day: solarDay })
        : new Date(0, solarMonth - 1, solarDay)
            .toLocaleDateString(locale, { month: 'long', day: 'numeric' });
    } else if (birthday.type === 'solar' && birthday.solar_date) {
      const month = birthday.solar_date.month || 1;
      const day = birthday.solar_date.day || 1;
      
      return locale === 'zh' 
        ? t('date', { month, day })
        : new Date(0, month - 1, day).toLocaleDateString(locale, { 
            month: 'long', 
            day: 'numeric' 
          });
    }
    return '';
  };

  return (
    <>
      <LanguageSwitch onClick={toggleLanguage}>
        {locale === 'zh' ? 'EN' : '中文'}
      </LanguageSwitch>
      <Card>
        <Name>{translateName(birthday.name)}</Name>
        <SolarDate>{formatDate()}</SolarDate>
        <Countdown>
          {t('countdown', { days: daysUntil })}
        </Countdown>
      </Card>
    </>
  );
};
