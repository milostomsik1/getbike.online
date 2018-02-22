import styled from 'styled-components';
import { COLORS } from '../../variables';
import Ad from '../Ad';

const Title = styled.h2`
  width: 100%;
`;

const FeaturedAds = styled.section`
  display: flex;
  margin-bottom: 100px;
  flex-wrap: wrap;
`;

export default () => (
  <FeaturedAds>
    <Title>Featured:</Title>
    <Ad/>
    <Ad/>
    <Ad/>
    <Ad/>
  </FeaturedAds>
);