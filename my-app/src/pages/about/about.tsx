import React from "react";
import "./about.scss";

const About = () => {
    return (
        <div className="page-container about-page">
            <h1 className="page-title">About Holidaze</h1>
            <p>
                Holidaze is your cozy getaway booking platform — created to make it easy for travelers
                to find and book unique stays, and for venue managers to host their properties
                effortlessly.
            </p>

            <h2>Our Mission</h2>
            <p>
                We aim to connect guests and hosts in a simple, user-friendly way. Whether you're
                booking your next holiday or managing your own vacation property, Holidaze gives you
                the tools you need in a clean and modern interface.
            </p>

            <h2>What We Offer</h2>
            <ul>
                <li>Easy venue discovery and filtering</li>
                <li>Booking management for both guests and venue managers</li>
                <li>Profile customization with avatars, bios, and banners</li>
                <li>Calendar-based booking interface</li>
            </ul>

            <h2>For Hosts</h2>
            <p>
                Holidaze allows verified venue managers to list their properties, manage bookings,
                and keep track of their availability — all in one place.
            </p>

            <h2>Get in Touch</h2>
            <p>
                Have questions or feedback? Visit our <a href="/contact">Contact</a> page — we'd love to hear from you!
            </p>
        </div>
    );
};

export default About;
