import styled from 'styled-components';
import { COLORS } from '../variables';
import Logo from '../components/Logo';

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  height: 350px;
  background: ${COLORS.charcoal};
  color: ${COLORS.white};
`;

const Copyright = styled.p`
  width: 100%;
  color: ${COLORS.white};
  text-align: center;
  border-top: 1px solid ${COLORS.grayBorder};
`;

export default () => (
  <Footer>
    <Logo/>
    <Copyright>&copy; 2018 GetBike.online All Rights Reserved.</Copyright>
  </Footer>
);