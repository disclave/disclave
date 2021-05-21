export interface PageDetailsEntity {
  pageId: string;
  websiteId: string;
  meta: {
    logo: string | null;
    title: string | null;
  };
}
