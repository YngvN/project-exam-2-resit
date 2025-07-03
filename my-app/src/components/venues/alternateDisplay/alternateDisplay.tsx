import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../utility/api/url";
import { getUserData } from "../../../utility/api/user";
import AlternateTiles from "./alternateTiles/alternateTiles";
import "./alternateDisplay.scss";

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

interface Booking {
    venue: Venue;
}

interface AlternateVenueDisplayProps {
    mode: "user-venues" | "user-bookings";
}

/**
 * AlternateVenueDisplay
 *
 * Displays a list of venues either owned by the user or booked by the user,
 * depending on the provided `mode` prop.
 *
 * Fetches data from the API and renders `AlternateTiles` for each venue.
 */
const AlternateVenueDisplay: React.FC<AlternateVenueDisplayProps> = ({ mode }) => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVenues = async () => {
            const user = getUserData();

            if (!user?.name) {
                setError("Not logged in");
                setLoading(false);
                return;
            }

            try {
                const response = await makeRequest(
                    "holidaze/profiles",
                    user.name,
                    "",
                    "GET",
                    null,
                    mode === "user-venues" ? { _venues: true } : { _bookings: true },
                    true
                );

                if (mode === "user-venues") {
                    setVenues(response.data?.venues || []);
                } else {
                    const bookings: Booking[] = response.data?.bookings || [];
                    const bookedVenues = bookings
                        .map((booking) => booking.venue)
                        .filter((v): v is Venue => !!v)
                        .filter((venue, index, self) =>
                            index === self.findIndex((v) => v.id === venue.id)
                        );

                    setVenues(bookedVenues);
                }
            } catch (err: any) {
                console.error("Failed to fetch venues or bookings:", err);
                setError("Could not load venues.");
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [mode]);

    if (loading) return <p>Loading venues...</p>;
    if (error) return <p className="form-error">{error}</p>;
    if (venues.length === 0) return <p>No venues found.</p>;

    return (
        <div className="alternate-venue-display">
            <div className="venue-list">
                {venues.map((venue) => (
                    <AlternateTiles key={venue.id} mode={mode} venue={venue} />
                ))}
            </div>
        </div>
    );
};

export default AlternateVenueDisplay;
