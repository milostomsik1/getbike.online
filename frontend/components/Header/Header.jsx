import Navbar from './Navbar/Navbar';
import Banner from './Banner';
import Searchbar from './Searchbar/Searchbar';

const Header = () => (
  <div className='Header'>
    <Navbar/>
    <Banner/>
    <Searchbar/>
  </div>
);

export default Header;