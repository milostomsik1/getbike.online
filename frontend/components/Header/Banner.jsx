import { COLORS } from '../../variables';

const Banner = () => (
  <div className='Banner'>
    <h1 className='Banner__Headline'>The quickest way to your new bike</h1>

    <style jsx>{`
      .Banner {
        display: flex;
        height: 350px;

        align-items: center;

        background-image: url('/static/img/banner.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .Banner__Headline {
        max-width: 650px;
        font-size: 72px;
        font-weight: 100;
        color: ${COLORS.white};
      }
    `}</style>
  </div>
);

export default Banner;
