import React from "react";
import btnNormal from "../../../images/google_signin_buttons/web/vector/btn_google_dark_normal.svg";
import { Button } from "@/components/button";

export interface GoogleBtnProps {
  onClick: () => void;
}

export const GoogleBtn: React.VFC<GoogleBtnProps> = (props) => {
  return (
    <Button icon flat onClick={props.onClick}>
      <img src={btnNormal} alt="" />
    </Button>
  );
};
