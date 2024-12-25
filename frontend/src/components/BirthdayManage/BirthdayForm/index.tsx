import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Birthday } from '../../../types/index';
import { useI18n } from '../../../hooks/useI18n';
import { Lunar } from 'lunar-typescript';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &.primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.secondary {
    background-color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

interface Props {
  birthday: Birthday | null;
  onSubmit: (data: Partial<Birthday>) => void;
  onCancel: () => void;
}

export const BirthdayForm: React.FC<Props> = ({
  birthday,
  onSubmit,
  onCancel,
}) => {
  const { t } = useI18n();
  const isEdit = !!birthday;

  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    notes: ''
  });

  useEffect(() => {
    if (birthday) {
      const birth_date = birthday.solar_date 
        ? `${new Date().getFullYear()}-${String(birthday.solar_date.month).padStart(2, '0')}-${String(birthday.solar_date.day).padStart(2, '0')}`
        : '';

      setFormData({
        name: birthday.name,
        birth_date,
        notes: birthday.notes || ''
      });
    }
  }, [birthday]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.birth_date) {
      alert(t('pleaseCompleteForm'));
      return;
    }

    const [year, month, day] = formData.birth_date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const lunar = Lunar.fromDate(date);
    
    onSubmit({
      ...formData,
      type: 'lunar',
      lunar_date: {
        year: null,
        month: lunar.getMonth(),
        day: lunar.getDay()
      },
      solar_date: {
        year: year,
        month: month,
        day: day
      }
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{isEdit ? t('editBirthday') : t('addBirthday')}</h2>
      
      <FormGroup>
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="birthDate">{t('birthDate')}</Label>
        <Input
          id="birthDate"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="notes">{t('notes')}</Label>
        <Input
          id="notes"
          name="notes"
          type="text"
          value={formData.notes}
          onChange={handleChange}
          placeholder={t('notesPlaceholder')}
        />
      </FormGroup>

      <ButtonGroup>
        <Button type="submit" className="primary">
          {isEdit ? t('save') : t('add')}
        </Button>
        <Button type="button" className="secondary" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
}; 