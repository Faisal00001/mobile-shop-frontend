import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../../components/Loader/Loader";

import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
    const { user, logOut, userInformation } = useContext(AuthContext)
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/productDetails/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false); // Ensure loading state is set to false
            }
        };

        fetchProduct();
    }, [axiosPublic, id]);

    if (loading) {
        return <Loader />;
    }

    const handleAddToCart = async () => {
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

    const handleAddToWishlist = async () => {
        const wishlistInfo = {
            userId: userInformation?._id,
            productId: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
        };

        try {
            const response = await axiosSecure.post("/wishlist", wishlistInfo);
            if (response.data.insertedId) {
                toast.success(`${product.name} added to wishlist!`);
            } else {
                toast.error("Failed to add to wishlist!");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            const serverMessage = error.response?.data?.message || "Something went wrong. Please try again!";
            toast.error(serverMessage);
        }
    };

    const handleShowError = () => {
        toast.error('Access denied! Only buyers can access this.')
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-5">
            <div className="max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8 md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.name}
                    </h1>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="mb-4">
                        <span className="block text-gray-700 font-semibold">Category:</span>
                        <p className="text-gray-800">{product.category}</p>
                    </div>

                    <div className="mb-4">
                        <span className="block text-gray-700 font-semibold">Brand:</span>
                        <p className="text-gray-800">{product.brand}</p>
                    </div>

                    <div className="mb-6">
                        <span className="block text-gray-700 font-semibold">Price:</span>
                        <p className="text-2xl font-bold text-black">
                            ${product.price}
                        </p>
                    </div>

                    <div className="flex gap-4 flex-col">
                        {
                            userInformation?.role === 'buyer' ? <button
                                onClick={handleAddToCart}
                                className="w-full btn btn-neutral"
                            >
                                Add to Cart
                            </button> : <button
                                onClick={handleShowError}
                                disabled
                                className="w-full btn btn-neutral"
                            >
                                Add to Cart
                            </button>
                        }
                        {
                            userInformation?.role === 'buyer' ? <button
                                onClick={handleAddToWishlist}
                                className="w-full btn btn-neutral"
                            >
                                Add to Wishlist
                            </button> : <button
                                onClick={handleShowError}
                                disabled
                                className="w-full btn btn-neutral"
                            >
                                Add to Wishlist
                            </button>
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
