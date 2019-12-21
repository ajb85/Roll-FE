import styled from 'styled-components';

export const Table = styled.table`
  border-color: ${({ colors }) => colors.secondary};

  th,
  td {
    border-color: ${({ colors }) => colors.secondary};
  }
`;
