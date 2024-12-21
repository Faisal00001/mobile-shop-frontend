import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useWishList from "../../../hooks/useWishList";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const WishList = () => {
    const axiosSecure = useAxiosSecure()
    const [wishList, loading, refetch] = useWishList();
    const { userInformation } = useContext(AuthContext)
    if (loading) {
        return <Loader></Loader>
    }
    const handleAddToCart = async (product) => {
        console.log(`Product added to cart: ${product.name}`);
        const cartInfo = {
            userId: userInformation?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            productId: product?._id,
            quantity: 1,
        };

        try {
            const response = await axiosSecure.post("/cart", cartInfo);
            if (response.data.insertedId) {
                toast.success(`${product.name} added to cart!`);
            } else {
                toast.error("Failed to add to cart!");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Something went wrong. Please try again!");
        }
    };
    const handleRemoveWishList = (id) => {
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
                    const response = await axiosSecure.delete(`/wishList/${id}`)
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10">Your Wishlist</h2>
            {wishList.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg font-medium text-gray-600">Your wishlist is empty!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishList.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                                <p className="text-lg font-bold text-gray-800 mt-4">${item.price}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => handleRemoveWishList(item._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Remove
                                    </button>
                                    <button onClick={() => handleAddToCart(item)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishList;
