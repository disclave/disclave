import "./index.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export { changeLanguage } from "./i18n";
export { setAnchorWrapper } from "./config";

export { useLoading } from "./hooks";

export { Loading } from "./components/loading";
export { Button } from "./components/button";
export { Menu } from "./components/menu";
export {
  FormFactory,
  FormErrorContainer,
  TextField,
  TextArea,
} from "./components/forms";

export {
  LoginFormContainer,
  RegisterFormContainer,
  UserSelfAvatar,
} from "./components/auth";
export { CommentsList, CommentsContainer } from "./components/comments";
