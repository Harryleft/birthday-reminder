import React from 'react';
import styled from 'styled-components';
import { Birthday } from '../../../../types';
import { useI18n } from '../../../../hooks/useI18n';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &.edit {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.delete {
    background-color: ${props => props.theme.colors.danger};
    color: white;
  }
`;

interface Props {
  birthday: Birthday;
  onEdit: () => void;
  onDelete: () => void;
}

export const BirthdayItem: React.FC<Props> = ({ birthday, onEdit, onDelete }) => {
  const { t } = useI18n();

  return (
    <ItemContainer>
      <div>{birthday.name}</div>
      <ButtonGroup>
        <ActionButton className="edit" onClick={onEdit}>
          {t('edit')}
        </ActionButton>
        <ActionButton className="delete" onClick={onDelete}>
          {t('delete')}
        </ActionButton>
      </ButtonGroup>
    </ItemContainer>
  );
}; 