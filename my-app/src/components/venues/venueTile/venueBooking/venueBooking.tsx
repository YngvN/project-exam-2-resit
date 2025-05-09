import React from "react";
import "./venueBooking.scss";

interface VenueBookingProps {
    onClose: () => void;
}


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