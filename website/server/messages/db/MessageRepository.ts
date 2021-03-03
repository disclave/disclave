import {MessageEntity} from "./MessageEntity";
import {firestore} from "../../firebase/firebase";

export class MessageRepository {
  public async findMessages(websiteId: string, pageId: string): Promise<Array<MessageEntity>> {
    const snapshot = await firestore
      .collection('websites')
      .doc(websiteId)
      .collection('pages')
      .doc(pageId)
      .collection('messages')
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
    const ref = firestore
      .collection('websites')
      .doc(entity.websiteId)
      .collection('pages')
      .doc(entity.pageId)
      .collection('messages')

    await ref.add(entity)

    return entity
  }
}
