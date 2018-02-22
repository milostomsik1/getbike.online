import styled from 'styled-components';
import { MEDIA } from '../variables';

const Container = styled.div`
  width: 100%;
  height: 100%;

  ${MEDIA.mobile} {
    padding: 0 20px;
  }

  ${MEDIA.tablet} {
    width: 728px;
    margin: 0 auto;
  }

  ${MEDIA.laptop} {
    width: 984px;
    margin: 0 auto;
  }

  ${MEDIA.desktop} {
    width: 1240px;
    margin: 0 auto;
  }

  ${MEDIA.desktopWide} {
    width: 1560px;
    margin: 0 auto;
  }
`;

export default Container;