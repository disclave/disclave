import React, { useEffect, useState } from "react";
import { getIframeUrl } from "../../helpers/UrlHelper";

export const WebChatComments: React.VFC = () => {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(window.location.href);
  });

  if (!href) return <div>Loading...</div>;

  return <iframe src={getIframeUrl(href)} />;
};
