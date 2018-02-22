import styled from 'styled-components';
import { COLORS, DIMENSIONS } from '../../../variables';
import Search from './Search';
import Button from '../../Button';

const Searchbar = styled.div`
  display: flex;
  height: ${DIMENSIONS.searchBar.height}px;
  margin-top: -${DIMENSIONS.searchBar.height / 2}px;

  position: relative;
  z-index: ${DIMENSIONS.searchBar.zIndex};

  justify-content: center;
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