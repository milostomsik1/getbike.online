// Redux Dependencies
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
// Component Imports
import Layout from '../components/Layout';
import FeaturedAds from '../components/FeaturedAds/FeturedAds'
import CategoriesAndPremium from '../components/CategoriesAndPremium/CategoriesAndPremium';

const index = () => (
  <Layout title='GetBike.online'>
    <CategoriesAndPremium/>
    <FeaturedAds/>
  </Layout>
);

index.getInitialProps = () => {
  console.log('Getting initial props.');
};

export default withRedux(initStore)(index);