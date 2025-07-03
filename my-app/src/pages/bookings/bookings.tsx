import React, { useEffect, useState } from "react";
import { makeRequest } from "../../utility/api/url";
import { getUserData } from "../../utility/api/user";
import AlternateVenueDisplay from "../../components/venues/alternateDisplay/alternateDisplay";
import "./bookings.scss";

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
    venue: {
        id: string;
        name: string;
        media: { url: string; alt: string }[];
    };
}
/**
 * Bookings
 *
 * Page component that displays all bookings made by the currently logged-in user.
 * Fetches booking data from the API and renders venue tiles using AlternateVenueDisplay.
 */
function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            const user = getUserData();
            if (!user?.name) {
                setError("User not found");
                setLoading(false);
                return;
            }

            try {
                const response = await makeRequest(
                    `holidaze/profiles/${user.name}/bookings`,
                    "",
                    "",
                    "GET",
                    null,
                    { _venue: true },
                    true
                );
                setBookings(response.data);
            } catch (err) {
                setError("Failed to fetch bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="page-container">
            <h1 className="page-title">My Bookings</h1>
            {loading && <p>Loading bookings...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <AlternateVenueDisplay mode="user-bookings" />
            )}
        </div>
    );
}

export default Bookings;
