import styled from 'styled-components';

export const Arrow = styled.div`
  background-color: ${props => props.colors.primary};
  border-color: ${props => props.colors.secondary};
  color: ${props => props.colors.secondary};

  div,
  button {
    background-color: ${props => props.colors.primary};
    border-color: ${props => props.colors.secondary};
  }

  button {
    width: 172px;
  }

  div {
    left: ${({ direction }) => (direction === 'right' ? '167px' : '167px')};
    bottom: ${({ direction }) => (direction === 'right' ? '7px' : '7px')};
  }

  &:hover {
    background-color: ${props => props.colors.secondary};

    button,
    div {
      background-color: ${props => props.colors.secondary};
      color: ${props => props.colors.primary};
    }

    button {
      width: 200px;
    }

    div {
      left: ${({ direction }) => (direction === 'right' ? '182px' : '182px')};
    }
  }
`;

const circleWidth = {
  main: { left: '0 1px 0 1px', right: '0 1px 0 1px' },
  blocker: { left: '0 0 0 1px', right: '0 0 0 1px' }
};
const circleColors = {
  left: color => `transparent ${color} transparent transparent`,
  right: color => `transparent ${color} transparent transparent`
};

const circlePosition = {
  left: { blocker: '-69px', main: '-68px' },
  right: { blocker: '-69px', main: '-68px' }
};
export const SwitchCircle = styled.div`
  left: ${({ direction, circle }) => circlePosition[direction][circle]};
  background-color: ${({ colors }) => colors.primary};
  border-color: ${({ circle, colors, direction }) =>
    circle === 'main'
      ? circleColors[direction](colors.secondary)
      : colors.secondary};
  z-index: ${({ circle }) => (circle === 'main' ? '4' : '0')};
  border-width: ${({ direction, circle }) => circleWidth[circle][direction]};
`;

const blockerBottom = {
  left: { top: '26px', bot: '-49px' },
  right: { top: '26px', bot: '-49px' }
};
export const Blocker = styled.div`
  right: ${({ direction }) => (direction === 'right' ? '177px' : '177px')};
  bottom: ${({ direction, piece }) => blockerBottom[direction][piece]};
  background-color: ${props => props.colors.primary};
`;

export const ArrowHead = styled.div`
  transform: ${({ direction }) => `scale(${direction === 'right' ? 1 : 1})`};
`;
