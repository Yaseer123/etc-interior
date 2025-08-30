import Layout from "@/components/layout/Layout";
import Link from "next/link";

async function getBlogPosts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="OUR BLOG">
        <div>
          {/*Start Blog One */}
          <section className="blog-one">
            <div className="container">
              <div className="row">
                {blogPosts.length > 0 ? (
                  blogPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="col-xl-4 col-lg-4 wow fadeInLeft"
                      data-wow-delay={`${index * 100}ms`}
                      data-wow-duration="1500ms"
                    >
                      <div className="blog-one__single">
                        <div className="blog-one__single-img">
                          <div className="inner">
                            <img
                              src={
                                post.image ||
                                "/assets/img/blog/blog-v1-img1.jpg"
                              }
                              alt={post.title}
                              style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="overlay-icon">
                              <Link href={`/blog/${post.slug}`}>
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
                                  {post.tags
                                    ? post.tags.split(",")[0].trim()
                                    : "Blog"}
                                </Link>
                              </p>
                            </li>
                            <li>
                              <p>
                                {new Date(
                                  post.publishedAt || post.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </li>
                          </ul>
                          <h2>
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h2>
                          {post.excerpt && (
                            <p style={{ marginBottom: "15px", color: "#666" }}>
                              {post.excerpt.length > 100
                                ? `${post.excerpt.substring(0, 100)}...`
                                : post.excerpt}
                            </p>
                          )}
                          <div className="btn-box">
                            <Link href={`/blog/${post.slug}`}>
                              READ MORE{" "}
                              <span className="icon-left-arrow"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <h3>No blog posts found</h3>
                    <p>Check back soon for new content!</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          {/*End Blog One */}
        </div>
      </Layout>
    </>
  );
}
