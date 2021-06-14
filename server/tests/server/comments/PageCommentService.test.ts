import { PageCommentRepository } from "@/modules/comments/page/db";
import { PageCommentRepositoryMock } from "../../mocks/PageCommentRepositoryMock";
import { ProfileService } from "@/modules/profiles";
import { ProfileServiceMock } from "../../mocks/ProfileServiceMock";
import { PageDetailsService } from "@/modules/pages/details";
import { PageDetailsServiceMock } from "../../mocks/PageDetailsServiceMock";
import { UrlService } from "@/modules/url";
import { Container } from "inversify";
import { UrlServiceImpl } from "@/modules/url/UrlServiceImpl";
import { PageComment, PageCommentService } from "@/modules/comments/page";
import { PageCommentServiceImpl } from "@/modules/comments/page/service/PageCommentServiceImpl";
import { asUserId } from "@/modules/auth";

describe("Testing PageCommentService", () => {
  const container = new Container();
  const urlService = new UrlServiceImpl();

  container.bind(UrlService).toConstantValue(urlService);
  container.bind(ProfileService).to(ProfileServiceMock);
  container.bind(PageDetailsService).to(PageDetailsServiceMock);
  container.bind(PageCommentRepository).to(PageCommentRepositoryMock);

  container.bind<PageCommentService>(PageCommentServiceImpl).toSelf();
  const service = container.get<PageCommentService>(PageCommentServiceImpl);

  afterEach(() => {
    PageCommentRepositoryMock.deleteAll();
  });

  test("should add and return comment", async () => {
    const userId = asUserId("user-id");
    const text = "Comment text!";
    const url = "https://google.com/example/path?q=123#bb";

    const normalized = urlService.normalizeUrl(url, true);
    const parsedUrl = urlService.parseUrl(normalized);
    const urlId = { websiteId: parsedUrl.websiteId, pageId: parsedUrl.pageId };

    const result = await service.addPageComment(userId, text, urlId, url);

    expectCommentToEqualInput(result, text);
  });

  test("should escape html in comment text", async () => {
    const userId = asUserId("user-id");
    const text = 'Comment to <b>be</b> "escaped" <script>alert(1)</script>';
    const url = "https://google.com/example/path?q=123#bb";

    const normalized = urlService.normalizeUrl(url, true);
    const parsedUrl = urlService.parseUrl(normalized);
    const urlId = { websiteId: parsedUrl.websiteId, pageId: parsedUrl.pageId };

    const result = await service.addPageComment(userId, text, urlId, url);

    expect(result.text).toEqual(
      "Comment to &lt;b&gt;be&lt;/b&gt; &quot;escaped&quot; &lt;script&gt;alert(1)&lt;/script&gt;"
    );
  });

  test("should throw if comment too short", async () => {
    const userId = asUserId("user-id");
    const text = "";
    const url = "https://google.com/example/path?q=123#bb";

    const normalized = urlService.normalizeUrl(url, true);
    const parsedUrl = urlService.parseUrl(normalized);
    const urlId = { websiteId: parsedUrl.websiteId, pageId: parsedUrl.pageId };

    await expect(async () => {
      await service.addPageComment(userId, text, urlId, url);
    }).rejects.toThrow();
  });

  test("should throw if comment too long", async () => {
    const userId = asUserId("user-id");
    const text = "w".repeat(10001);
    const url = "https://google.com/example/path?q=123#bb";

    const normalized = urlService.normalizeUrl(url, true);
    const parsedUrl = urlService.parseUrl(normalized);
    const urlId = { websiteId: parsedUrl.websiteId, pageId: parsedUrl.pageId };

    await expect(async () => {
      await service.addPageComment(userId, text, urlId, url);
    }).rejects.toThrow();
  });

  test("should return added comments", async () => {
    const userId = asUserId("user-id");
    const url = "https://google.com/example/path?q=123#bb";

    const normalized = urlService.normalizeUrl(url, true);
    const parsedUrl = urlService.parseUrl(normalized);
    const urlId = { websiteId: parsedUrl.websiteId, pageId: parsedUrl.pageId };

    const texts = ["Comment text 1!", "Comment text 2!", "Comment text 3!"];

    for (const t of texts) await service.addPageComment(userId, t, urlId, url);

    const result = await service.getPageComments(urlId, null);

    expect(result).toHaveLength(texts.length);
    for (const r of result) {
      const t = texts.find((t) => t == r.text);
      expect(t).not.toBeUndefined();
      expectCommentToEqualInput(r, t);
    }
  });

  test("should return comments only for selected url", async () => {
    const userId = asUserId("user-id");
    const comments = [
      {
        url: "https://google.com/example/path?q=123#bb",
        text: "Comment 1",
      },
      {
        url: "https://google.com/another/path?q=123#bb",
        text: "Comment 2",
      },
    ];

    for (const c of comments) {
      const normalized = urlService.normalizeUrl(c.url, true);
      const parsedUrl = urlService.parseUrl(normalized);
      const urlId = {
        websiteId: parsedUrl.websiteId,
        pageId: parsedUrl.pageId,
      };
      await service.addPageComment(userId, c.text, urlId, c.url);
    }

    for (const c of comments) {
      const normalized = urlService.normalizeUrl(c.url, true);
      const parsedUrl = urlService.parseUrl(normalized);
      const urlId = {
        websiteId: parsedUrl.websiteId,
        pageId: parsedUrl.pageId,
      };

      const result = await service.getPageComments(urlId, null);

      expect(result).toHaveLength(1);
      expectCommentToEqualInput(result[0], c.text);
    }
  });

  const expectCommentToEqualInput = (
    comment: PageComment,
    text: string
  ) => {
    expect(comment.id).not.toBeNull();
    expect(comment.id).not.toBe("");
    expect(comment.text).toEqual(text);
    expect(comment.timestamp).toEqual(
      PageCommentRepositoryMock.mockDate.toISOString()
    );
    expect(comment.author.name).toEqual(
      ProfileServiceMock.defaultUserProfile.name
    );
  };
});
