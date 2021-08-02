import { Bucket, uploadFlie } from "@/connectors/aws";
import { injectable } from "inversify";
import { ImageService } from ".";
import { ParsedUrlData } from "../url";
import sharp from "sharp";
import icoToPng from "ico-to-png";

@injectable()
export class ImageServiceImpl implements ImageService {
  public async savePageLogo(
    page: ParsedUrlData,
    logoUrl: string | null
  ): Promise<string | null> {
    if (!logoUrl) return null;
    try {
      const logoMaxSize = 64;

      let buffer = await urlToImgBuffer(logoUrl);
      if (logoUrl.endsWith(".ico"))
        buffer = await icoToPng(buffer, logoMaxSize);

      buffer = await resizeImageToMaxSizeJpg(buffer, logoMaxSize);

      return await uploadFlie(
        Bucket.PAGES_BUCKET,
        `logo/${page.websiteId}/${page.pageId}_${Date.now()}.png`,
        "image/png",
        buffer
      );
    } catch (e) {
      console.warn("savePageLogo", e);
    }
    return null;
  }
}

const resizeImageToMaxSizeJpg = async (
  buffer: Buffer,
  maxSize: number
): Promise<Buffer> => {
  let img = sharp(buffer);
  const meta = await img.metadata();

  if (meta.width && meta.height) {
    if (meta.width > maxSize || meta.height > maxSize) {
      const resizeProps: { height?: number; width?: number } = {};
      if (meta.width > meta.height) resizeProps.width = maxSize;
      else resizeProps.height = maxSize;
      img = img.resize(resizeProps);
    }
  }

  return img.png().toBuffer();
};

const urlToImgBuffer = async (url: string): Promise<Buffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return toBuffer(arrayBuffer);
};

const toBuffer = (ab: ArrayBuffer): Buffer => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) buf[i] = view[i];
  return buf;
};
