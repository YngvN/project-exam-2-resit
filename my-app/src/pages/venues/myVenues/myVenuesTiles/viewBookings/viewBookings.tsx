import React, { useEffect, useState } from "react";
import AvailabilityCalendar from "../../../../../components/calendar/calendar";
import { makeRequest } from "../../../../../utility/api/url";
import "./viewBookings.scss";

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    customer: {
        name: string;
        email: string;
    };
}

interface ViewBookingsProps {
    venueId: string;
    onClose?: () => void;
}


/**
 * ViewBookings
 *
 * Displays all bookings for a specific venue.
 * Shows booked dates on a calendar and lists upcoming bookings with details.
 * Fetches data from the Holidaze API using the venue ID.
 * Optional close button if `onClose` is provided.
 */
const ViewBookings: React.FC<ViewBookingsProps> = ({ venueId, onClose }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookedDates, setBookedDates] = useState<Date[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await makeRequest("holidaze/venues", venueId, "", "GET", null, { _bookings: true });
                const data = res.data || {};
                const bookings = data.bookings || [];
                setBookings(bookings);
    
                const dates: Date[] = [];
                bookings.forEach((booking: Booking) => {
                    const start = new Date(booking.dateFrom);
                    const end = new Date(booking.dateTo);
                    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                        dates.push(new Date(d));
                    }
                });
    
                setBookedDates(dates);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            }
        };
    

        fetchBookings();
    }, [venueId]);

    return (
        <div className="view-bookings-container">
            <div className="header-row">
                <h2>Bookings</h2>
                {onClose && (
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                )}
            </div>

            <div className="calendar-section">
                <AvailabilityCalendar
                    bookedDates={bookedDates}
                    mode="view"
                />
            </div>

            <div className="booking-list-section">
                <h3>Upcoming Bookings</h3>
                {bookings.length === 0 ? (
                    <p>No upcoming bookings.</p>
                ) : (
                <ul className="booking-list">
                    {bookings
                        .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
                        .map((booking) => (
                            <li key={booking.id} className="booking-item">
                                <p><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                <p><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                <p><strong>Guests:</strong> {booking.guests}</p>
                            </li>
                        ))}
                </ul>
                )}
            </div>
        </div>
    );
};

export default ViewBookings;
