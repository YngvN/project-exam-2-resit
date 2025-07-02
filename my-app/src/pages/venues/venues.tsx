import React, { useState } from "react";
import ModalComponent from "../../components/modal/modalComponent";
import CreateVenueForm from "./venueHandling/createVenue/createVenue";
import MyVenuesDisplay from "./myVenues/myVenuesDisplay/myVenuesDisplay";
import "./venues.scss";

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

            <MyVenuesDisplay />
        </div>
    );
}

export default Venues;
