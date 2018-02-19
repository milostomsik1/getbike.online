import { COLORS } from '../../../variables';
import Logo from '../../Logo';
import Statusbar from './Statusbar';

const Navbar = () => (
  <div className='Navbar'>
    <Logo/>
    <Statusbar/>

    <style jsx>{`
      .Navbar {
        display: flex;
        height: 60px;

        justify-content: space-between;
        align-items: center;

        background: ${COLORS.charcoal};
      }
    `}</style>
  </div>
)

export default Navbar;