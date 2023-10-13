
import React from 'react';

const Image = ({ src, alt, priority, ...props }) => {
  return <img src={src} alt={alt} {...props}/>;
};


export default Image;
