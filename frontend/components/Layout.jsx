import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({title, children}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Navbar/>
    {children}

    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Layout;