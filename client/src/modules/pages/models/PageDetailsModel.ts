export interface PageDetailsModel {
  url: string;
  pageId: string;
  websiteId: string;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
}
