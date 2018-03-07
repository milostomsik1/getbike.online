// Redux Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
// Component Imports
import Layout from '../components/Layout';

const sell = () => (
  <Layout title='Sell My Item | GetBike.online'>
    <h1>Sell</h1>
  </Layout>
);

export default withRedux(initStore)(sell);