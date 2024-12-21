import Banner from "../../components/home/Banner";
import Categories from "../../components/home/Categories";
import ContactSection from "../../components/home/ContactSection";
import FAQSection from "../../components/home/FAQSection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import Testimonials from "../../components/home/Testimonials";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <Categories></Categories>
            <Testimonials></Testimonials>
            <FAQSection></FAQSection>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;