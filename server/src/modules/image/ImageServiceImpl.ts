import { Bucket, uploadFlie } from "@/connectors/aws";
import { injectable } from "inversify";
import { ImageService } from ".";
import { ParsedUrlData } from "../url";

@injectable()
export class ImageServiceImpl implements ImageService {
  public async savePageLogo(
    page: ParsedUrlData,
    logoUrl: string | null
  ): Promise<string | null> {
    if (!logoUrl) return null;
    try {
      const response = await fetch(logoUrl);
      const buffer = await response.arrayBuffer();
      return await uploadFlie(
        Bucket.PAGES_BUCKET,
        "logo/" + page.websiteId + page.pageId + ".jpeg",
        "image/jpeg",
        buffer
      );
    } catch (e) {
      console.warn("savePageLogo", e);
    }
    return null;
  }
}
