import {Chat} from "../../../src/modules/chat";
import {ApiAdapterMock} from "../../mocks/adapters/ApiAdapterMock";

test('should get messages from api', async () => {
  const apiAdapter = new ApiAdapterMock()
  const chat = new Chat(apiAdapter)

  const messages = chat.getMessages();

  expect(messages).toHaveLength(1);

})
