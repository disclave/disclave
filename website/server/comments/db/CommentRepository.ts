import {CommentEntity} from "./CommentEntity";
import {firestore} from "../../firebase/firebase";

export class CommentRepository {
  public async findComments(websiteId: string, pageId: string): Promise<Array<CommentEntity>> {
    const snapshot = await commentsCollectionRef(websiteId, pageId).get()
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        text: doc.data().text,
        websiteId: websiteId,
        pageId: pageId
      }
    })
  }

  public async addComment(text: string, websiteId: string, pageId: string): Promise<CommentEntity> {
    const doc = await commentsCollectionRef(websiteId, pageId).add({
      text
    })

    return {
      id: doc.id,
      text,
      websiteId,
      pageId
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
