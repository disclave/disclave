import { initFirebase } from "./firebase/firebase";
import { container } from "./inversify.config";
import { CommentService } from "./comments";

export const init = (firebaseServiceAccountObject: Object) => {
  initFirebase(firebaseServiceAccountObject);
};

export { graphqlHandler } from "./graphql";
export const getCommentService = () => container.get(CommentService);
