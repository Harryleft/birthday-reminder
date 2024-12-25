import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ visible: boolean; isManageOpen?: boolean }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: #4a90e2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${(props) =>
    props.visible &&
    !props.isManageOpen &&
    `
    opacity: 1;
  `}
`;

interface Props {
  onClick: () => void;
  isManageOpen?: boolean;
}

export const ManageButton: React.FC<Props> = ({ onClick, isManageOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Button visible={visible} isManageOpen={isManageOpen} onClick={onClick}>
      管理
    </Button>
  );
};
