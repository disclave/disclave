import React, { useRef, useState } from "react";
import { useOutsideAlerter } from "@/hooks";
import classNames from "classnames";

export interface ActivatorProps {
  onClick: () => unknown;
}

export interface MenuProps {
  activator: React.ReactElement<ActivatorProps>;
  top?: boolean;
  left?: boolean;
}

export const Menu: React.FC<MenuProps> = (props) => {
  const [opened, setOpened] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpened(false));

  const onClickActivator = () => {
    setOpened(!opened);
  };

  const menuClassName = classNames(
    "absolute w-max",
    { "bottom-full": props.top },
    { "right-0": props.left },
    { hidden: !opened }
  );

  return (
    <div ref={wrapperRef} className="relative w-max">
      {React.cloneElement(props.activator, {
        ...props.activator.props,
        onClick: onClickActivator,
      })}
      <div className={menuClassName}>{props.children}</div>
    </div>
  );
};
