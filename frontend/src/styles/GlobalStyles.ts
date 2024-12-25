import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.primary};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    min-height: 100vh;
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes breatheAnimation {
    0% { background-color: ${theme.colors.card}; }
    50% { background-color: ${theme.colors.cardHover}; }
    100% { background-color: ${theme.colors.card}; }
  }
`;
