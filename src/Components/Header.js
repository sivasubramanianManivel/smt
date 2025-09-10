"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Tabs, Tab, Avatar, Menu, MenuItem, IconButton, Stack } from "@mui/material";
import { useUser } from "../app/context/userContext";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const userRole = useUser(); // comes from context

  // Hide tabs on these routes
  const hideTabs = ["/login", "/register", "/"].includes(pathname);

  // Update active tab only if tabs are visible
  useEffect(() => {
    if (!hideTabs) setActiveLink(pathname);
  }, [pathname, hideTabs]);

  const navLinks = [
    { href: "/admin", label: "Admin" },
    { href: "/home", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/priceList", label: "Orders & Price List" },
    { href: "/contact", label: "Contact" },
    { href: "/usersTable", label: "Users" }, // only for admin
  ];

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="relative px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold flex items-center">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-blue-600">Logo</span>
        </Link>

        {/* Desktop Tabs */}
        {!hideTabs && (
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Tabs
              value={
                navLinks.some(
                  (link) =>
                    link.href === activeLink &&
                    (link.href !== "/usersTable" || userRole?.role === "admin")
                )
                  ? activeLink
                  : false
              }
              onChange={(e, newValue) => setActiveLink(newValue)}
              textColor="primary"
              indicatorColor="primary"
            >
              {navLinks
                .filter((link) => link.href !== "/usersTable" || userRole?.role === "admin")
                .map((link) => (
                  <Tab
                    key={link.href}
                    value={link.href}
                    label={link.label}
                    component={Link}
                    href={link.href}
                  />
                ))}
            </Tabs>
          </div>
        )}

        {/* Auth / Avatar */}
        <div className="hidden lg:flex lg:items-center">
          {!userRole ? (
            <Stack direction="row" spacing={2}>
              <Link
                href="/login"
                className="py-2 px-5 text-sm text-gray-800 font-bold bg-gray-100 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="py-2 px-5 text-sm text-white font-bold bg-blue-500 rounded-xl"
              >
                Register
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar sx={{ bgcolor: stringToColor(userRole.name) }}>
                  {userRole.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <span className="font-semibold text-blue-500">{userRole.name}</span>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>{userRole.name}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-blue-600 p-3">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          {navLinks
            .filter((link) => link.href !== "/usersTable" || userRole?.role === "admin")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
