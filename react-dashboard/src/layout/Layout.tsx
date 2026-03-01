import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
// import useMeta from "../hooks/useMeta";
// import siteConfig from "../config/siteConfig";

export default function Layout() {

  // useMeta({
  //   title: siteConfig.websiteName,
  //   description: siteConfig.description,
  //   image: siteConfig.defaultImage,
  //   url: window.location.href
  // });

  return (
    <>
      <Navbar />

      {/* SAME AS {% block body %} */}
      <Outlet />

      <Footer />
    </>
  );
}