import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./DisclaveComments.module.css";
import { countComments } from "../../api";
import { useMessageListener } from "../../helpers/useMessageListener";

export interface DisclaveCommentsProps {
  height?: string;
}

export const DisclaveComments: React.VFC<DisclaveCommentsProps> = ({
  height = "350",
}) => {
  const [url, setUrl] = useState<string>();
  const [count, setCount] = useState<number>(0);
  const [iframeHeight, setIframeHeight] = useState<string>(height);

  const getCommentsCount = async () => {
    if (!url) return;

    const result = await countComments(url);
    setCount(result);
  };

  const onNewMessage = () => getCommentsCount();

  useMessageListener((ev) => {
    if (ev.data == "disclave-new-message") onNewMessage();
  });

  useEffect(() => {
    setUrl(window.location.href);
  });

  useEffect(() => {
    getCommentsCount();
  }, [url]);

  useEffect(() => {
    if (count == 0) setIframeHeight("200");
    else if (count > 7) setIframeHeight("750");
    else setIframeHeight(height);
  }, [count]);

  if (!url) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper} style={{ height: iframeHeight + "px" }}>
      <iframe src={getIframeUrl(url, iframeHeight)} className={styles.iframe} />
    </div>
  );
};
