import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { useMessageListener } from "../../helpers/useMessageListener";

export const DisclaveComments: React.VFC = () => {
  const [url, setUrl] = useState<string>();
  const [iframeHeight, setIframeHeight] = useState<string>("100");

  useMessageListener((ev) => {
    const data = JSON.parse(ev.data);
    if (data.type == "disclave-window-height") setIframeHeight(data.height);
  });

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
