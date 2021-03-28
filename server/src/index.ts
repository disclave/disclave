import { initFirebase } from "./firebase/firebase";
import { container } from "./inversify.config";
import { CommentService } from "./comments";
import { initDatabase } from "./mongodb";

export const init = async (firebaseServiceAccountObject: Object, dbUri: string, dbName: string) => {
  initFirebase(firebaseServiceAccountObject);
  await initDatabase(dbUri, dbName);
};

export { graphqlHandler } from "./graphql";
export const getCommentService = () => container.get(CommentService);
