import React, { useEffect, useState } from "react";
import "./venueBooking.scss";
import AvailabilityCalendar from "../../../calendar/calendar";
import { makeRequest } from "../../../../utility/api/url";

interface Booking {
    dateFrom: string;
    dateTo: string;
}

interface VenueBookingProps {
    onClose: () => void;
    venueId: string;
    bookings: Booking[];
}

/**
 * VenueBooking
 *
 * Modal component for booking a venue. Displays a calendar with unavailable dates,
 * allows users to select a valid date range and number of guests, and submits the booking.
 */
const VenueBooking: React.FC<VenueBookingProps> = ({ onClose, venueId, bookings }) => {
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [guests, setGuests] = useState(1);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const dates: Date[] = bookings.flatMap((booking: Booking) => {
            const from = new Date(booking.dateFrom);
            const to = new Date(booking.dateTo);
            const range = [];
            let date = new Date(from);
            while (date <= to) {
                range.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return range;
        });

        setBookedDates(dates);
    }, [bookings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const [checkInDate, checkOutDate] = dateRange;

        if (!checkInDate || !checkOutDate || !guests || !venueId) {
            setStatusMessage("Please select a valid date range and guest count.");
            return;
        }

        if (checkInDate > checkOutDate) {
            setStatusMessage("Check-out must be after check-in.");
            return;
        }

        const overlap = bookedDates.some((booked) => {
            return booked >= checkInDate && booked <= checkOutDate;
        });

        if (overlap) {
            setStatusMessage("Selected dates include unavailable days.");
            return;
        }

        const payload = {
            dateFrom: checkInDate.toISOString(),
            dateTo: checkOutDate.toISOString(),
            guests,
            venueId,
        };

        try {
            await makeRequest("holidaze/bookings", "", "", "POST", payload, {}, true);
            setStatusMessage("Booking confirmed!");
        } catch (error) {
            console.error("Booking failed:", error);
            setStatusMessage("Booking failed. Please try again.");
        }
    };

    return (
        <div className="venue-booking-overlay" onClick={onClose}>
            <div className="venue-booking-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Book This Venue</h2>

                <AvailabilityCalendar
                    bookedDates={bookedDates}
                    selectedRange={dateRange}
                    onChange={(range) => setDateRange(range)}
                    mode="booking"
                />

                <form onSubmit={handleSubmit}>
                    <label>
                        Guests:
                        <input
                            type="number"
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            required
                        />
                    </label>
                    <button className="btn-primary" type="submit">Confirm Booking</button>
                </form>

                {statusMessage && <p className="status-message">{statusMessage}</p>}

                <button className="btn-small" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default VenueBooking;
