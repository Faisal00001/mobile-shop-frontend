import useTestimonials from "../../hooks/useTestimonials";
import Loader from "../Loader/Loader";

const Testimonials = () => {
    const [testimonials, loading] = useTestimonials()
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div className="my-24">
            <div>
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-2xl font-extrabold text-gray-800 mb-8">What Our Customers Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Testimonial 1 */}
                            {
                                testimonials?.map((data, index) => {
                                    return <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                        <p className="text-lg text-gray-600 mb-4">"{data?.testimonial}"</p>
                                        <div>
                                            <p className="font-semibold text-gray-800">{data?.name}</p>
                                            <p className="text-gray-500">{data?.position}, {data?.company}</p>
                                        </div>
                                    </div>
                                })
                            }

                            {/* Testimonial 2 */}


                        </div>
                    </div>
                </section>
            </div>


        </div>
    );
};

export default Testimonials;