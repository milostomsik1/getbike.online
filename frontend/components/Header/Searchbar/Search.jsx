import styled from 'styled-components';
import { COLORS, DIMENSIONS } from '../../../variables';
import Link from 'next/link';

const Input = styled.input`
  flex: 1;
  font-size: 24px;
  font-weight: 300;
  border: none;
  border-top-left-radius: ${DIMENSIONS.borderRadius};
  border-bottom-left-radius: ${DIMENSIONS.borderRadius};
  border-style: solid;
  border-color: ${COLORS.grayBorder};
  border-right: none;
  outline: none;
  transition: all 0.3s;
  padding-left: 16px;

  &::placeholder {
    color: ${COLORS.gray};
  }

  &:focus {
    border-color: ${COLORS.blue};
  }
`;

const Button = styled.div`
  height: 100%;
  width: 80px;
  background-color: ${COLORS.blue};
  border-top-right-radius: ${DIMENSIONS.borderRadius};
  border-bottom-right-radius: ${DIMENSIONS.borderRadius};
  cursor: pointer;
  background-image: url('/static/img/search.png');
  background-repeat: no-repeat;
  background-position: center;
`;

const SearchButton = ({href}) => (
  <Link href={href}><a>
    <Button/>
  </a></Link>
);

const Search = styled.div`
  display: flex;
  margin-right: 24px;
  flex: 1;
  color: ${COLORS.white};
  background: ${COLORS.white};
  border-radius: ${DIMENSIONS.borderRadius};
`;

export default () => (
  <Search>
    <Input type='text' placeholder='I am looking for...'/>
    <SearchButton href='/browse'/>
  </Search>
);