import React, { useEffect } from 'react';
import { MessageType, postMessageToParent } from './Messages';

export const useContainerHeightMessage = (containerRef: React.MutableRefObject<HTMLElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const message = {
      type: MessageType.WINDOW_HEIGHT,
      height: containerRef.current.clientHeight
    };
    postMessageToParent(JSON.stringify(message));
  });
};
