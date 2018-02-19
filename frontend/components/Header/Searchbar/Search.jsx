import { COLORS, DIMENSIONS } from '../../../variables';

const Search = () => (
  <div className='Search'>
    <input className='Search__Input' type="text" placeholder='I am looking for...'/>
    <div className='Search__Button'></div>

    <style jsx>{`
      .Search {
        display: flex;
        margin-right: 24px;
        flex: 1;
        color: ${COLORS.white};
        background: ${COLORS.white};
        border-radius: ${DIMENSIONS.borderRadius};
      }

      .Search__Input {
        flex: 1;
        font-size: 24px;
        font-weight: 200;
        border: none;
        border-top-left-radius: ${DIMENSIONS.borderRadius};
        border-bottom-left-radius: ${DIMENSIONS.borderRadius};
        border-style: solid;
        border-color: ${COLORS.grayBorder};
        border-right: none;
        outline: none;
        transition: all 0.3s;
        padding-left: 16px;
      }

      .Search__Input::placeholder {
        color: ${COLORS.gray};
      }

      .Search__Input:focus {
        border-color: ${COLORS.blue};
      }

      .Search__Button {
        width: 80px;
        background-color: ${COLORS.blue};
        border-top-right-radius: ${DIMENSIONS.borderRadius};
        border-bottom-right-radius: ${DIMENSIONS.borderRadius};
        cursor: pointer;
        background-image: url('/static/img/search.png');
        background-repeat: no-repeat;
        background-position: center;
      }
    `}</style>
  </div>
);

export default Search;