import about from "../../assets/About/About.png"

const AboutUs = () => {
    return (
        <div className="bg-gray-50 py-16 px-8 md:px-16 lg:px-32">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-12">About QuickMart</h1>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src={about}
                            alt="About QuickMart"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At QuickMart, we are dedicated to providing you with the best online shopping experience.
                            Our platform connects you with top-quality products from trusted brands, offering an extensive range
                            of electronics, fashion, home essentials, and more.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is to make online shopping simple, convenient, and enjoyable.
                            We are committed to ensuring customer satisfaction by delivering top-notch service and quality products.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Wide range of premium products</li>
                            <li>Secure payment methods</li>
                            <li>Fast and reliable shipping</li>
                            <li>Excellent customer support</li>
                            <li>Hassle-free returns and exchanges</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Join the QuickMart Family</h2>
                <p className="text-gray-700 text-lg mb-6">
                    Discover the joy of seamless online shopping with QuickMart. Your satisfaction is our priority.
                </p>
                <button className="px-8 py-3 btn btn-neutral">
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
