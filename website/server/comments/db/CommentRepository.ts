import {CommentEntity} from "./CommentEntity"
import {
  admin,
  DocumentData,
  firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "../../firebase/firebase"

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
  public async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const snapshot = await commentsCollectionRef(url.websiteId, url.pageId).get()
    return snapshot.docs.map(d => d.data())
  }

  public async addComment(text: string, url: UrlMeta): Promise<CommentEntity> {
    const entity: CommentEntity = {
      id: '',
      text: text,
      timestamp: 0,
      url: {
        raw: url.raw,
        websiteId: url.websiteId,
        pageId: url.pageId
      }
    }

    const result = await commentsCollectionRef(url.websiteId, url.pageId)
      .add(entity)
    const doc = await result.withConverter(commentConverter).get()
    console.log(doc.data())
    return doc.data()
  }
}

const commentConverter: FirestoreDataConverter<CommentEntity> = {
  toFirestore(entity: CommentEntity): DocumentData<FirestoreComment> {
    return {
      text: entity.text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      url: {
        raw: entity.url.raw,
        websiteId: entity.url.websiteId,
        pageId: entity.url.pageId
      }
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<FirestoreComment>): CommentEntity {
    const data: FirestoreComment = snapshot.data()
    return {
      id: snapshot.id,
      text: data.text,
      timestamp: data.timestamp.toMillis(),
      url: {
        raw: data.url.raw,
        websiteId: data.url.websiteId,
        pageId: data.url.pageId
      }
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
    .withConverter(commentConverter)
}
