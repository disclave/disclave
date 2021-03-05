import {CommentEntity} from "./CommentEntity";
import {admin, firestore} from "../../firebase/firebase";

type CollectionReference<T> = admin.firestore.CollectionReference<T>;

interface UrlMeta {
  raw: string,
  websiteId: string,
  pageId: string
}

interface FirestoreComment {
  text: string,
  timestamp: admin.firestore.Timestamp,
  url: UrlMeta
}

export class CommentRepository {
  public async findComments(websiteId: string, pageId: string): Promise<Array<CommentEntity>> {
    const snapshot = await commentsCollectionRef(websiteId, pageId).get()
    return snapshot.docs.map(docToEntity)
  }

  public async addComment(text: string, url: UrlMeta): Promise<CommentEntity> {
    const firestoreComment: FirestoreComment = {
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      url: {
        raw: url.raw,
        websiteId: url.websiteId,
        pageId: url.pageId
      }
    }

    const doc = await commentsCollectionRef(url.websiteId, url.pageId)
      .add(firestoreComment)

    return docToEntity(doc)
  }
}

const websitesCollection = 'websites'
const pagesCollection = 'pages'
const commentsCollection = 'comments'

const docToEntity = (doc:  CollectionReference<FirestoreComment>): CommentEntity => {
  const data: FirestoreComment = doc.data()
  return {
    id: doc.id,
    text: data.text,
    timestamp: data.timestamp.toMillis(),
    url: {
      raw: data.url.raw,
      websiteId: data.url.websiteId,
      pageId: data.url.pageId
    }
  }
}

const commentsCollectionRef = (websiteId: string, pageId: string) => {
  return firestore
    .collection(websitesCollection)
    .doc(websiteId)
    .collection(pagesCollection)
    .doc(pageId)
    .collection(commentsCollection)
}
