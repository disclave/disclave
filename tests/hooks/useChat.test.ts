import {renderHook} from "@testing-library/react-hooks";
import * as apiAdaptersModule from "../../src/adapters/api";
import * as websiteAdaptersModule from "../../src/adapters/website";
import {ApiAdapterMock} from "../mocks/adapters/ApiAdapterMock";
import {useChat} from "../../src/hooks/useChat";
import {WebsiteAdapterMock} from "../mocks/adapters/WebsiteAdapterMock";

const apiAdapterMock = new ApiAdapterMock();
// @ts-ignore
apiAdaptersModule.getAdapter = () => apiAdapterMock;

const websiteAdapterMock = new WebsiteAdapterMock('https://google.com');
// @ts-ignore
websiteAdaptersModule.getAdapter = () => websiteAdapterMock;

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

