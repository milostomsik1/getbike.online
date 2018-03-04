import styled from 'styled-components';
import { MEDIA } from '../variables';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({flex}) => flex && 'display: flex;'}
  ${({justifyCenter}) => justifyCenter && 'justify-content: center;'}
  ${({justifyBetween}) => justifyBetween && 'justify-content: space-between;'}
  ${({justifyAround}) => justifyAround && 'justify-content: space-around;'}
  ${({alignCenter}) => alignCenter && 'align-items: center;'}

  ${MEDIA.mobile} {
    padding: 0 20px;
  }

  ${MEDIA.tablet} {
    /* width: 728px;
    margin: 0 auto; */
    padding-left: calc(50% - 364px);
    padding-right: calc(50% - 364px);
  }

  ${MEDIA.laptop} {
    /* width: 984px;
    margin: 0 auto; */
    padding-left: calc(50% - 492px);
    padding-right: calc(50% - 492px);
  }

  ${MEDIA.desktop} {
    /* width: 1240px;
    margin: 0 auto; */
    padding-left: calc(50% - 620px);
    padding-right: calc(50% - 620px);
  }

  ${MEDIA.desktopWide} {
    /* width: 1560px;
    margin: 0 auto; */
    padding-left: calc(50% - 780px);
    padding-right: calc(50% - 780px);
  }
`;

export default Container;