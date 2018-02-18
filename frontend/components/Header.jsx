import Navbar from './Navbar';
import Banner from './Banner';
import SearchBar from './SearchBar';

const Header = props => (
  <div className='Header'>
    <Navbar/>
    <Banner/>
    <SearchBar/>
  </div>
);

export default Header;