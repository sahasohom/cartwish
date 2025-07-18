import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import { useSearchParams } from "react-router-dom";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const page = search.get("page") ? search.get("page") : 1;
  const [products, isLoading] = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
      },
    },
    [searchQuery, category, page]
  );

  const skeletonsData = [1, 2, 3, 4, 5, 6, 7, 8];
  const handlePageChange = (page) => {
    const currentrParams = Object.fromEntries([...search]);
    setSearch({ ...currentrParams, page });
  };

  // useEffect(()=>{
  //   const handleScroll = () =>{
  //     const {scrollTop,clientHeight} = document.documentElement
  //   }

  //   window.addEventListener("scroll",handleScroll)
  // },[])

  useEffect(() => {
    if (products && products.products) {
      const productsData = [...products.products];
      if (sortBy === "price desc") {
        setSortedProducts(productsData.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(productsData.sort((a, b) => a.price - b.price));
      }
      if (sortBy === "rate desc") {
        setSortedProducts(
          productsData.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          productsData.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(productsData);
      }
    }
  }, [sortBy, products]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>

      <div className="product_list">
        {isLoading
          ? skeletonsData.map((n) => {
              return <ProductCardSkeleton key={n} />;
            })
          : products?.products &&
            sortedProducts &&
            sortedProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
      </div>
      {products && (
        <Pagination
          totalPosts={products?.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductList;
