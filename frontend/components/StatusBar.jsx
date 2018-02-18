import { COLORS } from '../variables';
// import Link from 'next/link';

const StatusBar = props => (
  <div className='StatusBar'> STATUS BAR
    <ul>
      {/* <li><Link href='/'><a>Login</a></Link></li>
      <li><Link href='/browse'><a>Register</a></Link></li> */}
    </ul>

    <style jsx>{`
      .StatusBar {
        width: 200px;
        height 45px;
        background: ${COLORS.blue};
      }

      ul {
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