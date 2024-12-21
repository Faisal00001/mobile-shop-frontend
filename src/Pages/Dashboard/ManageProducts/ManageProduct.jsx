import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useSellerProducts from "../../../hooks/useSellerProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProduct = () => {
    const axiosSecure = useAxiosSecure()
    const [sellerProducts, loading, refetch] = useSellerProducts();

    if (loading) {
        return <Loader></Loader>;
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/product/${id}`)
                    if (response.data.deletedCount > 0) {

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    } else {
                        // Handle case where no items were deleted or error occurred
                        console.error("No item deleted or an error occurred.");
                        alert("Failed to delete item.");
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        });
    }
    return (
        <div>
            <div>
                <h3 className="text-3xl font-bold mb-20 mt-10">Manage Products</h3>
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
                                Action
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
                                    <div className="flex gap-3 items-center">
                                        <Link
                                            to={`/dashboard/updateProduct/${product._id}`}
                                            className="btn bg-green-500 hover:bg-green-500 font-medium text-white"
                                        >
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="btn bg-red-500 hover:bg-red-500 font-medium text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;
