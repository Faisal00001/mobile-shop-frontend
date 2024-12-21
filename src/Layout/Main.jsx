import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Toaster } from "react-hot-toast";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default Main;