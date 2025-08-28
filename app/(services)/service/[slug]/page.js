"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServiceDetails() {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else if (response.status === 404) {
          setError("Service not found");
        } else {
          setError("Failed to load service");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to load service");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchService();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="Service Details">
        <div className="container">
          <div className="text-center py-20">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout
        headerStyle={4}
        footerStyle={1}
        breadcrumbTitle="Service Not Found"
      >
        <div className="container">
          <div className="text-center py-20">
            <h2>Service Not Found</h2>
            <p>The service you're looking for doesn't exist.</p>
            <Link href="/services" className="thm-btn">
              <span className="txt">Back to Services</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={4} footerStyle={1} breadcrumbTitle={service.title}>
      {/*Start Service Details */}
      <section className="service-details">
        <div className="container">
          <div className="service-details__inner">
            <div className="service-details-img">
              <div className="inner">
                {service.image ? (
                  <img src={service.image} alt={service.title} />
                ) : (
                  <img
                    src="assets/img/service/service-v2-single-bg.jpg"
                    alt={service.title}
                  />
                )}
              </div>
            </div>

            <div className="service-details__text1">
              <ul>
                <li>
                  <div className="text-box">
                    <p>Service Category:</p>
                    <h4>Interior Design</h4>
                  </div>
                </li>

                <li>
                  <div className="text-box">
                    <p>Duration:</p>
                    <h4>2-4 Weeks</h4>
                  </div>
                </li>

                <li>
                  <ul className="social-links">
                    <li>
                      <Link href="#">
                        <span className="icon-facebook"></span>
                      </Link>
                      <Link className="tw" href="#">
                        <span className="icon-twitter"></span>
                      </Link>
                      <Link className="ins" href="#">
                        <span className="icon-instagram"></span>
                      </Link>
                      <Link className="in" href="#">
                        <span className="icon-linkedin-big-logo"></span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="service-details__text2">
              <h2>{service.title}</h2>
              {service.description && <p>{service.description}</p>}
              {service.content && (
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
              )}

              <div className="service-details__text2-bottom">
                <div className="tag-box">
                  <Link href="#">Design</Link>
                  <Link href="#">Interior</Link>
                  <Link href="#">Architecture</Link>
                </div>

                <div className="icon-box">
                  <Link href="#">
                    <span className="icon-share"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="service-details__features">
              <h3>Why Choose This Service</h3>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="feature-item">
                    <div className="icon-box">
                      <span className="icon-check"></span>
                    </div>
                    <h4>Professional Design</h4>
                    <p>
                      Expert designers with years of experience in creating
                      beautiful spaces.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="feature-item">
                    <div className="icon-box">
                      <span className="icon-check"></span>
                    </div>
                    <h4>Quality Materials</h4>
                    <p>
                      We use only the finest materials to ensure durability and
                      beauty.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="feature-item">
                    <div className="icon-box">
                      <span className="icon-check"></span>
                    </div>
                    <h4>Timely Delivery</h4>
                    <p>
                      We complete projects on time and within budget as
                      promised.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-details__previous-next">
              <div className="single-box">
                <div className="icon-box">
                  <Link href="/services">
                    <span className="icon-left-arrow1"></span>
                  </Link>
                </div>
                <div className="text-box">
                  <p>Back to</p>
                  <h4>
                    <Link href="/services">All Services</Link>
                  </h4>
                </div>
              </div>

              <div className="single-box next">
                <div className="text-box text-right">
                  <p>View</p>
                  <h4>
                    <Link href="/services">More Services</Link>
                  </h4>
                </div>
                <div className="icon-box">
                  <Link href="/services">
                    <span className="icon-right-arrow1"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Service Details */}
    </Layout>
  );
}
