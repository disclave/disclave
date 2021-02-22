import {ApiAdapterMock} from "../../mocks/adapters/ApiAdapterMock";
import {Chat} from "../../../src";

test('should get messages from api', async () => {
  const apiAdapter = new ApiAdapterMock()
  const chat = new Chat(apiAdapter)

  const messages = await chat.getMessages();

  expect(messages).toHaveLength(1);
})
