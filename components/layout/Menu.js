"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  // Function to check if a menu item should be active
  const isActive = (href) => {
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
    return menuItems.some((item) => isActive(item.href));
  };

  return (
    <>
      <ul className="navigation">
        <li className={isActive("/") ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={isActive("/about") ? "active" : ""}>
          <Link href="/about">About</Link>
        </li>
        <li className={isActive("/clients") ? "active" : ""}>
          <Link href="/clients">Clients</Link>
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
          <Link href="#">Services</Link>
          <ul className="sub-menu">
            <li>
              <Link
                href="/service"
                className={isActive("/service") ? "active" : ""}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/architecture"
                className={isActive("/architecture") ? "active" : ""}
              >
                Architecture
              </Link>
            </li>
            <li>
              <Link
                href="/interior-design"
                className={isActive("/interior-design") ? "active" : ""}
              >
                Interior Design
              </Link>
            </li>
            <li>
              <Link
                href="/uiux-designing"
                className={isActive("/uiux-designing") ? "active" : ""}
              >
                UiUx Designing
              </Link>
            </li>
            <li>
              <Link
                href="/building-renovation"
                className={isActive("/building-renovation") ? "active" : ""}
              >
                Building Renovation
              </Link>
            </li>
            <li>
              <Link
                href="/construction-site"
                className={isActive("/construction-site") ? "active" : ""}
              >
                Construction Site
              </Link>
            </li>
            <li>
              <Link
                href="/security-system"
                className={isActive("/security-system") ? "active" : ""}
              >
                Security System
              </Link>
            </li>
          </ul>
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
          <Link href="#">Pages</Link>
          <ul className="sub-menu">
            <li>
              <Link href="/team" className={isActive("/team") ? "active" : ""}>
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/team-details"
                className={isActive("/team-details") ? "active" : ""}
              >
                Team Details
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={isActive("/projects") ? "active" : ""}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/project-details"
                className={isActive("/project-details") ? "active" : ""}
              >
                Project Details
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className={isActive("/testimonials") ? "active" : ""}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={isActive("/pricing") ? "active" : ""}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/faq" className={isActive("/faq") ? "active" : ""}>
                Faq
              </Link>
            </li>
            <li>
              <Link
                href="/error"
                className={isActive("/error") ? "active" : ""}
              >
                Error
              </Link>
            </li>
          </ul>
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
        >
          <Link href="#">Shop</Link>
          <ul className="sub-menu">
            <li>
              <Link href="/shop" className={isActive("/shop") ? "active" : ""}>
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/shop-details"
                className={isActive("/shop-details") ? "active" : ""}
              >
                Shop Details
              </Link>
            </li>
            <li>
              <Link href="/cart" className={isActive("/cart") ? "active" : ""}>
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className={isActive("/checkout") ? "active" : ""}
              >
                Checkout
              </Link>
            </li>
          </ul>
        </li>
        <li className={isActive("/blog") ? "active" : ""}>
          <Link href="/blog">Blog</Link>
        </li>
        <li className={isActive("/contact") ? "active" : ""}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </>
  );
}
