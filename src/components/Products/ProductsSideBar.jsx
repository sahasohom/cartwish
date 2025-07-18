import useData from "../../hooks/useData";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSideBar.css";
import config from '../../config.json'

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
                emoji={`${config.backendURL}/category/${category.image}`}
                sidebar
              />
            );
          })}
      </div>
    </aside>
  );
};

export default ProductSideBar;
