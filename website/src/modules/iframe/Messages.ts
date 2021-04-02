export enum MessageType {
  WINDOW_HEIGHT = 'disclave-window-height'
}

export const postMessageToParent = (message: string, targetOrigin: string = '*') => {
  if (!parent) {
    console.warn('Can not post message to parent. Parent is not available');
    return;
  }

  parent.postMessage(message, targetOrigin);
};
