
import banner from "../../assets/Banner/banner.jpg"
const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${banner})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md text-yellow-300">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to QuickMart!</h1>
                        <p className="mb-5 font-bold">
                            Experience fast, easy, and reliable shopping. Find everything you need at unbeatable prices — all in one place!
                        </p>
                        <button className="btn btn-neutral text-yellow-300">Start Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;