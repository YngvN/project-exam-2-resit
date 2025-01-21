import React, { useState } from "react";
import "./venueTile.scss";
import ModalComponent from "../../modal/modalComponent";
import { makeRequest } from "../../../utility/api/url";

interface Venue {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        country: string;
    };
}

interface VenueTileProps {
    venue: Venue;
}

const VenueTile: React.FC<VenueTileProps> = ({ venue }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [venueDetails, setVenueDetails] = useState<Venue | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            setIsLoading(true);
            const response = await makeRequest(`holidaze/venues/${venue.id}`, "", "", "GET", null, {}, true);
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
                            <div className="venue-details-modal">
                                <h2>{venueDetails.name}</h2>
                                <img
                                    src={venueDetails.media[0]?.url || "https://via.placeholder.com/300"}
                                    alt={venueDetails.media[0]?.alt || "Venue Image"}
                                />
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
                            </div>
                        )
                    )}
                </ModalComponent>
            )}
        </>
    );
};

export default VenueTile;
