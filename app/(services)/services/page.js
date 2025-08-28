"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Default services if none from admin
  const defaultServices = [
    {
      title: "Architecture Design",
      description:
        "Professional architectural design services for residential and commercial projects",
      icon: "icon-architecture",
      slug: "architecture-design",
    },
    {
      title: "Interior Design",
      description: "Complete interior design solutions to transform your space",
      icon: "icon-interior-design",
      slug: "interior-design",
    },
    {
      title: "Construction Management",
      description: "Expert construction management and supervision services",
      icon: "icon-construction",
      slug: "construction-management",
    },
    {
      title: "Building Renovation",
      description: "Comprehensive renovation services for existing buildings",
      icon: "icon-renovation",
      slug: "building-renovation",
    },
    {
      title: "Security Systems",
      description: "Advanced security system design and installation",
      icon: "icon-security",
      slug: "security-systems",
    },
    {
      title: "UI/UX Design",
      description: "Modern UI/UX design for digital products and applications",
      icon: "icon-ui-ux",
      slug: "ui-ux-design",
    },
  ];

  const servicesToShow = services.length > 0 ? services : defaultServices;

  return (
    <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="Our Services">
      {/*Start Service One */}
      <section className="service-one">
        <div
          className="service-one__shape2"
          style={{
            backgroundImage: "url(assets/img/shape/service-v1-shape2.png)",
          }}
        ></div>
        <div className="container">
          <div className="sec-title text-center">
            <div className="sub-title">
              <h5>OUR SERVICES</h5>
            </div>
            <h2>Our Architecture Services</h2>
            <p>
              We provide comprehensive architectural and design services to help
              you create the perfect space for your needs.
            </p>
          </div>
          <div className="row">
            {isLoading ? (
              <div className="col-12 text-center">
                <p>Loading services...</p>
              </div>
            ) : (
              servicesToShow.map((service, index) => (
                <div
                  key={service.id || index}
                  className="col-xl-4 col-lg-6 wow animated fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.1}s`}
                >
                  <div className="service-one__single">
                    <div className="shape1">
                      <img
                        src="assets/img/shape/service-v1-shape1.png"
                        alt=""
                      />
                    </div>
                    <div className="service-one__single-inner">
                      <div className="count-text">
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="icon-box">
                        <span
                          className={service.icon || "icon-construction"}
                        ></span>
                      </div>
                      <div className="content-box">
                        <h2>
                          <Link href={`/service/${service.slug || "service"}`}>
                            {service.title}
                          </Link>
                        </h2>
                        <p>{service.description}</p>
                        <div className="btn-box">
                          <Link href={`/service/${service.slug || "service"}`}>
                            EXPLORE SERVICE
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {/*End Service One */}
    </Layout>
  );
}
