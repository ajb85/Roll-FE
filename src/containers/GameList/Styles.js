import styled from 'styled-components';

export const Row = styled.tr`
  background-color: ${props =>
    props.isUsersTurn && props.isActive
      ? props.colors.secondary
      : props.colors.primary};
  border: ${({isActive, isUsersTurn, colors}) => isActive && !isUsersTurn ? `1px solid ${colors.secondary}` : '1px solid transparent'};
  color: ${props =>
    props.isUsersTurn && props.isActive
      ? props.colors.primary
      : props.colors.secondary};

  border-radius: ${props => (props.isActive ? '7px' : 0)};
`;
