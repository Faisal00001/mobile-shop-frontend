import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useSellerProducts from "../../../hooks/useSellerProducts";

const ViewProduct = () => {
    const [sellerProducts, loading] = useSellerProducts();

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div>
            <div>
                <h3 className="text-3xl font-bold mb-20 mt-10">Products</h3>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Brand
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellerProducts.map((product) => (
                            <tr
                                key={product.name}
                                className="bg-white border-b   hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    <img
                                        src={product.image}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={product.name}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    {product.brand}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.addedBy}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/productDetails/${product._id}`}
                                        className="font-medium text-blue-600  hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewProduct;
