import useMeta from "../hooks/useMeta";
import siteConfig from "../config/siteConfig";

export default function DefaultMeta() {

  useMeta({
    title: siteConfig.websiteName,
    description: siteConfig.description,
    image: siteConfig.defaultImage,
    url: window.location.href
  });

  return null;
}