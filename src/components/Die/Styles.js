import styled from "styled-components";

const sizes = {
  small: "20px",
  medium: "60px",
  large: "80px",
};

export const DieContainer = styled.div`
  width: fit-content;
  height: fit-content;

  img {
    width: ${({ size }) => sizes[size]};
    height: ${({ size }) => sizes[size]};
  }

  svg {
    font-size: ${({ size }) => sizes[size]};
  }
`;
