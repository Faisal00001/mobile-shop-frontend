import useCategories from "../../hooks/useCategories";
import Loader from "../Loader/Loader";


const Categories = () => {
    const [categories, loading] = useCategories()
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        categories?.map((category, index) => {
                            return <div key={index} className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg">
                                <img className="w-full h-72 object-cover transform transition-all duration-500 group-hover:scale-110" src={category?.image} alt="Bags Category" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                                <div className="absolute inset-0 flex justify-center items-center text-white text-center">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2">{category?.name}</h3>

                                    </div>
                                </div>
                            </div>

                        })
                    }

                </div>
            </div>

        </div>
    );
};

export default Categories;