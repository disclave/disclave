import classNames from 'classnames';
import React from 'react';
import { Dot } from './Dot';

export interface RowProps {
  title: string;
  text: string;
  imgSrc1: string;
  imgSrc2: string;
  inverted?: boolean;
}

export const Row: React.VFC<RowProps> = (props) => {
  const textColClassName = classNames('flex-1 px-16', {
    'text-right': !props.inverted,
    'order-2': props.inverted
  });

  const imgColClassName = classNames('flex-1 px-16 flex flex-row space-x-6', {
    'order-1': props.inverted
  });

  return (
    <div className="flex flex-row justify-center relative my-20">
      <div className={textColClassName}>
        <h3 className="text-xl pb-4">{props.title}</h3>
        <p>{props.text}</p>
      </div>
      <Dot />
      <div className={imgColClassName}>
        <div>
          <img src={props.imgSrc1} alt="" width={1080} height={2340} />
        </div>
        <div>
          <img src={props.imgSrc2} alt="" width={1080} height={2340} />
        </div>
      </div>
    </div>
  );
};
