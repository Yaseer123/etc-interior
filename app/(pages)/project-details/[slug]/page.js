"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else if (response.status === 404) {
          setError("Project not found");
        } else {
          setError("Failed to load project");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="Project Details">
        <div className="container">
          <div className="text-center py-20">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout
        headerStyle={4}
        footerStyle={1}
        breadcrumbTitle="Project Not Found"
      >
        <div className="container">
          <div className="text-center py-20">
            <h2>Project Not Found</h2>
            <p>The project you're looking for doesn't exist.</p>
            <Link href="/projects" className="thm-btn">
              <span className="txt">Back to Projects</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Parse images array if it's stored as JSON string
  const images =
    typeof project.images === "string"
      ? JSON.parse(project.images || "[]")
      : project.images || [];

  return (
    <Layout headerStyle={4} footerStyle={1} breadcrumbTitle={project.title}>
      {/*Start Project Details */}
      <section className="project-details">
        <div className="container">
          <div className="project-details__inner">
            <div className="project-details-img">
              <div className="inner">
                {images.length > 0 ? (
                  <img src={images[0]} alt={project.title} />
                ) : (
                  <img
                    src="assets/img/project/project-details-img1.jpg"
                    alt={project.title}
                  />
                )}
              </div>
            </div>

            <div className="project-details__text1">
              <ul>
                <li>
                  <div className="text-box">
                    <p>published:</p>
                    <h4>{new Date(project.createdAt).toLocaleDateString()}</h4>
                  </div>
                </li>

                <li>
                  <div className="text-box">
                    <p>CATEGORY:</p>
                    <h4>{project.category || "Design/ Ideas"}</h4>
                  </div>
                </li>

                <li>
                  <div className="text-box">
                    <p>client:</p>
                    <h4>{project.client || "N/A"}</h4>
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

            <div className="project-details__text2">
              <h2>{project.title}</h2>
              {project.description && <p>{project.description}</p>}
              {project.content && (
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              )}

              <div className="project-details__text2-bottom">
                <div className="tag-box">
                  {project.category && <Link href="#">{project.category}</Link>}
                  <Link href="#">Design</Link>
                  <Link href="#">Architecture</Link>
                </div>

                <div className="icon-box">
                  <Link href="#">
                    <span className="icon-share"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Project Gallery */}
            {images.length > 1 && (
              <div className="project-details__gallery">
                <h3>Project Gallery</h3>
                <div className="row">
                  {images.slice(1).map((image, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="gallery-item">
                        <img
                          src={image}
                          alt={`${project.title} - ${index + 2}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            {(project.location || project.area || project.duration) && (
              <div className="project-details__info">
                <h3>Project Information</h3>
                <div className="row">
                  {project.location && (
                    <div className="col-lg-4 col-md-6">
                      <div className="info-item">
                        <h4>Location</h4>
                        <p>{project.location}</p>
                      </div>
                    </div>
                  )}
                  {project.area && (
                    <div className="col-lg-4 col-md-6">
                      <div className="info-item">
                        <h4>Area</h4>
                        <p>{project.area}</p>
                      </div>
                    </div>
                  )}
                  {project.duration && (
                    <div className="col-lg-4 col-md-6">
                      <div className="info-item">
                        <h4>Duration</h4>
                        <p>{project.duration}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="project-details__previous-next">
              <div className="single-box">
                <div className="icon-box">
                  <Link href="/projects">
                    <span className="icon-left-arrow1"></span>
                  </Link>
                </div>
                <div className="text-box">
                  <p>Back to</p>
                  <h4>
                    <Link href="/projects">All Projects</Link>
                  </h4>
                </div>
              </div>

              <div className="single-box next">
                <div className="text-box text-right">
                  <p>View</p>
                  <h4>
                    <Link href="/projects">More Projects</Link>
                  </h4>
                </div>
                <div className="icon-box">
                  <Link href="/projects">
                    <span className="icon-right-arrow1"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End Project Details */}
    </Layout>
  );
}
