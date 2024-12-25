import React, { useState } from 'react';
import styled from 'styled-components';
import { BirthdayList } from './BirthdayList/index';
import { BirthdayForm } from './BirthdayForm/index';
import { useBirthdays } from '../../hooks/useBirthdays';
import { Birthday } from '../../types';
import { BirthdayService } from '../../services/api';
import { useI18n } from '../../hooks/useI18n';

const ManageContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BirthdayManage: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(null);
  const { birthdays, refetch } = useBirthdays();
  const { t } = useI18n();
  
  const handleSubmit = async (data: Partial<Birthday>) => {
    try {
      if (mode === 'edit' && editingBirthday) {
        await BirthdayService.updateBirthday(editingBirthday.id, data);
      } else {
        await BirthdayService.addBirthday(data as Omit<Birthday, 'id'>);
      }
      await refetch();
      setMode('list');
      setEditingBirthday(null);
    } catch (error) {
      console.error('Failed to save birthday:', error);
      alert(t('saveFailed'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await BirthdayService.deleteBirthday(id);
        await refetch();
      } catch (error) {
        console.error('Failed to delete birthday:', error);
        alert(t('deleteFailed'));
      }
    }
  };

  return (
    <ManageContainer isOpen={isOpen}>
      {mode === 'list' && (
        <BirthdayList
          birthdays={birthdays}
          onAdd={() => setMode('add')}
          onEdit={(birthday) => {
            setEditingBirthday(birthday);
            setMode('edit');
          }}
          onDelete={handleDelete}
        />
      )}
      {(mode === 'add' || mode === 'edit') && (
        <BirthdayForm
          birthday={editingBirthday}
          onSubmit={handleSubmit}
          onCancel={() => {
            setMode('list');
            setEditingBirthday(null);
          }}
        />
      )}
    </ManageContainer>
  );
}; 