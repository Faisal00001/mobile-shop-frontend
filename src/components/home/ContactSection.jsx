import { useState } from "react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Message Sent!");
    };

    return (
        <div className="bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Get In Touch</h2>
                <p className="text-xl text-gray-600 mb-12">
                    We’d love to hear from you. Whether you have a question or just want to say hi, drop us a message!
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h3>
                        <p className="text-gray-600 mb-4">
                            123 Main Street, New York, NY 10001
                        </p>
                        <iframe
                            title="location"
                            src="https://www.google.com/maps/embed?pb=...your_map_embed_code_here..."
                            width="100%"
                            height="200"
                            className="rounded-lg shadow-md"
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Call Us</h3>
                        <p className="text-gray-600 mb-4">+1 (234) 567-890</p>
                        <p className="text-gray-600">Mon - Fri: 9 AM - 6 PM</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Email Us</h3>
                        <p className="text-gray-600 mb-4">support@example.com</p>
                        <p className="text-gray-600">We respond within 24 hours</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="message">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 btn btn-neutral "
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
