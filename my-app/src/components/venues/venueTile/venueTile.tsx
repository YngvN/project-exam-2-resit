import React, { useState } from "react";
import "./venueTile.scss";
import "./venueModal.scss";
import ModalComponent from "../../modal/modalComponent";
import VenueBooking from "./venueBooking/venueBooking";
import { makeRequest } from "../../../utility/api/url";
import { isUserLoggedIn } from "../../../utility/api/user";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

interface Venue {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    };
    bookings?: { dateFrom: string; dateTo: string }[]; // Nytt felt
}

interface VenueTileProps {
    venue: Venue;
}


/**
 * VenueTile
 *
 * Displays a clickable venue tile with basic info.
 * On click, opens a modal with full venue details, image carousel, and booking option.
 * If user is logged in, allows venue booking through a sub-component.
 */
const VenueTile: React.FC<VenueTileProps> = ({ venue }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [venueDetails, setVenueDetails] = useState<Venue | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showBooking, setShowBooking] = useState(false);

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            setIsLoading(true);
            const response = await makeRequest(
                `holidaze/venues/${venue.id}`,
                "",
                "",
                "GET",
                null,
                { _bookings: true },
                true
            );
            setVenueDetails(response.data);
        } catch (err: any) {
            setError("Failed to fetch venue details.");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVenueDetails(null);
        setError("");
    };

    return (
        <>
            <div className="venue-tile opacity-fade-trigger" key={venue.id} onClick={openModal}>
                <div className="venue-image">
                    <img
                        src={venue.media[0]?.url || "https://via.placeholder.com/300"}
                        alt={venue.media[0]?.alt || "Venue Image"}
                    />
                </div>
                <div className="venue-info">
                    <h2 className="venue-name">{venue.name}</h2>
                    <p className="venue-description">{venue.description}</p>
                    <div className="venue-details opacity-fade-hidden">
                        <p className="venue-price">Price: ${venue.price} / night</p>
                        <p className="venue-guests">Max Guests: {venue.maxGuests}</p>
                        <p className="venue-rating">Rating: {venue.rating}/5</p>
                    </div>
                    <div className="venue-meta">
                        {venue.meta.wifi && <span className="meta-item">Wi-Fi</span>}
                        {venue.meta.parking && <span className="meta-item">Parking</span>}
                        {venue.meta.breakfast && <span className="meta-item">Breakfast</span>}
                        {venue.meta.pets && <span className="meta-item">Pets Allowed</span>}
                    </div>
                    <div className="venue-location">
                        <p>{venue.location.address}</p>
                        <p>{venue.location.city}, {venue.location.country}</p>
                    </div>
                </div>
            </div>
            

            {isModalOpen && (
                <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        venueDetails && (
                            <div className={`venue-details-modal ${showBooking ? "hidden" : ""}`}>
                                <h2>{venueDetails.name}</h2>
                                {venueDetails.media.length > 1 ? (
                                    <Swiper
                                        className="venue-image-swiper"
                                        modules={[Navigation, Pagination, Zoom]}
                                        spaceBetween={10}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop
                                        zoom
                                    >
                                        {venueDetails.media.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="swiper-zoom-container">
                                                    <img
                                                        src={image.url}
                                                        alt={image.alt || `Image ${index + 1}`}
                                                        className="venue-image"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <img
                                        src={venueDetails.media[0]?.url || "https://via.placeholder.com/300"}
                                        alt={venueDetails.media[0]?.alt || "Venue Image"}
                                        className="venue-image"
                                    />
                                )}
                                <p>{venueDetails.description}</p>
                                <p>Price: ${venueDetails.price} / night</p>
                                <p>Max Guests: {venueDetails.maxGuests}</p>
                                <p>Rating: {venueDetails.rating}/5</p>
                                <div className="venue-meta">
                                    {venueDetails.meta.wifi && <span>Wi-Fi</span>}
                                    {venueDetails.meta.parking && <span>Parking</span>}
                                    {venueDetails.meta.breakfast && <span>Breakfast</span>}
                                    {venueDetails.meta.pets && <span>Pets Allowed</span>}
                                </div>
                                <div className="venue-location">
                                    <p>{venueDetails.location.address}</p>
                                    <p>{venueDetails.location.city}, {venueDetails.location.country}</p>
                                </div>
                                <div className="venue-booking-button">
                                    <button className="btn-primary" onClick={() => setShowBooking(true)}>
                                        {isUserLoggedIn() ? "Book now" : "Log in to book now"}
                                    </button>
                                </div>
                                <div className="venue-updated">
                                    <p>Created: {new Date(venueDetails.created).toLocaleDateString()}</p>
                                    <p>Last Updated: {new Date(venueDetails.updated).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )
                    )}
                    {showBooking && venueDetails && (
                        <VenueBooking
                            venueId={venueDetails.id}
                            bookings={venueDetails.bookings || []}
                            onClose={() => setShowBooking(false)}
                        />
                    )}
                </ModalComponent>
            )}
        </>
    );
};

export default VenueTile;