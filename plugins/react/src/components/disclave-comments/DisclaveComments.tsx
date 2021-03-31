import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";

export interface DisclaveCommentsProps {
  height?: string;
}

export const DisclaveComments: React.VFC<DisclaveCommentsProps> = ({
  height = "250",
}) => {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(window.location.href);
  });

  if (!href) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: height + "px" }}>
      <iframe src={getIframeUrl(href, height)} className={styles.iframe} />
    </div>
  );
};
