import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Loader from "../Loader/Loader";

const FeaturedProducts = () => {
    const [products, loading, refetch] = useProducts()
    if (loading) {
        return <Loader></Loader>
    }
    const featuredProducts = products.filter((product) => product.featured === true)
    return (
        <div className="container mx-auto px-6">
            <h3 className="text-4xl md:text-2xl font-bold text-center my-24 text-gray-800">Featured Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {
                    featuredProducts?.map((product, index) => {
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <figure>
                                    <img
                                        className="h-[250px] w-full object-cover rounded-t-lg"
                                        src={product?.image}
                                        alt={product?.title}
                                    />
                                </figure>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{product?.title}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{product.description.slice(0, 100)}...</p>
                                    <div className="flex justify-end">
                                        <Link to={`/productDetails/${product._id}`} className="btn btn-neutral  text-yellow-300 rounded-md">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
};

export default FeaturedProducts;