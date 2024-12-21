import useCart from "../../../hooks/useCart";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
    const [userCart, isCartDataLoading, refetch] = useCart();
    const axiosSecure = useAxiosSecure()

    if (isCartDataLoading) {
        return <Loader />;
    }
    const handleDelete = async (id) => {
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
                    const response = await axiosSecure.delete(`/cart/${id}`)
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
    console.log(userCart)
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-10">Your Cart Items</h3>
            {userCart.length === 0 ? (
                <div className="flex h-64">
                    <p className="text-lg font-medium text-gray-600">Your cart is empty!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCart.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="mt-4">
                                <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                                <p className="text-gray-600 mt-1">{item.description}</p>
                                <p className="text-lg font-bold text-gray-800 mt-2">${item.price}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                                        Remove
                                    </button>
                                    <span className="text-gray-700">Qty: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
