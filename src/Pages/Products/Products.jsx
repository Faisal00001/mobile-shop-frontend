import { useState, useEffect, useMemo } from "react";
import useProducts from "../../hooks/useProducts";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, loading] = useProducts();
    const [filterdProductsContainer, setFilterdProductsContainer] = useState(products);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // Update filtered products after loading is complete
    useEffect(() => {
        if (!loading) {
            setFilterdProductsContainer(products);
        }
    }, [loading, products]);

    // Filter and Sort logic
    useEffect(() => {
        let filteredProducts = products;

        // Search filter
        if (searchTerm) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Brand filter
        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(
                (product) => product.brand === selectedBrand
            );
        }

        setFilterdProductsContainer(filteredProducts);
    }, [searchTerm, selectedCategory, selectedBrand, products]);

    // Memoized sorting logic to avoid re-sorting on every render
    const sortedProducts = useMemo(() => {
        if (!filterdProductsContainer) return [];

        return [...filterdProductsContainer].sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            if (sortOrder === "asc") {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
    }, [filterdProductsContainer, sortOrder]);

    if (loading) {
        return <Loader />;
    }

    // Categories and Brands (Can be dynamic based on your data)
    const categories = [...new Set(products.map((product) => product.category))];
    const brands = [...new Set(products.map((product) => product.brand))];

    return (
        <div className="py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-8 text-center">
                    Our Products
                </h2>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    {/* Search */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            className="px-4 py-2 w-full md:w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Sort by Price */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Sort by Price: Low to High</option>
                            <option value="desc">Sort by Price: High to Low</option>
                        </select>
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        {/* Category Filter */}
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        {/* Brand Filter */}
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="">All Brands</option>
                            {brands.map((brand, idx) => (
                                <option key={idx} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-56 w-full object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>
                            <p className="text-lg font-bold text-gray-800 mb-4">${product.price}</p>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{product.category}</span>
                                <span className="text-gray-600">{product.brand}</span>
                            </div>
                            <div className="my-5 flex justify-center">
                                <Link to={`/productDetails/${product._id}`} className="btn btn-neutral text-yellow-300">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
