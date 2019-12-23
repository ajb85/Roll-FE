import styled from 'styled-components';
import { rgba } from 'polished';

export const Shadow = styled.div`
  background-color: ${props => rgba(props.colors.secondary, 0.2)};
`;
