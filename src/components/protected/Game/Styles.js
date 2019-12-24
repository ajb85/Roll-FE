import styled from 'styled-components';

export const Table = styled.div`
  border-color: ${({ colors }) => colors.secondary};

  th {
    border-color: ${({ colors }) => colors.secondary};
  }

  td {
    border-color: ${({ colors }) => colors.primary};
  }
`;
