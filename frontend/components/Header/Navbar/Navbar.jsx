import styled from 'styled-components';
import { COLORS, DIMENSIONS } from '../../../variables';
import Logo from '../../Logo';
import Statusbar from './Statusbar';

const Navbar = styled.nav`
  display: flex;
  height: ${DIMENSIONS.navbar.height}px;

  justify-content: space-between;
  align-items: center;

  background: ${COLORS.charcoal};
`;

export default () => (
  <Navbar>
    <Logo/>
    <Statusbar/>
  </Navbar>
);