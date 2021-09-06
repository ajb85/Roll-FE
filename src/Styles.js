import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: ${(props) => props.colors.primary};
  height: 100vh;
  transition: background-color 0.5s, color 0.5s, border-color 0.5s;

  p,
  a,
  span,
  input,
  h1,
  h2,
  h3,
  h4,
  h5,
  tr,
  div {
    transition: background-color 0.5s, color 0.5s, border-color 0.5s;
  }

  p,
  a,
  span,
  input,
  h1,
  h2,
  h3,
  h4,
  h5,
  div {
    color: ${(props) => props.colors.secondary};
    border-color: ${(props) => props.colors.secondary};
  }

  button {
    transition: background-color 0.5s, color 0.5s, border-color 0.5s;
    background-color: ${(props) => props.colors.primary};
    color: ${(props) => props.colors.secondary};
    border: 1px solid ${(props) => props.colors.secondary};

    p {
      color: ${(props) => props.colors.secondary};
      transition: background-color 0.5s, color 0.5s, border-color 0.5s;
    }

    svg {
      color: ${(props) => props.colors.secondary};
      transition: background-color 0.5s, color 0.5s, border-color 0.5s;
    }

    &:hover {
      background-color: ${(props) => props.colors.secondary};
      color: ${(props) => props.colors.primary};

      p {
        color: ${(props) => props.colors.primary};
      }

      svg {
        color: ${(props) => props.colors.primary};
      }
    }

    &.disabled {
      opacity: 0.5;
      cursor: initial;

      &:hover {
        background-color: ${(props) => props.colors.primary};
        color: ${(props) => props.colors.secondary};
        border: 1px solid ${(props) => props.colors.secondary};

        p {
          color: ${(props) => props.colors.secondary};
          transition: background-color 0.5s, color 0.5s, border-color 0.5s;
        }

        svg {
          color: ${(props) => props.colors.secondary};
          transition: background-color 0.5s, color 0.5s, border-color 0.5s;
        }
      }
    }
  }
`;
