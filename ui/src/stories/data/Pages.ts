import { PageModel } from "@/components/pages/PageModel";
import { randomInt } from "./helpers";

export interface BuildExamplePageProps {
  websiteId?: string;
  pageId?: string;
  commentsCount?: number;
}

export const buildExamplePage = ({
  websiteId = "example.com",
  pageId = "%2Fpage%2Fwith%2Fexample%2Furl",
  commentsCount = randomInt(1, 10000),
}: BuildExamplePageProps): PageModel => ({
  id: websiteId + pageId + Math.random(),
  websiteId: websiteId,
  pageId: pageId,
  commentsCount: commentsCount,
});

export const RandomPagesList = (size: number): PageModel[] => {
  const result: PageModel[] = [];
  while (size--) {
    result.push(buildExamplePage({}));
  }
  return result;
};

export const ExamplePage: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
};
