import { loginWithFacebook, loginWithGoogle } from "@disclave/client";
import { addMessageListener, MessageType } from "./messages";
import "./init";

addMessageListener(async (request, sender) => {
  switch (request.type) {
    case MessageType.LOGIN_FACEBOOK:
      return await loginWithFacebook();
    case MessageType.LOGIN_GOOGLE:
      return await loginWithGoogle();
  }
});
