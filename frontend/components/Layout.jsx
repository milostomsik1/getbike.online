import Head from 'next/head';
import Header from './Header';

const Layout = ({title, children}) => (
  <div className='Layout'>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"/>
    </Head>

    <Header/>

    {children}

    <style jsx global>{`
      body {
        font-family: 'Raleway', sans-serif;
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