import {CommentEntity} from "./CommentEntity";
import {firestore} from "../../firebase/firebase";

interface UrlMeta {
  raw: string,
  websiteId: string,
  pageId: string
}

interface FirestoreComment {
  text: string,
  url: UrlMeta
}

export class CommentRepository {
  public async findComments(websiteId: string, pageId: string): Promise<Array<CommentEntity>> {
    const snapshot = await commentsCollectionRef(websiteId, pageId).get()
    return snapshot.docs.map(doc => {
      const data: FirestoreComment = doc.data()
      return {
        id: doc.id,
        text: data.text,
        websiteId: data.url.websiteId,
        pageId: data.url.pageId,
      }
    })
  }

  public async addComment(text: string, url: UrlMeta): Promise<CommentEntity> {
    const firestoreComment: FirestoreComment = {
      text: text,
      url: {
        raw: url.raw,
        websiteId: url.websiteId,
        pageId: url.pageId
      }
    }

    const doc = await commentsCollectionRef(url.websiteId, url.pageId)
      .add(firestoreComment)

    return {
      id: doc.id,
      text: text,
      websiteId: url.websiteId,
      pageId: url.pageId
    }
  }
}

const websitesCollection = 'websites'
const pagesCollection = 'pages'
const commentsCollection = 'comments'

const commentsCollectionRef = (websiteId: string, pageId: string) => {
  return firestore
    .collection(websitesCollection)
    .doc(websiteId)
    .collection(pagesCollection)
    .doc(pageId)
    .collection(commentsCollection)
}
