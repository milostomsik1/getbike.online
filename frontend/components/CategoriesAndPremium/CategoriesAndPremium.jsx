import styled from 'styled-components';
import { COLORS } from '../../variables';
import LandingCategories from './LandingCategories';
import PremiumAds from './PremiumAds';

const CategoriesAndPremium = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: -34px;
  height: 500px;
`;

export default () => (
  <CategoriesAndPremium>
    <LandingCategories/>
    <PremiumAds/>
  </CategoriesAndPremium>
);