import { COLORS } from '../variables';
import Link from 'next/link';

const Sell = () => (
  <div className='Sell'>
    <Link href="/"><a>SELL</a></Link>

    <style jsx>{`
      .Sell {
        background: ${COLORS.green};
      }
      .Sell a {
        color: ${COLORS.white};
      }
    `}</style>
  </div>
);

export default Sell;