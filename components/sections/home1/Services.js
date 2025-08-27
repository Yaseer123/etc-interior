"use client";
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
      title: "General Contracting",
      description:
        "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
      icon: "icon-construction",
      slug: "general-contracting",
    },
    {
      title: "Machine Design",
      description:
        "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
      icon: "icon-construction-machine",
      slug: "machine-design",
    },
    {
      title: "Project Planning",
      description:
        "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
      icon: "icon-check-list",
      slug: "project-planning",
    },
    {
      title: "Interior Design",
      description:
        "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
      icon: "icon-interior-design",
      slug: "interior-design",
    },
  ];

  const servicesToShow = services.length > 0 ? services : defaultServices;

  return (
    <>
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
              <h5>OUR SERVICE</h5>
            </div>
            <h2>Our Architecture Services</h2>
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
                  className="col-xl-6 col-lg-6 wow animated fadeInUp"
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
                          <Link href={`/services/${service.slug || "service"}`}>
                            {service.title}
                          </Link>
                        </h2>
                        <p>{service.description}</p>
                        <div className="btn-box">
                          <Link href={`/services/${service.slug || "service"}`}>
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
    </>
  );
}
