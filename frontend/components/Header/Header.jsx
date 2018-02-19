import Navbar from './Navbar/Navbar';
import Banner from './Banner';
import Searchbar from './Searchbar';

const Header = props => (
  <div className='Header'>
    <Navbar/>
    <Banner/>
    <Searchbar/>
  </div>
);

export default Header;