import { DIMENSIONS } from '../variables';

const Button = ({fontSize, color, background, children}) => (
  <button className='Button'>
    {children}

    <style jsx>{`
      .Button {
        display: flex;
        padding: 0 5vw;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        font-size: ${fontSize};
        font-weight: 300;
        color: ${color};
        background: ${background};
        text-transform: uppercase;
        border-radius: ${DIMENSIONS.borderRadius};
        outline: none;
        cursor: pointer;
        border: none;
      }
    `}</style>
  </button>
);
export default Button;