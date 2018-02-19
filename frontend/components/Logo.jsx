import { COLORS } from '../variables';
import Link from 'next/link';

const Logo = () => (
  <div className='Logo'>
    <Link href='/browse'>
      <a>
        <img src="/static/img/logo.png" alt="GetBike.online logo"/>
      </a>
    </Link>

    <style jsx>{`
      .Logo img {
        display: block;
      }
    `}</style>
  </div>

);

export default Logo;