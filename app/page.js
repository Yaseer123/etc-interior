"use client";
import BackToTop from "@/components/elements/BackToTop";
import DataBg from "@/components/elements/DataBg";
import MobileMenu from "@/components/layout/MobileMenu";
import SearchPopup from "@/components/layout/SearchPopup";
import Sidebar from "@/components/layout/Sidebar";
import Footer1 from "@/components/layout/footer/Footer1";
import Header1 from "@/components/layout/header/Header1";
import About from "@/components/sections/home1/About";
import Banner from "@/components/sections/home1/Banner";
import Brand from "@/components/sections/home1/Brand";
import Clients from "@/components/sections/home1/Clients";
import Faq from "@/components/sections/home1/Faq";
import Features from "@/components/sections/home1/Features";
import Features1 from "@/components/sections/home1/Features1";
import FeautureTwo from "@/components/sections/home1/FeautureTwo";
import News from "@/components/sections/home1/News";
import Projects from "@/components/sections/home1/Projects";
import Services from "@/components/sections/home1/Services";
import Team from "@/components/sections/home1/Team";
import Testimonial from "@/components/sections/home1/Testimonial";
import Video from "@/components/sections/home1/Video";
import { useEffect, useState } from "react";

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [isSidebar, setSidebar] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-visible")
      : document.body.classList.remove("mobile-menu-visible");
  };

  const handlePopup = () => setPopup(!isPopup);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);

  return (
    <>
      <DataBg />
      <div className="body-dark-bg" id="#top">
        {/* Navbar - Loads instantly */}
        <Header1
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          handlePopup={handlePopup}
          isSidebar={isSidebar}
          handleSidebar={handleSidebar}
        />

        <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />
        <MobileMenu
          handleMobileMenu={handleMobileMenu}
          isSidebar={isSidebar}
          handleSidebar={handleSidebar}
        />

        {/* Main content - Slider and other sections */}
        <main>
          <Banner />
          <Features />
          <About />
          <Services />
          <Projects />
          <Team />
          <Faq />
          <FeautureTwo />
          <Video />
          <Brand />
          <Clients />
          <Features1 />
          <Testimonial />
          <News />
        </main>

        <Footer1 />
      </div>
      <BackToTop scroll={scroll} />
    </>
  );
}
