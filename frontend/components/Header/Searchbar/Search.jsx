import styled from 'styled-components';
import { COLORS, GLOBAL, DIMENSIONS, TYPOGRAPHY } from '../../../variables';
import Link from 'next/link';

const Input = styled.input`
  padding-left: 16px;

  flex: 1;

  font-size: ${TYPOGRAPHY.searchBar.fontSize}px;
  font-weight: ${TYPOGRAPHY.searchBar.fontWeight};

  border: none;
  border-top-left-radius: ${DIMENSIONS.borderRadius}px;
  border-bottom-left-radius: ${DIMENSIONS.borderRadius}px;
  border-style: solid;
  border-color: ${COLORS.grayBorder};
  border-right: none;
  outline: none;

  transition: all ${GLOBAL.transitionSpeed}s;

  &::placeholder {
    color: ${COLORS.gray};
  }

  &:focus {
    border-color: ${COLORS.blue};
  }
`;

const Button = styled.a`
  display: block;
  width: ${DIMENSIONS.search.width}px;
  height: 100%;

  background-color: ${COLORS.blue};
  background-image: url('/static/img/search.png');
  background-repeat: no-repeat;
  background-position: center;
  border-top-right-radius: ${DIMENSIONS.borderRadius}px;
  border-bottom-right-radius: ${DIMENSIONS.borderRadius}px;
  cursor: pointer;

  transition: box-shadow ${GLOBAL.transitionSpeed}s;

  &:hover {
    background-color: ${COLORS.blueHover};
  }

  &:active {
    background-color: ${COLORS.blueActive};
    box-shadow: ${GLOBAL.buttonShadow};
  }
`;

const SearchButton = ({href}) => (
  <Link href={href}>
    <Button/>
  </Link>
);

const Search = styled.form`
  display: flex;
  margin-right: 24px;
  flex: 1;
  color: ${COLORS.white};
  background: ${COLORS.white};
  border-radius: ${DIMENSIONS.borderRadius}px;
`;

export default () => (
  <Search>
    <Input type='text' placeholder='I am looking for...'/>
    <SearchButton href='/browse'/>
  </Search>
);