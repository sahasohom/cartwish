import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import config from '../../config.json'

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);

  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  useEffect(() => {
    let total = 0;
    cart &&
      cart.forEach((item) => {
        return (total += item.product.price * item.quantity);
      });
    setSubTotal(total);
  }, [cart]);

  const onCheckOutClick = async () => {
    const res = await checkoutAPI();
    const oldCart = [...cart];
    if (res.status === 200) {
      toast.success("Order Placed Successfully!");
      setCart([]);
    } else {
      toast.error("Something went wrong");
      setCart(oldCart);
    }
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="User Profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart &&
            cart?.map(({ product, quantity }) => {
              return (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td className="align_center table_quantity_input">
                    <QuantityInput
                      quantity={quantity}
                      stock={product.stock}
                      setQuantity={updateCart}
                      cartPage={true}
                      productId={product._id}
                    />
                  </td>
                  <td>${product.price * quantity}</td>
                  <td>
                    <img
                      src={remove}
                      alt="remove icon"
                      className="cart_remove_icon"
                      onClick={() => removeFromCart(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>${cart.length > 0 ? 5 : 0}</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${cart.length > 0 ? subTotal + 5 : 0}</td>
          </tr>
        </tbody>
      </table>
      <button
        className={`search_button checkout_button ${cart.length === 0 ? "disabled_button" : ""
          }`}
        onClick={() => cart.length > 0 && onCheckOutClick()}
      >
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
