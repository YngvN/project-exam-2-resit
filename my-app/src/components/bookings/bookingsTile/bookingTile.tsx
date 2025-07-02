// src/components/booking/bookingTile/bookingTile.tsx
import React from "react";
import "./bookingTile.scss";

interface Venue {
    id: string;
    name: string;
    media: { url: string; alt: string }[];
}

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: Venue;
}

interface BookingTileProps {
    booking: Booking;
}

const BookingTile: React.FC<BookingTileProps> = ({ booking }) => {
    const { dateFrom, dateTo, guests, created, updated, venue } = booking;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="booking-tile">
            <div className="booking-image">
                <img
                    src={venue.media[0]?.url || "https://via.placeholder.com/300"}
                    alt={venue.media[0]?.alt || "Venue Image"}
                />
            </div>
            <div className="booking-info">
                <h3 className="venue-name">{venue.name}</h3>
                <p>
                    <strong>Dates:</strong> {formatDate(dateFrom)} – {formatDate(dateTo)}
                </p>
                <p>
                    <strong>Guests:</strong> {guests}
                </p>
                <p className="timestamp">
                    Booked: {formatDate(created)} • Updated: {formatDate(updated)}
                </p>
            </div>
        </div>
    );
};

export default BookingTile;
