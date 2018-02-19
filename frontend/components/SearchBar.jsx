import { COLORS } from '../variables';
import Search from './Search';
import Sell from './Sell';

const SearchBar = () => (
  <div className='SearchBar'> SEARCH BAR
    <Search/>
    <Sell/>

    <style jsx>{`
      .SearchBar {
        display: flex;
        justify-content: center;
        margin-top: -30px;
        height: 60px;
        background: ${COLORS.charcoal};
        opacity: 0.75;
        color: ${COLORS.white};
      }
    `}</style>
  </div>
);

export default SearchBar;