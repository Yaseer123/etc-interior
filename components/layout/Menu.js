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
        <li className={isActive("/projects") ? "active" : ""}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={isActive("/pricing") ? "active" : ""}>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <a href="https://www.etcbangladesh.com/">Shop</a>
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
