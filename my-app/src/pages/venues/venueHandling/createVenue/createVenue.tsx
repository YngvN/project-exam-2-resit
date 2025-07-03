import React from "react";
import VenueForm from "../venueForm";
import { makeRequest } from "../../../../utility/api/url";

interface CreateVenueFormProps {
    onSuccess: () => void;
}

/**
 * CreateVenue
 *
 * Wrapper component that uses `VenueForm` to create a new venue.
 * Transforms form data into API-compatible payload and submits it to Holidaze API.
 * Calls `onSuccess` callback after successful creation.
 */
const CreateVenue: React.FC<CreateVenueFormProps> = ({ onSuccess }) => {
    const handleSubmit = async (formData: any) => {
        const payload: any = {
            name: formData.name,
            description: formData.description,
            media: formData.media.filter((m: any) => m.url.trim() !== ""),
            price: Number(formData.price),
            maxGuests: Number(formData.maxGuests),
            meta: {
                wifi: formData.wifi,
                parking: formData.parking,
                breakfast: formData.breakfast,
                pets: formData.pets,
            },
        };

        const isLocationUsed = Object.values(formData.location).some((value: any) =>
            typeof value === "string" ? value.trim() !== "" : value !== 0
        );

        if (isLocationUsed) {
            payload.location = {
                ...formData.location,
                lat: Number(formData.location.lat) || 0,
                lng: Number(formData.location.lng) || 0,
            };
        }

        try {
            await makeRequest("holidaze/venues", "", "", "POST", payload);
            onSuccess();
        } catch (error) {
            console.error("Failed to create venue:", error);
        }
    };

    return <VenueForm onSubmit={handleSubmit} mode="create" />;
};

export default CreateVenue;
