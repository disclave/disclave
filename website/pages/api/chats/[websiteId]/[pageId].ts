import {NextApiRequest, NextApiResponse} from "next";
// import {ChatService} from "@webchat/core";
// import {ChatRepositoryMock} from "../../../../../core/tests/mocks/ChatRepositoryMock";

// // TODO: change to real DB repository
// const repository = new ChatRepositoryMock()
// const chatService = new ChatService(repository)

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      websiteId,
      pageId
    }
  } = req

  // TODO: add request params validation

  // const response = await chatService.getMessages(websiteId as string, pageId as string)
  const response = "test get"

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
  const request = {
    text,
    websiteId: websiteId as string,
    pageId: pageId as string
  }

  // const response = await chatService.postMessage(request)
  const response = "test post"

  res.status(200).json(response)
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getHandler(req, res)
  } else if (req.method === 'POST') {
    await postHandler(req, res)
  }
}
