import styled from 'styled-components';

export const Slider = styled.div`
  left: ${({ isRegistering }) => (isRegistering ? '0px' : '492px')};
`;
