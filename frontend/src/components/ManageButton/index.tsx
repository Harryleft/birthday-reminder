import React from 'react';
import styled from 'styled-components';
import { useI18n } from '../../hooks/useI18n';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  onClick: () => void;
}

export const ManageButton: React.FC<Props> = ({ onClick }) => {
  const { t } = useI18n();
  return <Button onClick={onClick}>{t('manage')}</Button>;
}; 