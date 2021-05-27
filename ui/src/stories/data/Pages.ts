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
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: "https://disclave.com/favicon.ico",
    title: "Example page title - this is awesome page!",
  },
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: false,
  },
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
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: "https://disclave.com/favicon.ico",
    title: "Example page title - this is awesome page!",
  },
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: false,
  },
};

export const ExamplePageWithoutLogo: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: null,
    title: "Example page title - this is awesome page!",
  },
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: false,
  },
};

export const ExamplePageWithoutTitle: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: "https://disclave.com/favicon.ico",
    title: null,
  },
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: false,
  },
};

export const ExamplePageWithoutMeta: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
  url: "https://example.com/page/with/example/url",
  meta: null,
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: false,
  },
};

export const ExamplePageVotedUp: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: "https://disclave.com/favicon.ico",
    title: "Example page title - this is awesome page!",
  },
  votes: {
    sum: 325,
    votedDown: false,
    votedUp: true,
  },
};

export const ExamplePageVotedDown: PageModel = {
  id: "example.com%2Fpath",
  pageId: "%2Fpath",
  websiteId: "example.com",
  commentsCount: 1325,
  url: "https://example.com/page/with/example/url",
  meta: {
    logo: "https://disclave.com/favicon.ico",
    title: "Example page title - this is awesome page!",
  },
  votes: {
    sum: 325,
    votedDown: true,
    votedUp: false,
  },
};
