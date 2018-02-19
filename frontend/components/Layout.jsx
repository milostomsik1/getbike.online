import { COLORS } from '../variables';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer';

const Layout = ({title, children}) => (
  <div className='Layout'>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"/>
    </Head>

    <Header/>
    {children}
    <Footer/>

    <style jsx global>{`
      body {
        font-family: 'Raleway', sans-serif;
        color: ${COLORS.charcoal};
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        list-style: none;
        text-decoration: none;
      }
    `}</style>
  </div>
);

export default Layout;