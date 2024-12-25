import React from 'react';
import styled from 'styled-components';
import { Birthday } from '../../../types';
import { BirthdayItem } from './BirthdayItem';
import { useI18n } from '../../../hooks/useI18n';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  birthdays: Birthday[];
  onAdd: () => void;
  onEdit: (birthday: Birthday) => void;
  onDelete: (id: string) => void;
}

export const BirthdayList: React.FC<Props> = ({
  birthdays,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const { t } = useI18n();

  return (
    <>
      <Header>
        <Title>{t('title')}</Title>
        <AddButton onClick={onAdd}>{t('addBirthday')}</AddButton>
      </Header>
      <ListContainer>
        {birthdays.length === 0 ? (
          <EmptyState>{t('noBirthdays')}</EmptyState>
        ) : (
          birthdays.map(birthday => (
            <BirthdayItem
              key={birthday.id}
              birthday={birthday}
              onEdit={() => onEdit(birthday)}
              onDelete={() => onDelete(birthday.id)}
            />
          ))
        )}
      </ListContainer>
    </>
  );
}; 