import { COLORS } from '../../../variables';
import Search from './Search';
import Sell from './Sell';

const Searchbar = () => (
  <div className='Searchbar'>
    <Search/>
    <Sell/>

    <style jsx>{`
      .Searchbar {
        display: flex;
        margin-top: -34px;
        justify-content: center;
        height: 68px;
        position: relative;
        z-index: 999;
      }
    `}</style>
  </div>
);

export default Searchbar;