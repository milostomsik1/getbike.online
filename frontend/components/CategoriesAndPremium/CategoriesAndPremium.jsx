import { COLORS } from '../../variables';
import LandingCategories from './LandingCategories';
import PremiumAds from './PremiumAds';

const CategoriesAndPremium = () => (
  <div className='CategoriesAndPremium'> CATEGORIESANDPREMIUM
    <LandingCategories/>
    <PremiumAds/>

    <style jsx>{`
      .CategoriesAndPremium {
        display: flex;
        justify-content: space-between;
        margin-top: -34px;
        height: 500px;
      }
    `}</style>
  </div>
);

export default CategoriesAndPremium;