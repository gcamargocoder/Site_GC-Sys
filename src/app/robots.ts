import type { MetadataRoute } from "next";
import { isPlaceholderUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPlaceholderUrl
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(isPlaceholderUrl ? {} : { sitemap: `${siteConfig.url}/sitemap.xml` }),
  };
}
