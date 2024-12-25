import React from 'react';
import styled from 'styled-components';
import { Birthday } from '../../../types';
import { useI18n } from '../../../hooks/useI18n';

const ItemContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  margin: 0 0 4px;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: ${props => props.variant === 'danger' 
    ? props.theme.colors.danger 
    : props.theme.colors.primary};
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

interface Props {
  birthday: Birthday;
  onEdit: () => void;
  onDelete: () => void;
}

export const BirthdayItem: React.FC<Props> = ({
  birthday,
  onEdit,
  onDelete,
}) => {
  const { t, locale, translateName } = useI18n();

  const formatDate = (date: { month: number | null; day: number | null }) => {
    if (!date.month || !date.day) return '';
    return locale === 'zh' 
      ? `${date.month}月${date.day}日`
      : new Date(0, date.month - 1, date.day).toLocaleDateString(locale, {
          month: 'long',
          day: 'numeric',
        });
  };

  return (
    <ItemContainer>
      <InfoSection>
        <Name>{translateName(birthday.name)}</Name>
        <DateInfo>
          {birthday.type === 'lunar' ? t('lunarDate') : t('solarDate')}:{' '}
          {birthday.type === 'lunar'
            ? formatDate(birthday.lunar_date)
            : formatDate(birthday.solar_date)}
        </DateInfo>
      </InfoSection>
      <Actions>
        <ActionButton onClick={onEdit}>{t('edit')}</ActionButton>
        <ActionButton variant="danger" onClick={onDelete}>
          {t('delete')}
        </ActionButton>
      </Actions>
    </ItemContainer>
  );
}; 