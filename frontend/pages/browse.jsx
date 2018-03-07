// Redux Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
// Component Imports
import Layout from '../components/Layout';

const browse = () => (
  <Layout title='Browse | GetBike.online'>
    <h1>Browse</h1>
  </Layout>
);

export default withRedux(initStore)(browse);