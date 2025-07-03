import React from "react";
import "./footer.scss"

/**
 * Renders the footer for the Holidaze application.
 *
 * Includes:
 * - Branding section with name and tagline.
 * - Navigation links to key pages (Venues, Bookings, About, Contact).
 * - Copyright notice with current year.
 *
 */
export function Footer() {
    return     <footer className="holidaze-footer">
    <div className="container">
      <div className="footer-branding">
        <h2>Holidaze</h2>
        <p>Your cozy getaway booking platform</p>
      </div>

      <nav className="footer-nav">
        <ul>
          <li><a href="/venues">Venues</a></li>
          <li><a href="/bookings">Bookings</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Holidaze. All rights reserved.</p>
    </div>
  </footer>
}