"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileMenu({
  isSidebar,
  handleMobileMenu,
  handleSidebar,
}) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  // Function to check if a menu item should be active
  const isMenuActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "#") {
      return false; // Parent menu items with dropdowns
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Function to check if a parent menu item should be active (for dropdowns)
  const isParentActive = (menuItems) => {
    return menuItems.some((item) => isMenuActive(item.href));
  };

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };
  return (
    <>
      {/*Mobile Menu */}
      <div className="mobile-menu">
        <nav className="menu-box">
          <div className="close-btn" onClick={handleMobileMenu}>
            <i className="fas fa-times"></i>
          </div>
          <div className="nav-logo">
            <Link href="/">
              <img src="assets/img/resource/logo-2.png" alt="Logo" />
            </Link>
          </div>
          <div className="menu-outer">
            <ul className="navigation clearfix">
              <li className={isMenuActive("/") ? "active" : ""}>
                <Link href="/" onClick={handleMobileMenu}>
                  Home
                </Link>
              </li>
              <li className={isMenuActive("/about") ? "active" : ""}>
                <Link href="/about" onClick={handleMobileMenu}>
                  About
                </Link>
              </li>
              <li className={isMenuActive("/clients") ? "active" : ""}>
                <Link href="/clients" onClick={handleMobileMenu}>
                  Clients
                </Link>
              </li>
              <li
                className={`${
                  isParentActive([
                    { href: "/service" },
                    { href: "/architecture" },
                    { href: "/interior-design" },
                    { href: "/uiux-designing" },
                    { href: "/building-renovation" },
                    { href: "/construction-site" },
                    { href: "/security-system" },
                  ])
                    ? "active"
                    : ""
                } menu-item-has-children`}
              >
                <Link href="#" onClick={handleMobileMenu}>
                  Services
                </Link>
                <ul
                  style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}
                >
                  <li>
                    <Link
                      href="/service"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/service") ? "active" : ""}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/architecture"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/architecture") ? "active" : ""}
                    >
                      Architecture
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/interior-design"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/interior-design") ? "active" : ""
                      }
                    >
                      Interior Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/uiux-designing"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/uiux-designing") ? "active" : ""
                      }
                    >
                      UiUx Designing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/building-renovation"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/building-renovation") ? "active" : ""
                      }
                    >
                      Building Renovation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/construction-site"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/construction-site") ? "active" : ""
                      }
                    >
                      Construction Site
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/security-system"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/security-system") ? "active" : ""
                      }
                    >
                      Security System
                    </Link>
                  </li>
                </ul>
                <div
                  className={
                    isActive.key == 2 ? "dropdown-btn open" : "dropdown-btn"
                  }
                  onClick={() => handleToggle(2)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>
              <li
                className={`${
                  isParentActive([
                    { href: "/team" },
                    { href: "/projects" },
                    { href: "/testimonials" },
                    { href: "/pricing" },
                    { href: "/faq" },
                  ])
                    ? "active"
                    : ""
                } menu-item-has-children`}
              >
                <Link href="#" onClick={handleMobileMenu}>
                  Pages
                </Link>
                <ul
                  style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}
                >
                  <li>
                    <Link
                      href="/team"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/team") ? "active" : ""}
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team-details"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/team-details") ? "active" : ""}
                    >
                      Team Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/projects") ? "active" : ""}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/project-details"
                      onClick={handleMobileMenu}
                      className={
                        isMenuActive("/project-details") ? "active" : ""
                      }
                    >
                      Project Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/testimonials") ? "active" : ""}
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/pricing") ? "active" : ""}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/faq") ? "active" : ""}
                    >
                      Faq
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/error"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/error") ? "active" : ""}
                    >
                      Error
                    </Link>
                  </li>
                </ul>
                <div
                  className={
                    isActive.key == 3 ? "dropdown-btn open" : "dropdown-btn"
                  }
                  onClick={() => handleToggle(3)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>
              <li
                className={`${
                  isParentActive([
                    { href: "/shop" },
                    { href: "/cart" },
                    { href: "/checkout" },
                  ])
                    ? "active"
                    : ""
                } menu-item-has-children`}
                onClick={handleMobileMenu}
              >
                <Link href="#">Shop</Link>
                <ul
                  style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}
                >
                  <li>
                    <Link
                      href="/shop"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/shop") ? "active" : ""}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop-details"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/shop-details") ? "active" : ""}
                    >
                      Shop Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/cart") ? "active" : ""}
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="checkout"
                      onClick={handleMobileMenu}
                      className={isMenuActive("/checkout") ? "active" : ""}
                    >
                      Checkout
                    </Link>
                  </li>
                </ul>
                <div
                  className={
                    isActive.key == 4 ? "dropdown-btn open" : "dropdown-btn"
                  }
                  onClick={() => handleToggle(4)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>
              <li className={isMenuActive("/blog") ? "active" : ""}>
                <Link href="/blog" onClick={handleMobileMenu}>
                  Blog
                </Link>
              </li>
              <li className={isMenuActive("/contact") ? "active" : ""}>
                <Link href="/contact" onClick={handleMobileMenu}>
                  Contact
                </Link>
              </li>
            </ul>
            {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header */}
          </div>
          <div className="contact-info">
            <div className="icon-box">
              <span className="icon-call"></span>
            </div>
            <p>
              <Link href="tel:123456789">(629) 555-0129</Link>
            </p>
          </div>
          <div className="social-links">
            <ul className="clearfix list-wrap">
              <li>
                <Link href="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="menu-backdrop" onClick={handleMobileMenu}></div>
      {/*End Mobile Menu */}
      {/* End Mobile Menu */}
      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
}
