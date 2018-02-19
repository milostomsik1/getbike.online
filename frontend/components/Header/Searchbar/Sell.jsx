import { COLORS } from '../../../variables';
import Link from 'next/link';
import Button from '../../Button';

const Sell = () => (
  <Link href="/sell"><a>
    <Button className='Sell'
      fontSize='24px;'
      color={COLORS.white}
      background={COLORS.green}
      >Sell my item
    </Button>

    <style jsx>{`
      .Sell {
        height: 68px;
      }
    `}</style>
  </a></Link>
);

export default Sell;