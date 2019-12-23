import styled from 'styled-components';

export const Row = styled.tr`
  background-color: ${props =>
    props.isUsersTurn && props.isActive
      ? props.colors.secondary
      : props.colors.primary};
  color: ${props =>
    props.isUsersTurn && props.isActive
      ? props.colors.primary
      : props.colors.secondary};

  border-radius: ${props => (props.isUsersTurn ? '7px' : 0)};
`;
