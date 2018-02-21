import { COLORS, DIMENSIONS } from '../variables';
import styled from 'styled-components';

const sellStyles = `
  font-size: 24px;
  color: ${COLORS.white};
  background: ${COLORS.green};
`;

const Button = styled.button`
  display: flex;
  padding: 0 5vw;
  height: 100%;
  width: 100%;

  align-items: center;
  justify-content: center;

  color: ${COLORS.charcoal};
  font-size: 16px;
  font-weight: 300;
  text-transform: uppercase;

  background: ${COLORS.white};
  border-radius: ${DIMENSIONS.borderRadius};
  border: none;
  outline: none;
  cursor: pointer;

  ${({sell}) => sell && sellStyles}
`;

export default Button;