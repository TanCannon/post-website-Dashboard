import { useEffect } from "react";

export default function useMeta(meta = {}) {

  useEffect(() => {

    const setMeta = (attr, key, value) => {
      if (!value) return;

      let element = document.querySelector(
        `meta[${attr}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    const setCanonical = (url) => {
      if (!url) return;

      let link = document.querySelector(
        "link[rel='canonical']"
      );

      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }

      link.setAttribute("href", url);
    };

    /* ---------- TITLE ---------- */
    if (meta.title)
      document.title = meta.title;

    /* ---------- BASIC SEO ---------- */
    setMeta("name", "description", meta.description);

    /* ---------- OPEN GRAPH ---------- */
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:image", meta.image);
    setMeta("property", "og:url", meta.url);
    setMeta("property", "og:type", meta.type || "website");

    /* ---------- TWITTER ---------- */
    setMeta("name", "twitter:card",
      meta.twitterCard || "summary_large_image"
    );
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.image);
    setMeta("name", "twitter:url", meta.url);

    /* ---------- CANONICAL ---------- */
    setCanonical(meta.url);

  }, [
    meta.title,
    meta.description,
    meta.image,
    meta.url,
    meta.type,
    meta.twitterCard
  ]);
}