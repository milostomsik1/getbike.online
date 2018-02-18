import { COLORS } from '../colors';
import Logo from './Logo';
import StatusBar from './StatusBar';

const Navbar = () => (
  <div className='Navbar'>
    <StatusBar/>
    <Logo/>

    <style jsx>{`
      .Navbar {
        display: flex;
        height: 60px;

        align-items: center;

        background: ${COLORS.charcoal};
      }
    `}</style>
  </div>
)

export default Navbar;