let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

export const openPopupWindow = (url: string, name: string) => {
  const features = "toolbar=no, menubar=no, width=600, height=600";

  if (windowObjectReference === null || windowObjectReference.closed) {
    windowObjectReference = window.open(url, name, features);
  } else if (previousUrl !== url) {
    windowObjectReference = window.open(url, name, features);
    windowObjectReference?.focus();
  } else {
    windowObjectReference.focus();
  }

  previousUrl = url;
};
