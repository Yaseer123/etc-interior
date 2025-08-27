"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

export default function Banner() {
  const [isOpen, setOpen] = useState(false);
  const [heroSections, setHeroSections] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroResponse, settingsResponse] = await Promise.all([
          fetch("/api/hero"),
          fetch("/api/settings"),
        ]);

        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          setHeroSections(heroData);
        }

        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="main-slider main-slider-one">
        <div className="container">
          <div className="text-center py-20">Loading...</div>
        </div>
      </div>
    );
  }

  // If no hero sections from admin, show default
  const sectionsToShow =
    heroSections.length > 0
      ? heroSections
      : [
          {
            title: "Creative",
            subtitle: "Architecture",
            description: "Discover amazing architectural designs",
            buttonText: "Discover More",
            buttonLink: "/contact",
            backgroundImage: "assets/img/slider/slider-v1-img1.jpg",
            videoUrl: "",
          },
        ];

  return (
    <>
      <section className="main-slider main-slider-one">
        <Swiper
          {...swiperOptions}
          className="banner-carousel owl-theme owl-carousel owl-nav-none owl-dots-none"
        >
          {sectionsToShow.map((section, index) => (
            <SwiperSlide key={section.id || index} className="swiper-slide">
              <div
                className="image-layer"
                style={{
                  backgroundImage: `url(${
                    section.backgroundImage ||
                    "assets/img/slider/slider-v1-img1.jpg"
                  })`,
                }}
              ></div>
              <div className="shape1">
                <img src="assets/img/shape/slider-v1-shape1.png" alt="" />
              </div>
              <div className="container">
                <div className="main-slider-one__single">
                  <div className="main-slider-one__content">
                    <div className="shape2 float-bob-x">
                      <img src="assets/img/shape/slider-v1-shape2.png" alt="" />
                    </div>
                    <h3>{section.title || "Creative"}</h3>
                    <h2>{section.subtitle || "Architecture"}</h2>
                    <div className="btn-box">
                      <div className="btn-one">
                        <Link
                          className="thm-btn"
                          href={section.buttonLink || "/contact"}
                        >
                          <span className="txt">
                            {section.buttonText || "Discover More"}
                          </span>
                        </Link>
                      </div>
                      {section.videoUrl && (
                        <div className="btn-two">
                          <a
                            onClick={() => setOpen(true)}
                            className="video-popup"
                            data-fancybox="video-1"
                            data-caption=""
                          >
                            <div className="main-slider-one__icon">
                              <i className="icon-play-button-1"></i>
                              <span>Watch Our Videos</span>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="contact-info">
                      <ul>
                        <li>
                          <div className="icon-box">
                            <span className="icon-pin"></span>
                          </div>
                          <div className="text-box">
                            <p>
                              {settings.address ||
                                "465 NT Road. North West, England"}
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className="icon-box">
                            <span className="icon-envelope"></span>
                          </div>
                          <div className="text-box">
                            <p>
                              <Link
                                href={`mailto:${
                                  settings.email || "yourmail@email.com"
                                }`}
                              >
                                {settings.email || "needhelpxafran@gmail.com"}
                              </Link>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="social-links">
                      {settings.socialLinks?.facebook && (
                        <Link href={settings.socialLinks.facebook}>
                          <span className="icon-facebook"></span>
                        </Link>
                      )}
                      {settings.socialLinks?.instagram && (
                        <Link href={settings.socialLinks.instagram}>
                          <span className="icon-instagram"></span>
                        </Link>
                      )}
                      {settings.socialLinks?.twitter && (
                        <Link href={settings.socialLinks.twitter}>
                          <span className="icon-tik-tok"></span>
                        </Link>
                      )}
                      {settings.socialLinks?.linkedin && (
                        <Link href={settings.socialLinks.linkedin}>
                          <span className="icon-youtube"></span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div
            className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
            id="main-slider-one__pagination"
          >
            <span
              className="swiper-pagination-bullet swiper-pagination-bullet-active"
              role="button"
              aria-label="Go to slide 1"
            ></span>
            <span
              className="swiper-pagination-bullet"
              role="button"
              aria-label="Go to slide 2"
            ></span>
            <span
              className="swiper-pagination-bullet"
              role="button"
              aria-label="Go to slide 3"
            ></span>
          </div>
        </Swiper>
      </section>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="vfhzo499OeA"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
