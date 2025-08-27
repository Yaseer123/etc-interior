"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
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
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
};
export default function TeamSlider2() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team");
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Default team members if none from admin
  const defaultTeamMembers = [
    {
      name: "Annete Black",
      position: "Engineer",
      image: "assets/img/team/team-v1-img1.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "John Smith",
      position: "Architect",
      image: "assets/img/team/team-v1-img2.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Sarah Johnson",
      position: "Designer",
      image: "assets/img/team/team-v1-img3.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Mike Wilson",
      position: "Project Manager",
      image: "assets/img/team/team-v1-img4.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ];

  const membersToShow =
    teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

  if (isLoading) {
    return <div className="text-center py-10">Loading team members...</div>;
  }

  return (
    <>
      <Swiper
        {...swiperOptions}
        className="thm-swiper__slider swiper-container"
      >
        {membersToShow.map((member, index) => (
          <SwiperSlide key={member.id || index} className="swiper-slide">
            {/*Start Team One Single */}
            <div className="team-one__single">
              <div className="team-one__single-img">
                <div className="inner">
                  <img
                    src={member.image || "assets/img/team/team-v1-img1.jpg"}
                    alt={member.name}
                  />
                  <div className="team-one__single-icon">
                    <ul className="social-links clearfix">
                      <li className="share">
                        <Link href="#">
                          <span className="icon-share"></span>
                        </Link>
                        <ul className="social-links-inner">
                          {member.socialLinks?.facebook && (
                            <li>
                              <Link
                                className="fb"
                                href={member.socialLinks.facebook}
                              >
                                <i className="icon-facebook-1"></i>
                              </Link>
                            </li>
                          )}
                          {member.socialLinks?.twitter && (
                            <li>
                              <Link
                                className="tw"
                                href={member.socialLinks.twitter}
                              >
                                <i className="icon-letter-v"></i>
                              </Link>
                            </li>
                          )}
                          {member.socialLinks?.instagram && (
                            <li>
                              <Link
                                className="ins"
                                href={member.socialLinks.instagram}
                              >
                                <i className="icon-letter-x"></i>
                              </Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="team-one__single-content">
                <h3>
                  <Link href={`/team-details/${member.slug || "member"}`}>
                    {member.name}
                  </Link>
                </h3>
                <p>{member.position}</p>
              </div>
            </div>
            {/*End Team One Single */}
          </SwiperSlide>
        ))}
        {/* <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" id="team-one__pagination">
                    <span className="swiper-pagination-bullet swiper-pagination-bullet-active" role="button" aria-label="Go to slide 1"></span>
                    <span className="swiper-pagination-bullet" role="button" aria-label="Go to slide 2"></span>
                    <span className="swiper-pagination-bullet" role="button" aria-label="Go to slide 3"></span>
                    <span className="swiper-pagination-bullet" role="button" aria-label="Go to slide 4"></span>
                </div> */}
      </Swiper>
    </>
  );
}
