import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({});
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/productDetails/${id}`);
                setProduct(response.data);
                setFormValues(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [axiosPublic, id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPublic.patch(`/productDetails/${id}`, formValues);

            if (response.status === 200) {
                toast.success("Product updated successfully!");
                setProduct(response.data.product); // Update the UI with the updated product
            } else {
                console.warn(`Unexpected status code: ${response.status}`);
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                console.error(`Error status: ${error.response.status}, Message: ${error.response.data.message}`);
                toast.error(`Failed to update product: ${error.response.data.message}`);
            } else {
                console.error("Error:", error.message);
                toast.error("Failed to update product. Please check your network connection.");
            }
        }
    };


    if (loading) {
        return <Loader />;
    }
    console.log('ff', formValues)
    return (
        <>
            <h3 className="text-3xl font-bold text-center mt-10">Update Product</h3>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 text-gray-700 font-medium">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formValues.name || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-2 text-gray-700 font-medium">Description:</label>
                        <textarea
                            rows={5}
                            id="description"
                            name="description"
                            value={formValues.description || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="mb-2 text-gray-700 font-medium">Price:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formValues.price || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="mb-2 text-gray-700 font-medium">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formValues.category || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="brand" className="mb-2 text-gray-700 font-medium">Brand:</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formValues.brand || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="image" className="mb-2 text-gray-700 font-medium">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formValues.image || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="featured" className="text-gray-700 font-medium">Featured:</label>
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formValues.featured || false}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="addedBy" className="mb-2 text-gray-700 font-medium">Added By:</label>
                        <input
                            type="text"
                            id="addedBy"
                            name="addedBy"
                            value={formValues.addedBy || ""}
                            onChange={handleChange}
                            disabled
                            className="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </>

    );
};

export default UpdateProduct;
