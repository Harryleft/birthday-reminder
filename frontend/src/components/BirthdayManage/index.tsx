import React, { useState, useEffect } from 'react';
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
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ContentContainer = styled.div`
  margin-top: 60px;  // 为顶部按钮留出空间
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

  const handleClose = () => {
    setMode('list');
    setEditingBirthday(null);
    onClose();
  };
  
  const handleSubmit = async (data: Partial<Birthday>) => {
    try {
      if (mode === 'edit' && editingBirthday?.id) {
        await BirthdayService.updateBirthday(editingBirthday.id, data);
      } else {
        await BirthdayService.addBirthday(data as Omit<Birthday, 'id'>);
      }
      await refetch();
      handleClose();
    } catch (error) {
      console.error('Failed to save birthday:', error);
      alert(t('saveFailed'));
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm(t('confirmDelete'))) {
      try {
        await BirthdayService.deleteBirthday(id);
        await refetch();
        handleClose();
      } catch (error) {
        console.error('Failed to delete birthday:', error);
        alert(t('deleteFailed'));
      }
    }
  };

  return (
    <ManageContainer isOpen={isOpen}>
      <CloseButton onClick={handleClose} title={t('back')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M10 12L6 8L10 4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </CloseButton>
      <ContentContainer>
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
            onCancel={handleClose}
          />
        )}
      </ContentContainer>
    </ManageContainer>
  );
}; 