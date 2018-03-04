import { COLORS, TYPOGRAPHY } from '../../variables';
import styled from 'styled-components';
import Container from '../Container';

const Banner = styled.div`
  display: flex;
  height: 350px;

  align-items: center;

  background-image: url('/static/img/banner.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Headline = styled.h1`
  max-width: 650px;

  color: ${COLORS.white};
  font-size: ${TYPOGRAPHY.headline.fontSize}px;
  font-weight: ${TYPOGRAPHY.headline.fontWeight};
`;

export default () => (
  <Banner>
    <Container flex alignCenter>
      <Headline>The quickest way to your new bike</Headline>
    </Container>
  </Banner>
);
