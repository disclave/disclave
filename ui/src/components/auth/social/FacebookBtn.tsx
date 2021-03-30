import React from "react";
import facebookIcon from "../../../images/facebook/Facebook_icon.svg";
import { Button } from "@/components/button";

export interface FacebookBtnProps {
  disabled?: boolean;
  onClick: () => void;
}

export const FacebookBtn: React.VFC<FacebookBtnProps> = (props) => {
  return (
    <Button icon flat disabled={props.disabled} onClick={props.onClick}>
      <img src={facebookIcon} alt="" className="w-12 h-12 p-1" />
    </Button>
  );
};
