import { COLORS } from '../variables';

const Banner = () => (
  <div className='Banner'> BANNER
    <h1>Welcome to GetBike</h1>

    <style jsx>{`
      .Banner {
        height: 200px;
        background: ${COLORS.green};
      }
      h1 {
        color: ${COLORS.white};
      }
    `}</style>
  </div>
);

export default Banner;