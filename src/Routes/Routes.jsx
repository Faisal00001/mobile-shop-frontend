import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProjectDetails/ProjectDetails";
import AboutUs from "../Pages/About/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoutes";
import BuyerRouter from "./BuyerRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import WishList from "../Pages/Dashboard/WishList/WishList";
import BuyerRoute from "./BuyerRoute";
import SellerRoute from "./SellerRoute";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import ViewProduct from "../Pages/Dashboard/ViewProduct/ViewProduct";
import ManageProduct from "../Pages/Dashboard/ManageProducts/ManageProduct";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct/UpdateProduct";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contactUs',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <BuyerRouter> <Cart></Cart> </BuyerRouter>
            },
            {
                path: 'myWishlist',
                element: <BuyerRoute> <WishList></WishList> </BuyerRoute>
            },
            {
                path: 'addProduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: 'viewProducts',
                element: <SellerRoute><ViewProduct></ViewProduct></SellerRoute>
            },
            {
                path: 'manageProduct',
                element: <SellerRoute><ManageProduct></ManageProduct></SellerRoute>
            },
            {
                path: 'updateProduct/:id',
                element: <SellerRoute><UpdateProduct></UpdateProduct></SellerRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute> <ManageUsers></ManageUsers> </AdminRoute>
            }
        ]
    }
]);
export default router;