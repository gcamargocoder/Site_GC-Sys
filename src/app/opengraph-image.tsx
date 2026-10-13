import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — desenvolvimento de sistemas, SaaS e aplicativos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/branding/gc-sys-horizontal-transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FAF9F6 0%, #EDF4FA 100%)",
          color: "#263241",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={322} height={60} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.08, letterSpacing: -3 }}>
          <span>Software sob medida para</span>
          <span style={{ color: "#3563A8" }}>negócios que querem evoluir.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#687583" }}>
          Sistemas sob medida · SaaS · Aplicativos · Sistemas de gestão
        </div>
      </div>
    ),
    size,
  );
}
