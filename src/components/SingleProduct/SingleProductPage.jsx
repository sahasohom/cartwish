import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import useData from "../../hooks/useData";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product] = useData(`/products/${id}`);

  return (
    <section className="align_center single_product">
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => {
                return (
                  <img
                    src={`http://localhost:5000/products/${image}`}
                    alt="image"
                    key={index}
                    className={selectedImage === index ? "selected_image" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                );
              })}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">{product.price.toFixed(2)}</p>

            {user && (
              <>
                <h2 className="quantity_title">Quantity:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>
                <div
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
