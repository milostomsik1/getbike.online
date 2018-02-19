import { COLORS } from '../variables';
import Logo from '../components/Logo';

const Footer = () => (
  <div className='Footer'>
    <Logo/>

    <p className='Footer__Copyright'>&copy; 2018 GetBike.online All Rights Reserved.</p>

    <style jsx>{`
      .Footer {
        display: flex;
        flex-wrap: wrap;
        height: 350px;
        background: ${COLORS.charcoal};
        color: ${COLORS.white};
      }

      .Footer__Copyright {
        width: 100%;
      }
    `}</style>
  </div>
);

export default Footer;