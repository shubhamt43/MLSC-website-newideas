import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import bgvideo from "../assets/mlsc.mp4";

const Root = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // 👈 get current route

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const ctnPreloader = document.getElementById("ctn-preloader");

    setTimeout(() => {
      ctnPreloader.classList.add("loaded");
      document.body.classList.remove("no-scroll-y");

      if (ctnPreloader.classList.contains("loaded")) {
        setTimeout(() => {
          preloader.parentNode.removeChild(preloader);
          setLoading(false);
        }, 1000);
      }
    }, 4000);
  }, []);

  // 👇 hide Navbar on dashboard page
  const hideNavbar = location.pathname === "/teamassemble";

  return (
    <>
      {loading ? (
        <section>
          <div id="preloader">
            <div id="ctn-preloader" className="ctn-preloader">
              <div className="animation-preloader">
                <video src={bgvideo} autoPlay muted></video>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <ScrollToTop />
          {!hideNavbar && <Navbar />} {/* 👈 only show when not on dashboard */}
          <Outlet />
        </>
      )}
    </>
  );
};

export default Root;
