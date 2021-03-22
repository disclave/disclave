import { ParsedUrlQuery } from 'querystring';

export const valuesToParamsArray = (
  redirectPath?: string,
  redirectPathParamToEncode?: string
): string[] => {
  let params = [];
  if (redirectPath) params.push(`${RedirectQueryParams.RedirectPath}=${redirectPath}`);
  if (redirectPathParamToEncode)
    params.push(`${RedirectQueryParams.RedirectPathParamToEncode}=${redirectPathParamToEncode}`);

  return params;
};

export const routerQueryToRedirectUrl = (query: ParsedUrlQuery): string => {
  const redirectParams = routerQueryToRedirectParams(query);
  return redirectParamsToUrl(redirectParams);
};

export const routerQueryToRedirectParams = (query: ParsedUrlQuery): RedirectParams => {
  return {
    redirectPath: getQueryParam(query, RedirectQueryParams.RedirectPath),
    redirectPathParamToEncode: getQueryParam(query, RedirectQueryParams.RedirectPathParamToEncode)
  };
};

export const redirectParamsToUrl = (params: RedirectParams): string => {
  let url = '';

  if (!!params.redirectPath) url += params.redirectPath;

  if (!!params.redirectPathParamToEncode)
    url += encodeURIComponent(params.redirectPathParamToEncode);

  return url;
};

const RedirectQueryParams = {
  RedirectPath: 'r',
  RedirectPathParamToEncode: 'rpp'
};

interface RedirectParams {
  redirectPath?: string;
  redirectPathParamToEncode?: string;
}

const getQueryParam = (query: ParsedUrlQuery, param: string): string | undefined => {
  return query[param] as string | undefined;
};
