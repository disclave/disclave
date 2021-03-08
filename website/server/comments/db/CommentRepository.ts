import {CommentEntity} from "./CommentEntity"
import {
  admin,
  firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "../../firebase"
import {AuthorInfo, ICommentRepository, UrlMeta} from "./index";




interface FirestoreComment {
  text: string,
  author: AuthorInfo,
  timestamp: admin.firestore.Timestamp | admin.firestore.FieldValue,
  url: UrlMeta
}

export class CommentRepository implements ICommentRepository{
  public async findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    const snapshot = await commentsCollectionRef(url.websiteId, url.pageId)
      .orderBy('timestamp', 'asc')
      .get()
    return snapshot.docs.map(d => d.data())
  }

  public async addComment(author: AuthorInfo, text: string, url: UrlMeta): Promise<CommentEntity> {
    const result = await commentsCollectionRef(url.websiteId, url.pageId)
      .add(toCommentEntity(author, text, url))
    const doc = await result.get()
    return doc.data()
  }
}

const toCommentEntity = (author: AuthorInfo, text: string, url: UrlMeta): CommentEntity => ({
  id: '',
  text: text,
  author: {
    id: author.id,
    name: author.name
  },
  timestamp: '',
  url: {
    raw: url.raw,
    websiteId: url.websiteId,
    pageId: url.pageId
  }
})

const commentConverter: FirestoreDataConverter<CommentEntity> = {
  toFirestore(entity: CommentEntity): FirestoreComment {
    return {
      text: entity.text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      author: {
        id: entity.author.id,
        name: entity.author.name
      },
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
      author: {
        id: data.author.id,
        name: data.author.name
      },
      timestamp: (data.timestamp as admin.firestore.Timestamp).toDate().toISOString(),
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
