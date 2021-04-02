import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { useIframeHeightListener } from "../../iframe";

export const DisclaveComments: React.VFC = () => {
  const [url, setUrl] = useState<string>();
  const iframeHeight = useIframeHeightListener("200");

  useEffect(() => {
    setUrl(window.location.href);
  });

  if (!url) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: iframeHeight + "px" }}>
      <iframe src={getIframeUrl(url)} className={styles.iframe} />
    </div>
  );
};
