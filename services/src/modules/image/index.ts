import { ParsedUrlData } from "@/modules/url";

export abstract class ImageService {
  abstract savePageLogo(
    page: ParsedUrlData,
    logoUrl: string | null
  ): Promise<string | null>;
}
