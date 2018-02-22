import styled from 'styled-components';
import { COLORS } from '../../../variables';
import Search from './Search';
import Button from '../../Button';

const Searchbar = styled.div`
  display: flex;
  margin-top: -34px;
  justify-content: center;
  height: 68px;
  position: relative;
  z-index: 9;
`;

const Sell = () => (
  <Button sell href='/sell'>Sell my item</Button>
);

export default () => (
  <Searchbar>
    <Search/>
    <Sell/>
  </Searchbar>
);