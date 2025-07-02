import React, { useState } from "react";
import "./myVenuesTiles.scss";
import ModalComponent from "../../../../components/modal/modalComponent";
import MessageModalComponent from "../../../../components/modal/messageModal/messageModalComponent";
import UpdateVenue from "../../venueHandling/updateVenue/updateVenue";
import { makeRequest } from "../../../../utility/api/url";
import ViewBookings from "./viewBookings/viewBookings";

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

interface MyVenuesTilesProps {
    venue: Venue;
    onDelete?: () => void; // optional callback for parent to refresh list
}

const MyVenuesTiles: React.FC<MyVenuesTilesProps> = ({ venue, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { name, location, media, description, price, maxGuests, rating, meta } = venue;

    const [isViewingBookings, setIsViewingBookings] = useState(false);

    const handleDelete = async () => {
        try {
            await makeRequest(`holidaze/venues/${venue.id}`, "", "", "DELETE");
            setShowDeleteConfirm(false);
            setIsModalOpen(false);
            if (onDelete) onDelete(); // let parent refresh the list
        } catch (error) {
            console.error("Failed to delete venue:", error);
        }
    };

    return (
        <>
            <div className="my-venue-tile" onClick={() => setIsModalOpen(true)}>
                <div className="venue-image">
                    <img
                        src={media[0]?.url || "https://via.placeholder.com/160x90"}
                        alt={media[0]?.alt || "Venue image"}
                    />
                </div>
                <div className="venue-details">
                    <h3 className="venue-name">{name}</h3>
                    <p className="venue-meta-line">{location.city}, {location.country}</p>
                </div>
            </div>

            {isModalOpen && (
                <ModalComponent isOpen={isModalOpen} onClose={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                }}>
                    {isEditing ? (
                        <UpdateVenue
                            initialData={{
                                ...venue,
                                wifi: venue.meta.wifi,
                                parking: venue.meta.parking,
                                breakfast: venue.meta.breakfast,
                                pets: venue.meta.pets,
                                location: {
                                    address: venue.location.address,
                                    city: venue.location.city,
                                    country: venue.location.country,
                                    zip: "",
                                    continent: "",
                                    lat: 0,
                                    lng: 0,
                                },
                            }}
                            venueId={venue.id}
                            onSuccess={() => {
                                setIsModalOpen(false);
                                setIsEditing(false);
                            }}
                        />
                    ) : isViewingBookings ? (
                        <ViewBookings
                            venueId={venue.id}
                            onClose={() => {
                                setIsViewingBookings(false);
                                setIsModalOpen(false);
                            }}
                        />
                    ) : (
                        <div className="venue-modal">
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <p><strong>Price:</strong> ${price} / night</p>
                            <p><strong>Max Guests:</strong> {maxGuests}</p>
                            <p><strong>Rating:</strong> {rating ?? "Not rated yet"}</p>
                            <p><strong>Location:</strong> {location.address}, {location.city}, {location.country}</p>
                            <div className="venue-meta">
                                {meta.wifi && <span>Wi-Fi</span>}
                                {meta.parking && <span>Parking</span>}
                                {meta.breakfast && <span>Breakfast</span>}
                                {meta.pets && <span>Pets Allowed</span>}
                            </div>

                            <div className="modal-actions">
                                <button className="btn btn-outline" onClick={() => setIsViewingBookings(true)}>
                                    View Bookings
                                </button>
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Update</button>
                                <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
                            </div>
                        </div>
                    )}
                </ModalComponent>
            )}

            {showDeleteConfirm && (
                <MessageModalComponent isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                    <div className="confirm-delete-content">
                        <h3>Are you sure you want to delete this venue?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="btn btn-danger" onClick={handleDelete}>Yes, delete</button>
                            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </MessageModalComponent>
            )}

        </>
    );
};

export default MyVenuesTiles;
