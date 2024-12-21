import { useContext } from "react";
import { CgPassword } from "react-icons/cg";

import { FaCartShopping, FaMapLocationDot } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";

import { IoIosHome } from "react-icons/io";

import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import useSeller from "../hooks/useSeller";
import useUser from "../hooks/useUser";
import { IoAddCircle, IoListCircleSharp } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { SiNginxproxymanager } from "react-icons/si";


const Dashboard = () => {
    const [isUser, isUserLoading] = useUser()
    const [isSeller, isSellerLoading] = useSeller()
    if (isUserLoading || isSellerLoading) {
        return <Loader></Loader>
    }

    // console.log('Seller', isSeller)
    return (
        <div>
            <div>
                <div>
                    <div className="flex flex-col md:flex-row">
                        {
                            isUser ?
                                <div className="drawer md:w-[25%] lg:drawer-open">
                                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                                    <div className="drawer-content flex flex-col my-10 px-5">
                                        {/* Page content here */}
                                        <label htmlFor="my-drawer-2" className="btn bg-blue-700 hover:bg-blue-700 text-white drawer-button lg:hidden">Click to open menus</label>

                                    </div>
                                    <div className="drawer-side z-50 lg:z-0">
                                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                                        <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                                            {/* Sidebar content here */}
                                            <NavLink to="/" className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                            }>

                                                <div className="flex gap-2 items-center">
                                                    <IoIosHome className="text-2xl"></IoIosHome>
                                                    <h3>Home</h3>
                                                </div></NavLink>
                                            <NavLink to={`/dashboard/cart`} className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                            }>

                                                <div className="flex gap-2 items-center">
                                                    <FaCartShopping className="text-2xl" />
                                                    <h3>Cart</h3>
                                                </div></NavLink>


                                            <NavLink to="/dashboard/myWishlist" className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                            }>

                                                <div className="flex gap-2 items-center">
                                                    <GoChecklist className="text-2xl"></GoChecklist>
                                                    <h3>My Wishlist</h3>
                                                </div></NavLink>



                                        </ul>

                                    </div>
                                </div> : isSeller ?
                                    <div className="drawer md:w-[25%] lg:drawer-open">
                                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content flex flex-col my-10 px-5">
                                            {/* Page content here */}
                                            <label htmlFor="my-drawer-2" className="btn bg-blue-700 hover:bg-blue-700 text-white drawer-button lg:hidden">Click to open menus</label>

                                        </div>
                                        <div className="drawer-side z-50 lg:z-0">
                                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                                            <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                                                {/* Sidebar content here */}
                                                <NavLink to="/" className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <IoIosHome className="text-2xl"></IoIosHome>
                                                        <h3>Home</h3>
                                                    </div></NavLink>
                                                <NavLink to={`/dashboard/addProduct`} className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <IoAddCircle className="text-2xl" />
                                                        <h3>Add a product</h3>
                                                    </div></NavLink>


                                                <NavLink to="/dashboard/viewProducts" className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <CiViewTable className="text-2xl"></CiViewTable>
                                                        <h3>View Products</h3>
                                                    </div></NavLink>
                                                <NavLink to="/dashboard/manageProduct" className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <SiNginxproxymanager className="text-2xl"></SiNginxproxymanager>
                                                        <h3>Manage Products</h3>
                                                    </div></NavLink>



                                            </ul>

                                        </div>
                                    </div> : <div className="drawer md:w-[25%] lg:drawer-open">
                                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                                        <div className="drawer-content flex flex-col my-10 px-5">
                                            {/* Page content here */}
                                            <label htmlFor="my-drawer-2" className="btn bg-blue-700 hover:bg-blue-700 text-white drawer-button lg:hidden">Click to open menus</label>

                                        </div>
                                        <div className="drawer-side z-50 lg:z-0">
                                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                                            <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                                                {/* Sidebar content here */}
                                                <NavLink to="/" className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <IoIosHome className="text-2xl"></IoIosHome>
                                                        <h3>Home </h3>
                                                    </div></NavLink>
                                                <NavLink to={`/dashboard/manageUsers`} className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                                }>

                                                    <div className="flex gap-2 items-center">
                                                        <IoListCircleSharp className="text-2xl" />
                                                        <h3>Manage Users</h3>
                                                    </div></NavLink>







                                            </ul>

                                        </div>
                                    </div>
                        }

                        <div className="md:w-[75%]">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    );
};

export default Dashboard;