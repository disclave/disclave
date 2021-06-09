import classNames from 'classnames';
import React, { useState } from 'react';

export interface ImageProps {
  src: string;
  title: string;
  width: number;
  height: number;
}

export const Image: React.VFC<ImageProps> = ({ src, title, width, height }) => {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const wrapperClassName = classNames('cursor-pointer', {
    'my-5 group': !active,
    'fixed left-0 top-0 z-50 w-screen h-screen bg-white bg-opacity-90': active
  });

  const figureClassName = classNames({
    'relative w-full h-full': active
  });

  const imageClassName = classNames('border', {
    'rounded group-hover:shadow': !active,
    'absolute m-0 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-full max-h-full':
      active
  });

  const captionClassName = classNames({
    'my-2 text-center text-sm text-gray-400': !active,
    hidden: active
  });

  return (
    <div className={wrapperClassName} onClick={toggleActive}>
      <figure className={figureClassName}>
        <img src={src} alt={title} width={width} height={height} className={imageClassName} />
        <figcaption className={captionClassName}>{title}</figcaption>
      </figure>
    </div>
  );
};
