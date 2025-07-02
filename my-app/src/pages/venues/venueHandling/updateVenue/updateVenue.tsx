import React from "react";
import { makeRequest } from "../../../../utility/api/url";
import VenueForm, { VenueFormData } from "../venueForm";

interface UpdateVenueProps {
    initialData: VenueFormData;
    venueId: string;
    onSuccess: () => void;
}

const UpdateVenue: React.FC<UpdateVenueProps> = ({ initialData, venueId, onSuccess }) => {
    const handleSubmit = async (formData: VenueFormData) => {
        const payload: any = {
            name: formData.name,
            description: formData.description,
            media: formData.media.filter((m) => m.url.trim() !== ""),
            price: Number(formData.price),
            maxGuests: Number(formData.maxGuests),
            meta: {
                wifi: formData.wifi,
                parking: formData.parking,
                breakfast: formData.breakfast,
                pets: formData.pets,
            },
        };

        const isLocationUsed = Object.values(formData.location).some((val) =>
            typeof val === "string" ? val.trim() !== "" : val !== 0
        );

        if (isLocationUsed) {
            payload.location = {
                ...formData.location,
                lat: Number(formData.location.lat),
                lng: Number(formData.location.lng),
            };
        }

        try {
            await makeRequest(`holidaze/venues/${venueId}`, "", "", "PUT", payload);
            onSuccess();
        } catch (error) {
            console.error("Failed to update venue:", error);
        }
    };

    return <VenueForm initialData={initialData} onSubmit={handleSubmit} submitText="Update Venue" />;
};

export default UpdateVenue;
