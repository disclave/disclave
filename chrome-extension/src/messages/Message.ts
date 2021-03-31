export enum MessageType {
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
}

export interface Request {
  type: MessageType;
  content?: any;
}

type Response = any;

type Listener = (
  request: Request,
  sender: any
) => Promise<Response | undefined> | Response | undefined;

export const addMessageListener = (listener: Listener) => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = listener(request, sender);

    if (result && typeof result.then === "function") {
      result.then((response) => sendResponse(response));
      return true;
    }

    return result;
  });
};

export const sendMessage = async (request: Request): Promise<Response> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(request, (response: Response) => {
      resolve(response);
    });
  });
};
