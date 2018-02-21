import { COLORS } from '../../../variables';
import Link from 'next/link';
import Button from '../../Button';

const Sell = () => (
  <Link href="/sell">
    <a className='Sell'>
      <Button sell>Sell my item</Button>

      <style jsx>{`
        .Sell {
          height: 68px;
        }
      `}</style>
    </a>
  </Link>
);

export default Sell;