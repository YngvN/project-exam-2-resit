import React from "react";
import BookingTile from "../bookingsTile/bookingTile";
import "./bookingDisplay.scss";

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    venue: {
        id: string;
        name: string;
        media: { url: string; alt: string }[];
    };
    created: string;
    updated: string;
}

interface BookingDisplayProps {
    bookings: Booking[];
}

const BookingDisplay: React.FC<BookingDisplayProps> = ({ bookings }) => {
    return (
        <div className="booking-display">
            <h2 className="booking-display-title">Your Bookings</h2>
            {bookings.length === 0 ? (
                <p className="no-bookings">You have no bookings yet.</p>
            ) : (
                <div className="booking-list">
                    {bookings.map((booking) => (
                        <BookingTile key={booking.id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingDisplay;
