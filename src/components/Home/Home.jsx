import HeroSection from "./HeroSection";
import "./Home.css";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProduct from "./FeaturedProduct";

const Home = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subTitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/67f97a3310f7277dd56a32f1"
        image={iphone}
      />
      <FeaturedProduct />
      <HeroSection
        title="Build the ultimate setup"
        subTitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini"
        link="/product/67f97a3310f7277dd56a32f9"
        image={mac}
      />
    </div>
  );
};

export default Home;
