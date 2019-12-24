import styled from 'styled-components';

export const BulbContainer = styled.div`
  position: relative;

  div {
    position: ${({ inline }) => (inline ? 'static' : 'absolute')}
    font-size: 2rem;
    top: ${({ inline }) => (inline ? '0px' : '15px')};
    right: ${({ inline }) => (inline ? '0px' : '15px')};;
  }
`;
