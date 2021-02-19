import {renderHook} from "@testing-library/react-hooks";
import * as websiteAdaptersModule from "../../src/adapters/website";
import {WebsiteAdapterMock} from "../mocks/adapters/WebsiteAdapterMock";
import {useWebsite} from "../../src/hooks/useWebsite";

const host = 'google.com';
const path = '/test/path';
const query = '?query=val';
const url = `https://${host}${path}${query}`

const websiteAdapterMock = new WebsiteAdapterMock(url);
// @ts-ignore
websiteAdaptersModule.getAdapter = () => websiteAdapterMock;

test('should return website info', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useWebsite());

  expect(result.current).toBeNull()

  await waitForNextUpdate()

  const websiteInfo = result.current;
  expect(websiteInfo).not.toBeNull();
  expect(websiteInfo!.url.href).toEqual(url);
  expect(websiteInfo!.url.host).toEqual(host);
  expect(websiteInfo!.url.pathname).toEqual(path);
  expect(websiteInfo!.url.search).toEqual(query);
})
