import "./index.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export { changeLanguage } from "./i18n";
export { setAnchorWrapper } from "./config";

export { useLoading } from "./hooks";

export { DateTimePreview } from "./components/date/dateTimePreview";
export { Loading } from "./components/loading";
export { Button } from "./components/button";
export { Menu } from "./components/menu";
export { SkeletonBox } from "./components/loading";
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
  RankingCommentsList,
  PageCommentsList,
  PageCommentsContainer,
} from "./components/comments";
export { PagesList, PageVoting } from "./components/pages";
