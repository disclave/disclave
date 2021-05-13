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
  const colClassName = classNames('flex-1 pl-10 pr-2 lg:px-10 xl:px-16');

  const textColClassName = classNames(colClassName, {
    'lg:text-right': !props.inverted,
    'lg:order-2': props.inverted
  });

  const imgColClassName = classNames(colClassName, 'flex flex-row space-x-6', {
    'lg:order-1': props.inverted
  });

  return (
    <div className="flex flex-col lg:flex-row justify-center relative my-20">
      <div className={textColClassName}>
        <h3 className="text-2xl pb-4">{props.title}</h3>
        <p className="pb-8">{props.text}</p>
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
