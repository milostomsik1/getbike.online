import styled from 'styled-components';
import { COLORS, GLOBAL } from '../variables';
import Link from 'next/link';

const Logo = styled.img`
  display: block;
  cursor: pointer;
  pointer-events: none;
`;

const LogoWrapper = styled.div`
  height: 50px;
  cursor: pointer;
  transition: transform ${GLOBAL.transitionSpeed}s;

  &:active {
    transform: skewX(10deg) translateX(-4px);
  }
`;


export default ({href}) => (
  <Link href={href || '/'} passHref>
    <LogoWrapper>
      <Logo src="/static/img/logo.png" alt="GetBike.online logo"/>
    </LogoWrapper>
  </Link>
);