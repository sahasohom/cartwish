import useData from "../../hooks/useData";
import ProductCard from "../Products/ProductCard";
import "./FeaturedProduct.css";

const FeaturedProduct = () => {
  const [products] = useData("/products/featured");

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      <div className="align_center featured_products_list">
        {products &&
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
    </section>
  );
};

export default FeaturedProduct;
