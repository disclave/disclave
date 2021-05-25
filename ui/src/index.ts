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
export { Vote } from "./components/voting";
export {
  LoginFormContainer,
  RegisterFormContainer,
  UserSelfAvatar,
} from "./components/auth";
export {
  PreviewCommentsList,
  PageCommentsList,
  PageCommentsContainer,
} from "./components/comments";
export { PagesList } from "./components/pages";
