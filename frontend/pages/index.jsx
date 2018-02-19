import Layout from '../components/Layout';
import FeaturedAds from '../components/FeturedAds';
import CategoriesAndPremium from '../components/CategoriesAndPremium/CategoriesAndPremium';

const index = () => (
  <Layout title='GetBike.online'>
  <CategoriesAndPremium/>
  <FeaturedAds/>
  </Layout>
);

export default index;