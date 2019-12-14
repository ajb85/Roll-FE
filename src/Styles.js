import styled from 'styled-components';
// import { colors } from 'js/Colors.js';

export const AppContainer = styled.div`
  background-color: ${props => props.colors.primary};
  height: 100vh;
  transition: 0.5s;

  p,
  span,
  input,
  h1,
  h2,
  h3,
  h4,
  h5,
  div {
    transition: 0.5s;
    color: ${props => props.colors.secondary};
  }

  button {
    background-color: ${props => props.colors.primary};
    color: ${props => props.colors.secondary};
    border: 1px solid ${props => props.colors.secondary};

    &:hover {
      background-color: ${props => props.colors.secondary};
      color: ${props => props.colors.primary};
    }
  }
`;
