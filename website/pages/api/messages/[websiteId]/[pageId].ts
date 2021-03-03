import {NextApiRequest, NextApiResponse} from "next";
import {MessageService} from "../../../../server/messages/MessageService";

const service = new MessageService();

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      websiteId,
      pageId
    }
  } = req

  // TODO: add request params validation

  const response = await service.getMessages(websiteId as string, pageId as string)

  res.status(200).json(response)
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      websiteId,
      pageId
    }
  } = req

  // TODO: add request params and body validation

  const text = req.body

  const response = service.addMessage(text, websiteId as string, pageId as string)

  res.status(200).json(response)
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getHandler(req, res)
  } else if (req.method === 'POST') {
    await postHandler(req, res)
  }
}
