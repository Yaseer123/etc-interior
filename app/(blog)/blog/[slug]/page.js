import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBlogPost(slug) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/blog/${slug}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRecentBlogPosts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return [];
    }
    const posts = await response.json();
    return posts.slice(0, 3); // Get only 3 recent posts
  } catch (error) {
    console.error("Error fetching recent blog posts:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getBlogPost(slug);
  const recentPosts = await getRecentBlogPosts();

  if (!post) {
    notFound();
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={post.title}>
        {/*Start Blog Details */}
        <section className="blog-details">
          <div className="container">
            <div className="row">
              {/*Start Blog Sidebar Content */}
              <div className="col-xl-8">
                <div className="blog-details__content">
                  {post.image && (
                    <div className="blog-details__content-img1">
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "500px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}

                  <div className="blog-details__content-text1">
                    <h2>{post.title}</h2>
                    <p className="text1">
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {post.author && ` _ BY ${post.author}`}
                      {post.tags && ` _ ${post.tags.split(",")[0].trim()}`}
                    </p>

                    {post.excerpt && (
                      <p
                        className="text2"
                        style={{
                          fontStyle: "italic",
                          color: "#666",
                          marginBottom: "20px",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}

                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      style={{
                        lineHeight: "1.8",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    />
                  </div>

                  {post.tags && (
                    <div className="blog-details__content-text4">
                      <div className="tag-box">
                        <div className="title">
                          <h2>Posted in:</h2>
                        </div>

                        <div className="tag-box-list">
                          <ul>
                            {post.tags.split(",").map((tag, index) => (
                              <li key={index}>
                                <Link href="#">{tag.trim()}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="icon-box">
                        <Link href="#">
                          <span className="icon-share"></span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/*End Blog Sidebar Content */}

              {/*Start Sidebar */}
              <div className="col-xl-4">
                <div className="sidebar">
                  {/*Start Sidebar Single */}
                  <div className="sidebar__single sidebar__search">
                    <h3 className="sidebar__title">Search</h3>
                    <form action="#" className="sidebar__search-form">
                      <input type="search" placeholder="Keywords here...." />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                  {/*End Sidebar Single */}

                  {/*Start Sidebar Single */}
                  <div className="sidebar__single sidebar__category">
                    <h3 className="sidebar__title">Categories</h3>

                    <ul className="sidebar__category-list">
                      <li>
                        <Link className="active" href="#">
                          Architecture <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Interior Design{" "}
                          <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Ui/Ux Designing{" "}
                          <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Building Renovation{" "}
                          <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Construction Site{" "}
                          <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Security System{" "}
                          <span className="icon-left-arrow"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/*End Sidebar Single */}

                  {/*Start Sidebar Single */}
                  <div className="sidebar__single sidebar__recent-post">
                    <h3 className="sidebar__title">Recent Post</h3>

                    <ul className="sidebar__recent-post-box">
                      {recentPosts.map((recentPost) => (
                        <li key={recentPost.id}>
                          <div className="inner">
                            <div className="img-box">
                              <img
                                src={
                                  recentPost.image ||
                                  "/assets/img/blog/sidebar-img1.jpg"
                                }
                                alt={recentPost.title}
                                style={{
                                  width: "80px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>

                            <div className="content-box">
                              <h4>
                                <Link href={`/blog/${recentPost.slug}`}>
                                  {recentPost.title.length > 50
                                    ? `${recentPost.title.substring(0, 50)}...`
                                    : recentPost.title}
                                </Link>
                              </h4>
                              <p>
                                <span className="icon-clock"></span>
                                {new Date(
                                  recentPost.publishedAt || recentPost.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/*End Sidebar Single */}

                  {/*Start Sidebar Single */}
                  <div className="sidebar__single sidebar__tags">
                    <h3 className="sidebar__title">Tags</h3>
                    <ul className="sidebar__tags-list clearfix">
                      <li>
                        <Link href="#">IT Technology</Link>
                      </li>
                      <li>
                        <Link href="#">Software</Link>
                      </li>
                      <li>
                        <Link href="#">Design</Link>
                      </li>
                      <li>
                        <Link href="#">Service</Link>
                      </li>
                      <li>
                        <Link href="#">Development</Link>
                      </li>
                      <li>
                        <Link href="#">Digital</Link>
                      </li>
                      <li>
                        <Link href="#">Cyber</Link>
                      </li>
                    </ul>
                  </div>
                  {/*End Sidebar Single */}
                </div>
              </div>
              {/*End Sidebar */}
            </div>
          </div>
        </section>
        {/*End Blog Details */}
      </Layout>
    </>
  );
}
