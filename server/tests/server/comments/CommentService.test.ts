import { CommentRepository } from "../../../src/comments/db";
import { CommentRepositoryMock } from "../../mocks/CommentRepositoryMock";
import { UserService } from "../../../src/users";
import { UserServiceMock } from "../../mocks/UserServiceMock";
import { ParsedUrlData, UrlService } from "../../../src/url";
import { Container } from "inversify";
import { UrlServiceImpl } from "../../../src/url/UrlServiceImpl";
import { Comment, CommentService } from "../../../src/comments";
import { CommentServiceImpl } from "../../../src/comments/CommentServiceImpl";

describe("Testing CommentService", () => {
  const container = new Container();
  const urlService = new UrlServiceImpl();

  container.bind(UrlService).toConstantValue(urlService);
  container.bind(UserService).to(UserServiceMock);
  container.bind(CommentRepository).to(CommentRepositoryMock);

  container.bind<CommentService>(CommentServiceImpl).toSelf();
  const service = container.get<CommentService>(CommentServiceImpl);

  afterEach(() => {
    CommentRepositoryMock.deleteAll();
  });

  test("should add and return comment", async () => {
    const idToken = "id-token";
    const text = "Comment text!";
    const url = "https://google.com/example/path?q=123#bb";
    const parsedUrl = urlService.parseUrl(url);

    const result = await service.addComment(idToken, text, url);

    expectCommentToEqualInput(result, text, parsedUrl);
  });

  test("should escape html in comment text", async () => {
    const idToken = "id-token";
    const text = 'Comment to <b>be</b> "escaped" <script>alert(1)</script>';
    const url = "https://google.com/example/path?q=123#bb";

    const result = await service.addComment(idToken, text, url);

    expect(result.text).toEqual(
      "Comment to &lt;b&gt;be&lt;/b&gt; &quot;escaped&quot; &lt;script&gt;alert(1)&lt;/script&gt;"
    );
  });

  test("should throw if comment too short", async () => {
    const idToken = "id-token";
    const text = "";
    const url = "https://google.com/example/path?q=123#bb";

    await expect(async () => {
      await service.addComment(idToken, text, url);
    }).rejects.toThrow();
  });

  test("should throw if comment too long", async () => {
    const idToken = "id-token";
    const text = "w".repeat(10001);
    const url = "https://google.com/example/path?q=123#bb";

    await expect(async () => {
      await service.addComment(idToken, text, url);
    }).rejects.toThrow();
  });

  test("should return added comments", async () => {
    const idToken = "id-token";
    const url = "https://google.com/example/path?q=123#bb";
    const parsedUrl = urlService.parseUrl(url);
    const texts = ["Comment text 1!", "Comment text 2!", "Comment text 3!"];

    for (const t of texts) await service.addComment(idToken, t, url);

    const result = await service.getComments(url, null);

    expect(result).toHaveLength(texts.length);
    for (const r of result) {
      const t = texts.find((t) => t == r.text);
      expect(t).not.toBeUndefined();
      expectCommentToEqualInput(r, t, parsedUrl);
    }
  });

  test("should return comments only for selected url", async () => {
    const idToken = "id-token";
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

    for (const c of comments) await service.addComment(idToken, c.text, c.url);

    for (const c of comments) {
      const parsedUrl = urlService.parseUrl(c.url);
      const result = await service.getComments(c.url, null);

      expect(result).toHaveLength(1);
      expectCommentToEqualInput(result[0], c.text, parsedUrl);
    }
  });

  const expectCommentToEqualInput = (
    comment: Comment,
    text: string,
    parsedUrl: ParsedUrlData
  ) => {
    expect(comment.id).not.toBeNull();
    expect(comment.id).not.toBe("");
    expect(comment.text).toEqual(text);
    expect(comment.timestamp).toEqual(
      CommentRepositoryMock.mockDate.toISOString()
    );
    expect(comment.urlMeta.websiteId).toEqual(parsedUrl.websiteId);
    expect(comment.urlMeta.pageId).toEqual(parsedUrl.pageId);
    expect(comment.author.id).toEqual(UserServiceMock.defaultUserProfile.uid);
    expect(comment.author.name).toEqual(
      UserServiceMock.defaultUserProfile.name
    );
  };
});
