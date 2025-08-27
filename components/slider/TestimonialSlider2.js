"use client";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  // spaceBetween: 30,
  autoplay: {
    delay: 2500,
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

  breakpoints: {
    320: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    575: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    767: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    991: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    1199: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    1350: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
  },
};
export default function TestimonialSlider2() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Default testimonials if none from admin
  const defaultTestimonials = [
    {
      content:
        "We are an architecture firm with a focus on beautiful but functional design. At its heart, we believe design is about usability and accessibility — these are the guiding principles for our work. Read projects, our process and our team below.",
      rating: 5,
    },
    {
      content:
        "The team at Xafran delivered exceptional results that exceeded our expectations. Their attention to detail and innovative approach to design made our project truly special.",
      rating: 5,
    },
  ];

  const testimonialsToShow =
    testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  return (
    <>
      <Swiper
        {...swiperOptions}
        className="swiper-container"
        id="testimonials-one__carousel"
      >
        {testimonialsToShow.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id || index} className="swiper-slide">
            <div className="testimonials-one__content-single">
              <div className="rating-box">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <a key={i} href="#">
                    <i className="icon-star"></i>
                  </a>
                ))}
              </div>

              <div className="text-box">
                <p>{testimonial.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div
          className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
          id="testimonials-one__pagination"
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
    </>
  );
}
