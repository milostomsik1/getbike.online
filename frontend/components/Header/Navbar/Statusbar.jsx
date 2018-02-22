import styled from 'styled-components';
import { COLORS } from '../../../variables';

const Statusbar = styled.div`
  width: 200px;
  height: 45px;
  background: ${COLORS.blue};
`;

export default () => (
  <Statusbar>STATUSBAR</Statusbar>
);