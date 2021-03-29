import React, { useRef, useState } from "react";
import { useOutsideAlerter } from "../../hooks";

export interface ActivatorProps {
  onClick: () => unknown;
}

export interface MenuProps {
  activator: React.ReactElement<ActivatorProps>;
  top?: boolean;
}

export const Menu: React.FC<MenuProps> = (props) => {
  const [opened, setOpened] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpened(false));

  const onClickActivator = () => {
    setOpened(!opened);
  };

  const menuClassName = [
    "absolute",
    props.top ? "bottom-full" : "",
    !opened ? "hidden" : "",
  ].join(" ");

  return (
    <div ref={wrapperRef} className="relative">
      {React.cloneElement(props.activator, {
        ...props.activator.props,
        onClick: onClickActivator,
      })}
      <div className={menuClassName}>{props.children}</div>
    </div>
  );
};
