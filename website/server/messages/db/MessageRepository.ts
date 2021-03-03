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

  public async saveMessage(entity: MessageEntity): Promise<MessageEntity> {
    const ref = MessageRepository.getMessagesCollectionRef(entity.websiteId, entity.pageId)

    await ref.add(entity)

    return entity
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
