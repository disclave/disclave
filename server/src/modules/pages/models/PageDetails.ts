export interface PageDetails {
  websiteId: string;
  pageId: string;
  url: string;
  meta: null | {
    title: string | null;
    logo: string | null;
  };
}
