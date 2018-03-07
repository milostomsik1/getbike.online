// Redux Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
// Component Imports
import Layout from '../components/Layout';

const profile = () => (
  <Layout title='Profile | GetBike.online'>
    <h1>Profile</h1>
  </Layout>
);

export default withRedux(initStore)(profile);