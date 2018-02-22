import styled from 'styled-components';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer';

const Layout = ({title, children}) => (
  <div className='Layout'>
    <Head>
      <title>{title}</title>
    </Head>

    <Header/>
    {children}
    <Footer/>
  </div>
);

export default Layout;