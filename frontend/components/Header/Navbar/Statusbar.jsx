import styled from 'styled-components';
import { COLORS, DIMENSIONS } from '../../../variables';
import Button from '../../Button';

const Login = () => {
  const handleLoginClick = () => {
    console.log('Login clicked.');
  }

  return (
    <Button login margin onClick={handleLoginClick}>Login</Button>
  );
};

const Register = () => {
  const handleRegisterClick = () => {
    console.log('Register clicked.');
  }

  return (
    <Button register onClick={handleRegisterClick}>Register</Button>
  );
};

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