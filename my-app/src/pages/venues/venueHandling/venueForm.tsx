import React from "react";
import { useState } from "react";
import FormContainer from "../../../components/containers/form/form";

export interface Location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
}

export interface Media {
    url: string;
    alt: string;
}

export interface VenueFormData {
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
    media: Media[];
    location: Location;
}

interface VenueFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    mode?: "create" | "update";
    submitText?: string;
}

const VenueForm: React.FC<VenueFormProps> = ({ initialData, onSubmit, submitText }) => {
    const [formData, setFormData] = useState<VenueFormData>(
        initialData || {
            name: "",
            description: "",
            price: 0,
            maxGuests: 1,
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            media: [{ url: "", alt: "" }],
            location: {
                address: "",
                city: "",
                zip: "",
                country: "",
                continent: "",
                lat: 0,
                lng: 0,
            },
        }
    );

    const [statusMessage, setStatusMessage] = useState("");
    const [showLocationFields, setShowLocationFields] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        if (name.startsWith("location.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    [key]: key === "lat" || key === "lng" ? parseFloat(String(newValue)) : String(newValue),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const handleMediaChange = (index: number, field: "url" | "alt", value: string) => {
        const updatedMedia = [...formData.media];
        updatedMedia[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            media: updatedMedia,
        }));
    };

    const addMediaField = () => {
        setFormData((prev) => ({
            ...prev,
            media: [...prev.media, { url: "", alt: "" }],
        }));
    };

    const removeMediaField = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index),
        }));
    };

    const isLocationUsed = () =>
        Object.values(formData.location).some((val) =>
            typeof val === "string" ? val.trim() !== "" : val !== 0
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await onSubmit(formData);
            setStatusMessage("Success!");
            window.location.reload();
        } catch (error) {
            console.error("Error submitting venue:", error);
            setStatusMessage("Submission failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormContainer title="Venue Form" error={statusMessage}>
                <label>Name: <input name="name" value={formData.name} onChange={handleChange} required /></label>
                <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} required /></label>

                <fieldset>
                    <legend>Images</legend>
                    {formData.media.map((item, index) => (
                        <div key={index}>
                            <input
                                type="url"
                                placeholder="Image URL"
                                value={item.url}
                                onChange={(e) => handleMediaChange(index, "url", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Alt text"
                                value={item.alt}
                                onChange={(e) => handleMediaChange(index, "alt", e.target.value)}
                            />
                            {formData.media.length > 1 && (
                                <button type="button" onClick={() => removeMediaField(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addMediaField}>+ Add another image</button>
                </fieldset>

                <label>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} required /></label>
                <label>Max Guests: <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required /></label>

                <fieldset>
                    <legend>Meta</legend>
                    <label><input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleChange} /> Wi-Fi</label>
                    <label><input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} /> Parking</label>
                    <label><input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleChange} /> Breakfast</label>
                    <label><input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} /> Pets Allowed</label>
                </fieldset>

                <button className="btn btn-secondary" type="button" onClick={() => setShowLocationFields(prev => !prev)}>
                    {showLocationFields ? "Hide Location" : "Add Location (optional)"}
                </button>

                {showLocationFields && (
                    <fieldset>
                        <legend>Location</legend>
                        <label>Address: <input name="location.address" value={formData.location.address} onChange={handleChange} /></label>
                        <label>City: <input name="location.city" value={formData.location.city} onChange={handleChange} /></label>
                        <label>Zip: <input name="location.zip" value={formData.location.zip} onChange={handleChange} /></label>
                        <label>Country: <input name="location.country" value={formData.location.country} onChange={handleChange} /></label>
                        <label>Continent: <input name="location.continent" value={formData.location.continent} onChange={handleChange} /></label>
                        <label>Latitude: <input type="number" name="location.lat" value={formData.location.lat} onChange={handleChange} /></label>
                        <label>Longitude: <input type="number" name="location.lng" value={formData.location.lng} onChange={handleChange} /></label>
                        <button type="button" onClick={() => {
                            navigator.geolocation.getCurrentPosition(({ coords }) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    location: {
                                        ...prev.location,
                                        lat: coords.latitude,
                                        lng: coords.longitude,
                                    }
                                }));
                            });
                        }}>
                            Use my current location
                        </button>
                    </fieldset>
                )}

                <button className="btn btn-primary" type="submit">{submitText}</button>
            </FormContainer>
        </form>
    );
};

export default VenueForm;