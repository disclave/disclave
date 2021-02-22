import {IWebsiteInfo} from "../../src/adapters/website";
import {renderHook} from "@testing-library/react-hooks";
import {useApi} from "../../src/hooks/useApi";
import {ApiAdapterMock} from "../mocks/adapters/ApiAdapterMock";
import {setAdapter} from "../../src/adapters/api";

const apiAdapterMock = new ApiAdapterMock();
setAdapter(apiAdapterMock)

test('should not return api if no website info provided', () => {
  const websiteInfo: IWebsiteInfo | null = null;

  const { result } = renderHook(() => useApi(websiteInfo));

  expect(result.current).toBeNull();
})

test('should return api adapter', () => {
  const websiteInfo: IWebsiteInfo | null = {
    url: new URL('https://google.com')
  };

  const { result } = renderHook(() => useApi(websiteInfo));

  expect(result.current).toEqual(apiAdapterMock)
})

