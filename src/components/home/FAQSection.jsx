import { useState } from "react";

const FAQs = [
    {
        question: "What is your return policy?",
        answer: "Our return policy allows for returns within 30 days of purchase. Items must be unused and in their original packaging. Please contact customer service for assistance.",
    },
    {
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and visiting the 'My Orders' section. A tracking number will be provided once your order is shipped.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping to select countries. Shipping fees and times may vary depending on your location.",
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach our customer support team via email at support@example.com or through our live chat available on our website.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>

            <div className="space-y-6">
                {FAQs.map((faq, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <button
                            className="w-full text-left py-6 px-6 flex justify-between items-center hover:bg-gray-100 focus:outline-none transition duration-300"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="text-lg font-semibold text-gray-700">{faq.question}</span>
                            <svg
                                className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="px-6 pb-6 text-gray-600 text-sm">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
