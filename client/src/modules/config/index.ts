let _domain: string | undefined;

export const setDomain = (domain: string) => {
  _domain = domain;
};

export const getDomain = () => {
  if (!_domain) throw "App domain not initialized";
  return _domain;
};
