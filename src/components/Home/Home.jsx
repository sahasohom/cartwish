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
        link="/product/687a7e12ece24ee4f45701bd"
        image={iphone}
      />
      <FeaturedProduct />
      <HeroSection
        title="Build the ultimate setup"
        subTitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini"
        link="/product/687a7e13ece24ee4f45701c5"
        image={mac}
      />
    </div>
  );
};

export default Home;
