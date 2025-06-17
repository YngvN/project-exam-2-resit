import React, { useState, useEffect } from "react";
import "./home.scss";
import { VenueDisplayAll, VenueSearchDisplay } from "../../components/venues/venueDisplay/venueDisplay";

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
            setIsSearching(false); // Reset to show all venues if no query or filters
        } else {
            setSearchParams(combinedParams); // Update search params for the search component
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

        // Set a new debounce timeout
        const timeout = setTimeout(() => {
            handleSearch();
        }, 500); // 500ms debounce delay

        setDebounceTimeout(timeout as unknown as number);
    };

    // Perform a search whenever filters change
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
                <button onClick={handleReset} className="reset-button">
                    Reset
                </button>
                <button onClick={toggleFilters} className="filter-button">
                    {filtersVisible ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {filtersVisible && (
                <div className="filters-container">
                    <label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={filters.wifi}
                            onChange={handleFilterChange}
                        />
                        Wi-Fi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={filters.parking}
                            onChange={handleFilterChange}
                        />
                        Parking
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="breakfast"
                            checked={filters.breakfast}
                            onChange={handleFilterChange}
                        />
                        Breakfast
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pets"
                            checked={filters.pets}
                            onChange={handleFilterChange}
                        />
                        Pets Allowed
                    </label>
                </div>
            )}

            {isSearching && Object.keys(searchParams).length > 0 ? (
                <VenueSearchDisplay searchParams={searchParams} />
            ) : (
                !isSearching && <VenueDisplayAll />
            )}
        </div>
    );
}

export default Home;
