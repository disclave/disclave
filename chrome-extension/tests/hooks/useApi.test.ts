import {renderHook} from "@testing-library/react-hooks";
import {useApi} from "../../src/hooks/useApi";
import {ApiAdapterMock} from "../mocks/adapters/ApiAdapterMock";
import {setApiAdapter} from "@webchat/core";

const apiAdapterMock = new ApiAdapterMock();
setApiAdapter(apiAdapterMock)

test('should return api adapter', () => {
  const { result } = renderHook(() => useApi());

  expect(result.current).toEqual(apiAdapterMock)
})

