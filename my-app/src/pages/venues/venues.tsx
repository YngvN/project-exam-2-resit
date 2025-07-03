import React, { useState } from "react";
import ModalComponent from "../../components/modal/modalComponent";
import CreateVenueForm from "./venueHandling/createVenue/createVenue";
import AlternateVenueDisplay from "../../components/venues/alternateDisplay/alternateDisplay";
import "./venues.scss";

/**
 * Renders the "My Venues" page where a user can view and create their venues.
 *
 * - Displays a header with a button to create a new venue.
 * - Opens a modal with the venue creation form when the button is clicked.
 * - Shows a list of venues owned by the logged-in user using AlternateVenueDisplay.
 *
 */
function Venues() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="page-container">
            <div className="my-venues-header">
                <h1 className="page-title">My Venues</h1>
                <button
                    className="btn btn-primary create-venue-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Create Venue
                </button>
            </div>

            {isModalOpen && (
                <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CreateVenueForm onSuccess={() => setIsModalOpen(false)} />
                </ModalComponent>
            )}

            <AlternateVenueDisplay mode="user-venues" />
        </div>
    );
}

export default Venues;
