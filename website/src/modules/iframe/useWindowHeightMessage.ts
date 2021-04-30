import React, { useEffect } from 'react';
import { sendMessage, MessageType } from '@disclave/client';

export const useContainerHeightMessage = (containerRef: React.MutableRefObject<HTMLElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    if (!parent) {
      console.warn('Can not post message to parent. Parent is not available');
      return;
    }

    // TODO: update plugin to handle new message content
    const message = {
      type: MessageType.WINDOW_HEIGHT,
      content: {
        height: containerRef.current.clientHeight
      }
    };

    sendMessage(parent, MessageType.WINDOW_HEIGHT, message);
  });
};
