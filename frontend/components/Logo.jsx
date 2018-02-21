import { COLORS } from '../variables';
import Link from 'next/link';

const Logo = () => (
  <div className='Logo'>
    <Link href='/'>
      <img src="/static/img/logo.png" alt="GetBike.online logo"/>
    </Link>

    <style jsx>{`
      .Logo img {
        display: block;
        cursor: pointer;
      }
    `}</style>
  </div>

);

export default Logo;