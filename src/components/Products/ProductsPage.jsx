import ProductsList from "./ProductsList";
import "./ProductsPage.css";
import ProductsSideBar from "./ProductsSideBar";

const ProductPage = () => {
  return (
    <section className="products_page">
      <ProductsSideBar />
      <ProductsList />
    </section>
  );
};

export default ProductPage;
