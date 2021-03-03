import {MessageEntity} from "./MessageEntity";
import {firestore} from "../../firebase/firebase";

const websitesCollection = 'websites'
const pagesCollection = 'pages'
const messagesCollection = 'messages'

export class MessageRepository {
  public async findMessages(websiteId: string, pageId: string): Promise<Array<MessageEntity>> {
    const snapshot = await MessageRepository.getMessagesCollectionRef(websiteId, pageId)
      .get()

    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        text: doc.data().text,
        websiteId: websiteId,
        pageId: pageId
      }
    })
  }

  public async saveMessage(text: string, websiteId: string, pageId: string): Promise<MessageEntity> {
    const ref = MessageRepository.getMessagesCollectionRef(websiteId, pageId)

    const doc = await ref.add({
      text
    })

    return {
      id: doc.id,
      text,
      websiteId,
      pageId
    }
  }

  private static getMessagesCollectionRef(websiteId: string, pageId: string) {
    return firestore
      .collection(websitesCollection)
      .doc(websiteId)
      .collection(pagesCollection)
      .doc(pageId)
      .collection(messagesCollection)
  }
}
