import styled from 'styled-components';

export const Arrow = styled.button`
  background-color: ${props => props.colors.primary};
  border-color: ${props => props.colors.secondary};
  color: ${props => props.colors.secondary};

  div {
    background-color: ${props => props.colors.primary};
    border-color: ${props => props.colors.secondary};
  }

  &:hover {
    background-color: ${props => props.colors.secondary};

    div:not(:last-child) {
      background-color: ${props => props.colors.secondary};
    }
  }
`;

export const SwitchCircle = styled.div`
  left: ${({ direction }) => (direction === 'right' ? '-69px' : '0px')};
  background-color: ${props => props.colors.primary};
  border-color: ${props => props.colors.secondary};
`;

const blockerBottom = {
  right: { top: '26px', bot: '-49px' }
};
export const Blocker = styled.div`
  right: ${({ direction }) => (direction === 'right' ? '191px' : '0px')};
  bottom: ${({ direction, piece }) => blockerBottom[direction][piece]};
  background-color: ${props => props.colors.primary};
`;

export const ArrowHead = styled.div`
  left: ${({ direction }) => (direction === 'right' ? '94px' : '0px')};
  transform: ${({ direction }) => `scale(${direction === 'right' ? 1 : -1})`};
`;
