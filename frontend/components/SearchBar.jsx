import { COLORS } from '../variables';

const SearchBar = () => (
  <div className='SearchBar'> SEARCH BAR

    <style jsx>{`
      .SearchBar {
        position: relative;
        top: -30px;
        height: 60px;
        background: ${COLORS.charcoal};
        opacity: 0.75;
      }
    `}</style>
  </div>
);

export default SearchBar;