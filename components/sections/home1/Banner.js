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

// Skeleton component for loading state
const SliderSkeleton = () => (
  <div className="main-slider main-slider-one">
    <div className="image-layer skeleton-bg"></div>
    <div className="shape1">
      <div className="skeleton-shape"></div>
    </div>
    <div className="container">
      <div className="main-slider-one__single">
        <div className="main-slider-one__content">
          <div className="shape2 float-bob-x">
            <div className="skeleton-shape"></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="contact-info">
            <ul>
              <li>
                <div className="icon-box skeleton-icon"></div>
                <div className="text-box">
                  <div className="skeleton-text"></div>
                </div>
              </li>
              <li>
                <div className="icon-box skeleton-icon"></div>
                <div className="text-box">
                  <div className="skeleton-text"></div>
                </div>
              </li>
            </ul>
          </div>
          <div className="social-links">
            <div className="skeleton-social"></div>
            <div className="skeleton-social"></div>
            <div className="skeleton-social"></div>
            <div className="skeleton-social"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Default hero section for immediate display
const defaultHeroSection = {
  title: "Creative",
  subtitle: "Architecture",
  description: "Discover amazing architectural designs",
  buttonText: "Discover More",
  buttonLink: "/contact",
  backgroundImage: "assets/img/slider/slider-v1-img1.jpg",
  videoUrl: "",
};

// Cache configuration
const CACHE_KEYS = {
  HERO_DATA: "slider_hero_data",
  SETTINGS_DATA: "slider_settings_data",
  CACHE_TIMESTAMP: "slider_cache_timestamp",
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache utility functions
const getCachedData = (key) => {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }

    // Cache expired, remove it
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
};

const setCachedData = (key, data) => {
  if (typeof window === "undefined") return;

  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

// Function to clear cache (can be called from admin panel or when needed)
const clearSliderCache = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CACHE_KEYS.HERO_DATA);
    localStorage.removeItem(CACHE_KEYS.SETTINGS_DATA);
    localStorage.removeItem(CACHE_KEYS.CACHE_TIMESTAMP);
    console.log("Slider cache cleared successfully");
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

// Function to refresh cache (force update)
const refreshSliderCache = async () => {
  try {
    const [heroResponse, settingsResponse] = await Promise.all([
      fetch("/api/hero"),
      fetch("/api/settings"),
    ]);

    if (heroResponse.ok) {
      const heroData = await heroResponse.json();
      setCachedData(CACHE_KEYS.HERO_DATA, heroData);
    }

    if (settingsResponse.ok) {
      const settingsData = await settingsResponse.json();
      setCachedData(CACHE_KEYS.SETTINGS_DATA, settingsData);
    }

    console.log("Slider cache refreshed successfully");
  } catch (error) {
    console.error("Error refreshing cache:", error);
  }
};

// Make functions available globally for admin use
if (typeof window !== "undefined") {
  window.clearSliderCache = clearSliderCache;
  window.refreshSliderCache = refreshSliderCache;
}

export default function Banner() {
  const [isOpen, setOpen] = useState(false);
  const [heroSections, setHeroSections] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data after component mounts to avoid blocking initial render
    const fetchData = async () => {
      try {
        // Check cache first
        const cachedHeroData = getCachedData(CACHE_KEYS.HERO_DATA);
        const cachedSettingsData = getCachedData(CACHE_KEYS.SETTINGS_DATA);

        let heroData = cachedHeroData;
        let settingsData = cachedSettingsData;

        // If cache is empty or expired, fetch from API
        if (!cachedHeroData || !cachedSettingsData) {
          const [heroResponse, settingsResponse] = await Promise.all([
            fetch("/api/hero"),
            fetch("/api/settings"),
          ]);

          if (heroResponse.ok) {
            heroData = await heroResponse.json();
            // Cache the hero data
            setCachedData(CACHE_KEYS.HERO_DATA, heroData);
          }

          if (settingsResponse.ok) {
            settingsData = await settingsResponse.json();
            // Cache the settings data
            setCachedData(CACHE_KEYS.SETTINGS_DATA, settingsData);
          }
        }

        // Update state with cached or fresh data
        if (heroData && heroData.length > 0) {
          setHeroSections(heroData);
        }

        if (settingsData) {
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // If API fails, try to use cached data even if expired
        const fallbackHeroData = getCachedData(CACHE_KEYS.HERO_DATA);
        const fallbackSettingsData = getCachedData(CACHE_KEYS.SETTINGS_DATA);

        if (fallbackHeroData && fallbackHeroData.length > 0) {
          setHeroSections(fallbackHeroData);
        }

        if (fallbackSettingsData) {
          setSettings(fallbackSettingsData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure navbar loads first
    const timer = setTimeout(fetchData, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <SliderSkeleton />;
  }

  // If no hero sections from admin, show default
  const sectionsToShow =
    heroSections.length > 0 ? heroSections : [defaultHeroSection];

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
                    section.image || "assets/img/slider/slider-v1-img1.jpg"
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
