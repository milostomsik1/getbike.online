import { COLORS, GLOBAL, DIMENSIONS, TYPOGRAPHY } from '../variables';
import { withRouter } from 'next/router';
import styled from 'styled-components';

const sellStyles = `
  padding: 0 5vw;
  color: ${COLORS.white};
  font-size: ${TYPOGRAPHY.searchBar.fontSize}px;
  text-transform: uppercase;
  background: ${COLORS.green};
`;

const loginStyles = `
  color: ${COLORS.white};
  background: transparent;
  border: 1px solid ${COLORS.white};
  transition: all ${GLOBAL.transitionSpeed}s;

  &:hover {
    color: ${COLORS.charcoal};
    background: ${COLORS.white};
  }
`;

const registerStyles = `
  color: ${COLORS.white};
  background: ${COLORS.blue};
`;

const Button = styled.button`
  display: flex;
  padding: 0 20px;
  height: 100%;

  align-items: center;
  justify-content: center;

  color: ${COLORS.charcoal};
  font-size: ${TYPOGRAPHY.button.fontSize}px;
  font-weight: ${TYPOGRAPHY.button.fontWeight};

  background: ${COLORS.white};

  border-radius: ${DIMENSIONS.borderRadius}px;
  border: none;
  outline: none;

  cursor: pointer;

  ${({login}) => login && loginStyles}
  ${({register}) => register && registerStyles}
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