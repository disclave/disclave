import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { useIframeHeightListener } from "../../iframe";

export const DisclaveComments: React.VFC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const iframeHeight = useIframeHeightListener("200");

  useEffect(() => {
    const locationHref = window?.location?.href;
    if (!locationHref) return;

    try {
      const iframeUrl = getIframeUrl(locationHref);
      setUrl(iframeUrl);
    } catch (e) {
      console.error(e);
    }
  });

  if (!url) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: iframeHeight + "px" }}>
      <iframe src={url} className={styles.iframe} />
    </div>
  );
};
