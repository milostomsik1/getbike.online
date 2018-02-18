import { COLORS } from '../colors';
import Link from 'next/link';

const StatusBar = props => (
  <div>
    <ul className='StatusBar'>
      <li><Link href='/'><a>Index</a></Link></li>
      <li><Link href='/browse'><a>Browse</a></Link></li>
      <li><Link href='/profile'><a>Profile</a></Link></li>
    </ul>

    <style jsx>{`
      .StatusBar {
        display: flex;
      }

      a {
        display: block;
        padding: 10px;
        color: ${COLORS.white};
      }
    `}</style>
  </div>
);

export default StatusBar;