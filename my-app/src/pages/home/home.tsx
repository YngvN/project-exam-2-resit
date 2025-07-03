import React, { useState, useEffect } from "react";
import "./home.scss";
import { VenueDisplayAll, VenueSearchDisplay } from "../../components/venues/venueDisplay/venueDisplay";

/**
 * Home
 *
 * Main landing page displaying all venues by default.
 * Includes search input and filter checkboxes for querying venues based on name and metadata (wifi, parking, breakfast, pets).
 * Dynamically switches between full venue list and filtered search results using debounce.
 */
function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useState<Record<string, any>>({});
    const [isSearching, setIsSearching] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filters, setFilters] = useState({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    });
    const [debounceTimeout, setDebounceTimeout] = useState<number | undefined>();

    const handleSearch = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value)
        );
        const combinedParams = { q: searchQuery, ...activeFilters };

        if (searchQuery.trim() === "" && Object.keys(activeFilters).length === 0) {
            setIsSearching(false);
        } else {
            setSearchParams(combinedParams); 
            setIsSearching(true);
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setSearchParams({});
        setFilters({
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        });
        setIsSearching(false);
    };

    const toggleFilters = () => {
        setFiltersVisible((prev) => !prev);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFilters((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSearchQueryChange = (value: string) => {
        setSearchQuery(value);

        // Clear previous debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            handleSearch();
        }, 500);

        setDebounceTimeout(timeout as unknown as number);
    };

    useEffect(() => {
        handleSearch();
    }, [filters]);

    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchQueryChange(e.target.value)}
                    placeholder="Search for venues..."
                    className="search-input"
                />
                <button onClick={handleReset} className="btn-danger">
                    Reset
                </button>

            </div>



            {isSearching && Object.keys(searchParams).length > 0 ? (
                <VenueSearchDisplay searchParams={searchParams} />
            ) : (
                !isSearching && <VenueDisplayAll />
            )}
        </div>
    );
}

export default Home;
