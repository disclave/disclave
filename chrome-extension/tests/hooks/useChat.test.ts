import {renderHook} from "@testing-library/react-hooks";
import {ApiAdapterMock} from "../mocks/adapters/ApiAdapterMock";
import {useChat} from "../../src/hooks/useChat";
import {WebsiteAdapterMock} from "../mocks/adapters/WebsiteAdapterMock";
import {setApiAdapter, setWebsiteAdapter} from "@webchat/core";

const apiAdapterMock = new ApiAdapterMock();
setApiAdapter(apiAdapterMock)

const websiteAdapterMock = new WebsiteAdapterMock('https://google.com');
setWebsiteAdapter(websiteAdapterMock)

test('should return current messages', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useChat());

  let [messages] = result.current;
  expect(messages).toHaveLength(0);

  await waitForNextUpdate();

  [messages] = result.current;
  expect(messages).toHaveLength(1);

  // TODO: verify message contend
})

// TODO: add tests for 'addMessage' method

