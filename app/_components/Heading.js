import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.4rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.position === "center" &&
    css`
      text-align: center;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.8rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.4rem;
      font-weight: 400;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      text-align: center;
      font-size: 3rem;
      font-weight: 600;
    `}
`;

export default Heading;
