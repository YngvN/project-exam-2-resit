import React, { useState } from "react";
import FormContainer from "../../components/containers/form/form";
import "./contact.scss";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.name && formData.email && formData.message) {
            setStatusMessage("Thank you! Your message has been sent.");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setStatusMessage("Please fill out all fields.");
        }
    };

    return (
        <div className="page-container contact-page">
            <FormContainer title="Contact Us" error={statusMessage}>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button className="btn btn-primary" type="submit">Send Message</button>
                </form>
            </FormContainer>
        </div>
    );
};

export default Contact;
