"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Default blog posts if none from admin
  const defaultBlogPosts = [
    {
      title: "Is Architecture a Good Career in Our Daily Life?",
      category: "Development",
      date: "02 July, 2023",
      image: "assets/img/blog/blog-v1-img1.jpg",
      slug: "architecture-career",
    },
    {
      title: "Architecture is a Visual Art, and the Buildings Speak For",
      category: "Development",
      date: "02 July, 2023",
      image: "assets/img/blog/blog-v1-img2.jpg",
      slug: "architecture-visual-art",
    },
    {
      title: "We Stand for Quality, Safety Credibility, so You Could be Trust",
      category: "Development",
      date: "02 July, 2023",
      image: "assets/img/blog/blog-v1-img3.jpg",
      slug: "quality-safety-credibility",
    },
  ];

  const postsToShow =
    blogPosts.length > 0 ? blogPosts.slice(0, 3) : defaultBlogPosts;

  return (
    <>
      {/*Start Blog One */}
      <section className="blog-one">
        <div className="container">
          <div className="sec-title text-center">
            <div className="sub-title">
              <h5>OUR BLOG POST</h5>
            </div>
            <h2>Read Our Latest News</h2>
          </div>

          <div className="row">
            {isLoading ? (
              <div className="col-12 text-center">
                <p>Loading blog posts...</p>
              </div>
            ) : (
              postsToShow.map((post, index) => (
                <div
                  key={post.id || index}
                  className="col-xl-4 col-lg-4 wow fadeInLeft"
                  data-wow-delay={`${index * 100}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="blog-one__single">
                    <div className="blog-one__single-img">
                      <div className="inner">
                        <img
                          src={post.image || "assets/img/blog/blog-v1-img1.jpg"}
                          alt={post.title}
                        />
                        <div className="overlay-icon">
                          <Link href={`/blog-details/${post.slug || "post"}`}>
                            <span className="icon-plus"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="blog-one__single-content">
                      <ul className="meta-info">
                        <li>
                          <p>
                            <Link href="#">
                              {post.category || "Development"}
                            </Link>
                          </p>
                        </li>
                        <li>
                          <p>{post.date || "02 July, 2023"}</p>
                        </li>
                      </ul>
                      <h2>
                        <Link href={`/blog-details/${post.slug || "post"}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <div className="btn-box">
                        <Link href={`/blog-details/${post.slug || "post"}`}>
                          READ MORE <span className="icon-left-arrow"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {/*End Blog One  */}
    </>
  );
}
