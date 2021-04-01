import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { useMessageListener } from "../../helpers/useMessageListener";

export interface DisclaveCommentsProps {
  height?: string;
}

export const DisclaveComments: React.VFC<DisclaveCommentsProps> = ({
  height = "350",
}) => {
  const [url, setUrl] = useState<string>();
  const [iframeHeight, setIframeHeight] = useState<string>(height);

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
      <iframe src={getIframeUrl(url, iframeHeight)} className={styles.iframe} />
    </div>
  );
};
