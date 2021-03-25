import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";
import styles from "./WebChatComments.module.css";

export const WebChatComments: React.VFC = () => {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(window.location.href);
  });

  if (!href) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <iframe src={getIframeUrl(href)} className={styles.iframe} />
    </div>
  );
};
