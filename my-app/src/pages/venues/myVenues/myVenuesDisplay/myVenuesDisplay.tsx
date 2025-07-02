import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../../utility/api/url";
import { getUserData } from "../../../../utility/api/user";
import MyVenuesTiles from "../myVenuesTiles/myVenuesTiles";
import "./myVenuesDisplay.scss";

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

const MyVenuesDisplay: React.FC = () => {
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
                    { _venues: true },
                    true
                );
    
                setVenues(response.data?.venues || []);
            } catch (err: any) {
                console.error("Failed to fetch manager's venues:", err);
                setError("Could not load your venues.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchVenues();
    }, []);
    

    if (loading) return <p>Loading your venues...</p>;
    if (error) return <p className="form-error">{error}</p>;
    if (venues.length === 0) return <p>You have not created any venues yet.</p>;

    return (
        <div className="my-venues-display">
            <div className="venue-list">
                {venues.map((venue) => (
                    <MyVenuesTiles key={venue.id} venue={venue} />
                ))}
            </div>
        </div>
    );
};

export default MyVenuesDisplay;
