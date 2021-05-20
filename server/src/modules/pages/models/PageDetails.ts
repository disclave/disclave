export interface PageDetails {
  websiteId: string;
  pageId: string;
  url: string;
  refreshRequired: boolean;
  title: string | null;
  logo: string | null;
}