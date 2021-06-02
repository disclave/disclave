import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { useIframeHeightListener } from "../../iframe";

export interface DisclaveCommentsProps {
  hideVotes?: boolean;
}

export const DisclaveComments: React.VFC<DisclaveCommentsProps> = ({
  hideVotes = false,
}) => {
  console.info("DisclaveComments");
  const [url, setUrl] = useState<string | null>(null);
  const iframeHeight = useIframeHeightListener(hideVotes ? "200" : "250");

  console.info(url, iframeHeight);

  useEffect(() => {
    const locationHref = window?.location?.href;
    console.info("locationHref", locationHref);
    if (!locationHref) return;

    try {
      const iframeUrl = getIframeUrl(locationHref, {
        hideVotes,
      });
      setUrl(iframeUrl);
    } catch (e) {
      console.error("DisclaveComments - set url error.", e);
    }
  });

  if (!url) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: iframeHeight + "px" }}>
      <iframe src={url} className={styles.iframe} />
    </div>
  );
};
