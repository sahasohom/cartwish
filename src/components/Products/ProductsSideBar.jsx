import useData from "../../hooks/useData";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSideBar.css";

const ProductSideBar = () => {
  const [categories] = useData("category");

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {categories &&
          categories?.map((category) => {
            return (
              <LinkWithIcon
                key={category._id}
                id={category._id}
                title={category.name}
                link={`/products?category=${category.name}`}
                emoji={`http://localhost:5000/category/${category.image}`}
                sidebar
              />
            );
          })}
      </div>
    </aside>
  );
};

export default ProductSideBar;
