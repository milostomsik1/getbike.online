import styled from 'styled-components';
import { COLORS, DIMENSIONS } from '../../../variables';
import Button from '../../Button';

const Login = () => (
  <Button login>Login</Button>
);

const Register = () => (
  <Button register>Register</Button>
);

const Statusbar = styled.div`
  display: flex;
  height: ${DIMENSIONS.statusBar.height}px;
`;

export default () => (
  <Statusbar>
    <Login/>
    <Register/>
  </Statusbar>
);