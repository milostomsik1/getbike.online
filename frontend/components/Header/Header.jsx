import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import Banner from './Banner';
import Searchbar from './Searchbar/Searchbar';

const Header = styled.header``;

export default () => (
  <Header>
    <Navbar/>
    <Banner/>
    <Searchbar/>
  </Header>
);