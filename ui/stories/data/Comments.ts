import { CommentModel } from "../../../website/modules/comments/CommentModel";

export const ExampleComment: CommentModel = {
  id: "mock-comment-id",
  text: "This is example comment text!",
  author: {
    id: "mock-author-id",
    name: "author_name",
  },
  timestamp: new Date().toISOString(),
  urlMeta: {
    websiteId: "google.com",
    pageId: "%2Fexample%2Fpath",
  },
};

// export const ExampleCommentsList: CommentModel[] = {
//
// }
