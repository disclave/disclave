import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { countComments } from "../../api";

export interface DisclaveCommentsProps {
  height?: string;
}

export const DisclaveComments: React.VFC<DisclaveCommentsProps> = ({
  height = "350",
}) => {
  const [href, setHref] = useState<string>();
  const [count, setCount] = useState<number>(0);
  const [iframeHeight, setIframeHeight] = useState<string>(height);

  useEffect(() => {
    setHref(window.location.href);
  });

  useEffect(() => {
    if (!href) return;

    const getCommentsCount = async () => {
      const result = await countComments(href);
      setCount(result);
    };

    getCommentsCount();
  }, [href]);

  useEffect(() => {
    if (count == 0) setIframeHeight("200");
    else setIframeHeight(height);
  }, [count]);

  if (!href) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: iframeHeight + "px" }}>
      <iframe
        src={getIframeUrl(href, iframeHeight)}
        className={styles.iframe}
      />
    </div>
  );
};
