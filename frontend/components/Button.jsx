import { COLORS, DIMENSIONS } from '../variables';
import { withRouter } from 'next/router';
import styled from 'styled-components';

const sellStyles = `
  font-size: 24px;
  color: ${COLORS.white};
  background: ${COLORS.green};
`;

const Button = styled.button`
  display: flex;
  padding: 0 5vw;
  height: 100%;

  align-items: center;
  justify-content: center;

  color: ${COLORS.charcoal};
  font-size: 16px;
  font-weight: 300;
  text-transform: uppercase;

  background: ${COLORS.white};
  border-radius: ${DIMENSIONS.borderRadius};
  border: none;
  outline: none;
  cursor: pointer;

  ${({sell}) => sell && sellStyles}
`;

export default withRouter(({ href, router, children, ...props }) => {
  const handleButtonClick = event => {
    event.preventDefault();
    if (href) {
      router.push(href);
    }
  };

  const isActive = router.pathname === href;

  return (
    <Button
      onClick={handleButtonClick}
      active={isActive}
      {...props}>
      {children}
    </Button>
  );
});