import React from "react";

type AnchorWrapper = React.FC<React.HTMLProps<HTMLAnchorElement>>;

let anchorWrapper: AnchorWrapper | null = null;

export const setAnchorWrapper = (wrapper: AnchorWrapper) => {
  anchorWrapper = wrapper;
};

export const getAnchorWrapper = () => anchorWrapper;
