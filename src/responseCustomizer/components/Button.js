import React from 'react';

const buttonStyle = {
  backgroundColor: '#408cec',
  border: 0,
  padding: '12px 20px',
  color: '#fff',
  margin: 10,
  borderRadius: 3,
};

const Button = ({ onModalResponseButtonClick, text }) => (
  <button
    type="button"
    style={{ ...buttonStyle }}
    onClick={onModalResponseButtonClick}
    data-response={text}>
    {text}
  </button>
);
export default Button;
