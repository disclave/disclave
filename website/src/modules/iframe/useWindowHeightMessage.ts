import React, { useEffect } from 'react';
import { sendMessage, MessageType } from '@disclave/client';

export const useContainerHeightMessage = (containerRef: React.MutableRefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    if (!parent) {
      console.warn('Can not post message to parent. Parent is not available');
      return;
    }

    const message = {
      height: containerRef.current.clientHeight
    };

    sendMessage(parent, MessageType.WINDOW_HEIGHT, message, true);
  });
};
