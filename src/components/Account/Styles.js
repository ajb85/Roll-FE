import styled from 'styled-components';

export const Slider = styled.div`
  left: ${({ isRegistering }) => {
    console.log('IS REGISTERING: ', isRegistering ? '0px' : '492px');
    return isRegistering ? '0px' : '492px';
  }};
`;
