import React from 'react';
import styled from 'styled-components';
import { Birthday } from '../../../types';
import { useI18n } from '../../../hooks/useI18n';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理表单提交
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{isEdit ? t('editBirthday') : t('addBirthday')}</h2>
      {/* TODO: 添加表单字段 */}
    </FormContainer>
  );
}; 