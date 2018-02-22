import styled from 'styled-components';
import { COLORS } from '../variables';
import Link from 'next/link';

const Logo = styled.img`
  display: block;
  cursor: pointer;
`;

const ResponsiveImage = styled.div`
  width: 100%;
  height: auto;
`;

export default ({href}) => (
  <Link href={href || '/'}>
    <ResponsiveImage>
      <Logo src="/static/img/logo.png" alt="GetBike.online logo"/>
    </ResponsiveImage>
  </Link>
);