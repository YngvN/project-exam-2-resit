import React from "react";
import "./venueBooking.scss";

/**
 * Props for the VenueBooking component.
 * @property {() => void} onClose - Function to close the booking overlay.
 */
interface VenueBookingProps {
    onClose: () => void;
}

/**
 * VenueBooking displays a booking form overlay inside a venue modal.
 * It captures check-in/check-out dates and number of guests, and prevents
 * background interaction by stopping propagation and disabling scroll.
 *
 * @param {VenueBookingProps} props - Props including the close function.
 * @returns {JSX.Element} The rendered booking overlay component.
 */
const VenueBooking: React.FC<VenueBookingProps> = ({ onClose }) => {
    return (
        <div className="venue-booking-overlay" onClick={onClose}>
            <div className="venue-booking-panel" onClick={(e) => e.stopPropagation()}>
                <h2>Book This Venue</h2>

                {/* Booking form elements */}
                <form>
                    <label>
                        Check-in:
                        <input type="date" required />
                    </label>
                    <label>
                        Check-out:
                        <input type="date" required />
                    </label>
                    <label>
                        Guests:
                        <input type="number" min={1} defaultValue={1} required />
                    </label>
                    <button type="submit">Confirm Booking</button>
                </form>

                <button className="close-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default VenueBooking;
