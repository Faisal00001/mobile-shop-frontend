import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import useLocalStorageUser from "../hooks/useLocalStorageUser";



const Navbar = () => {
    const navigate = useNavigate()
    const [photoURL, setPhotoURL] = useState('')
    const [displayName, setDisplayName] = useState('')
    // const checkUserRole = JSON(localStorage.getItem())
    const { user, logOut } = useContext(AuthContext)

    useEffect(() => {
        if (user && user?.displayName && user?.photoURL) {
            setDisplayName(user?.displayName || 'Unknowen')
            setPhotoURL(user?.photoURL || '')
        }
    }, [user])
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfully')
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>

                                <Link to={'/products'}>Products</Link>

                            </li>
                            <li>
                                <Link to={'/aboutUs'}>About</Link>
                            </li>
                            <li>
                                <Link to={'/contactUs'}>Contact</Link>
                            </li>
                            {
                                user && <li>
                                    <button onClick={() => {
                                        return navigate('/dashboard')
                                    }}>Dashboard</button>
                                </li>
                            }
                            {/* {
                                userInfomation?.role === 'buyer' ? <li className="mr-5">
                                    <button className="bg-pink-400">My Cart</button>
                                </li> : <li className="mr-5">
                                    <button className="bg-pink-100">My Cart</button>
                                </li>
                            } */}



                            {
                                user && <li>
                                    <button onClick={handleLogout}>LogOut</button>
                                </li>
                            }


                        </ul>
                    </div>
                    <Link to={'/'} className="text-2xl font-bold cursor-pointer">QuickMart</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>

                            <Link to={'/products'}>Products</Link>

                        </li>
                        <li>
                            <Link to={'/aboutUs'}>About</Link>
                        </li>
                        <li>
                            <Link to={'/contactUs'}>Contact</Link>
                        </li>
                        {
                            user && <li>
                                <button onClick={() => {
                                    return navigate('/dashboard')
                                }}>Dashboard</button>
                            </li>
                        }
                        {/* {
                            userInfomation?.role === 'buyer' ? <li className="mr-5">
                                <button className="bg-pink-400">My Cart</button>
                            </li> : <li className="mr-5">
                                <button className="bg-pink-100">My Cart</button>
                            </li>
                        } */}
                        {
                            user && <li >
                                <button onClick={handleLogout}>LogOut</button>
                            </li>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && <>
                            <div>

                                <div className="avatar online">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>

                            </div>
                        </>
                    }
                    {
                        !user && <Link to={'/login'} className="btn btn-neutral">Login</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;