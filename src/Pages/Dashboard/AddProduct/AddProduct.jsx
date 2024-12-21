import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const initialFormData = {
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: "",
        featured: false,
        addedBy: user.email
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            toast.error("User email not available. Please log in again.");
            return;
        }

        const dataToSend = { ...formData, addedBy: user.email };

        try {
            const response = await axiosSecure.post("/product", dataToSend);
            if (response.data.insertedId) {
                toast.success(`${formData.name} added successfully!`);
                setFormData(initialFormData);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            const serverMessage =
                error.response?.data?.message || "Something went wrong. Please try again!";
            toast.error(serverMessage);
        }
    };
    console.log(user)
    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-[1px] border-slate-100">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        rows={5}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter product category"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter product brand"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="mr-2 leading-tight"
                        />
                        Featured
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="btn btn-neutral text-yellow-300 font-bold focus:outline-none focus:shadow-outline"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
