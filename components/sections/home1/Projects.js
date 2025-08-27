"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Default projects if none from admin
  const defaultProjects = [
    {
      title: "Hotel Joshna Villa",
      location: "San Francisco",
      image: "assets/img/project/project-v1-img1.jpg",
      slug: "hotel-joshna-villa",
    },
    {
      title: "Modern Office Complex",
      location: "New York",
      image: "assets/img/project/project-v1-img2.jpg",
      slug: "modern-office-complex",
    },
    {
      title: "Residential Tower",
      location: "Los Angeles",
      image: "assets/img/project/project-v1-img3.jpg",
      slug: "residential-tower",
    },
    {
      title: "Shopping Center",
      location: "Chicago",
      image: "assets/img/project/project-v1-img4.jpg",
      slug: "shopping-center",
    },
  ];

  const projectsToShow =
    projects.length > 0 ? projects.slice(0, 4) : defaultProjects;

  return (
    <>
      {/*Start Project One */}
      <section className="project-one">
        <div className="auto-container">
          <div className="sec-title text-center">
            <div className="sub-title">
              <h5>OUR RECENT PROJECT</h5>
            </div>
            <h2>
              Last Projects We Designed <br />
              Check Our Work
            </h2>
          </div>
          <div className="row">
            {isLoading ? (
              <div className="col-12 text-center">
                <p>Loading projects...</p>
              </div>
            ) : (
              projectsToShow.map((project, index) => (
                <div
                  key={project.id || index}
                  className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="project-one__single">
                    <div className="project-one__single-img">
                      <img
                        src={
                          project.image ||
                          "assets/img/project/project-v1-img1.jpg"
                        }
                        alt={project.title}
                      />
                      <div className="overlay-btn">
                        <Link
                          className="img-popup"
                          href={
                            project.image ||
                            "assets/img/project/project-v1-img1.jpg"
                          }
                        >
                          <span className="icon-search-interface-symbol"></span>
                        </Link>
                        <Link
                          href={`/project-details/${project.slug || "project"}`}
                        >
                          <span className="icon-link"></span>
                        </Link>
                      </div>

                      <div className="overlay-text">
                        <p>{project.location || "San Francisco"}</p>
                        <h2>
                          <Link
                            href={`/project-details/${
                              project.slug || "project"
                            }`}
                          >
                            {project.title}
                          </Link>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {/*End Project One */}
    </>
  );
}
