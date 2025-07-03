import React, { useEffect, useState } from "react";
import VenueTile from "../venueTile/venueTile";
import "./venueDisplay.scss";
import { makeRequest } from "../../../utility/api/url";
import { deduplicateByKey } from "../../../utility/deduplicater";

interface Venue {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    };
}

/**
 * VenueDisplayAll
 *
 * Displays a paginated list of all available venues.
 * Fetches additional pages when "Show More" is clicked and avoids duplicates.
 */
export const VenueDisplayAll: React.FC = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const fetchVenues = async (page: number) => {
        try {
            setIsLoading(true);
            const response = await makeRequest("holidaze/venues", "", "", "GET", null, { page }, false);
            const fetchedVenues = response.data || [];
            setVenues((prevVenues) => {
                const combined = [...prevVenues, ...fetchedVenues];
                return deduplicateByKey(combined, (v) => v.id);
            });
            setIsLastPage(fetchedVenues.length === 0);
        } catch (err: any) {
            setError(err.message || "Failed to fetch venues.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues(1);
    }, []);

    const handleShowMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchVenues(nextPage);
    };

    return (
        <div className="venue-display">
            <h2 className="venue-display-title">Available Venues</h2>
            {isLoading && currentPage === 1 && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="venue-list">
                {venues.map((venue) => (
                    <VenueTile key={venue.id} venue={venue} />
                ))}
            </div>
            {!isLastPage && !isLoading && (
                <button className="show-more-button" onClick={handleShowMore}>
                    Show More
                </button>
            )}
            {isLoading && currentPage > 1 && <p>Loading...</p>}
            {isLastPage && <p className="no-more-venues">No more venues available.</p>}
        </div>
    );
}

interface VenueSearchDisplayProps {
    searchParams: Record<string, any>;
}

/**
 * VenueSearchDisplay
 *
 * Displays venues based on search parameters provided via props.
 * Renders loading state, error state, and result count.
 */
export const VenueSearchDisplay: React.FC<VenueSearchDisplayProps> = ({ searchParams }) => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setIsLoading(true);
                const response = await makeRequest("holidaze/venues/search", "", "", "GET", null, searchParams, true);
                setVenues(response.data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch venues.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVenues();
    }, [searchParams]);

    return (
        <div className="venue-display">
            <h1 className="venue-display-title">Search Results</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && !error && (
                <p className="result-message">
                    {venues.length === 0
                        ? "No venues match your search criteria."
                        : `${venues.length} venue(s) found.`}
                </p>
            )}
            <div className="venue-list">
                {venues.map((venue) => (
                    <VenueTile key={venue.id} venue={venue} />
                ))}
            </div>
        </div>
    );
};
