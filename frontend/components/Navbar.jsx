import Link from 'next/link';

const Navbar = () => (
  <div>
    <ul>
      <li><Link href='/'><a>Index</a></Link></li>
      <li><Link href='/browse'><a>Browse</a></Link></li>
      <li><Link href='/profile'><a>Profile</a></Link></li>
    </ul>

    <style jsx>{`
      ul {
        background: #777;
        list-style: none;
        padding: 0;
        display: flex;
      }
      a {
        display: block;
        padding: 10px;
        color: #fff;
      }
    `}</style>
  </div>
)

export default Navbar;