import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJWT, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";

setAuthToken(getJWT());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const location = useLocation();
  const hideFooterPaths = ["/login", "/signup"];

  const getCart = async () => {
    try {
      const res = await getCartAPI();
      const data = res.data;

      if (Array.isArray(data)) {
        setCart(data);
      } else {
        console.error("Expected cart data to be an array, got:", data);
        setCart([]);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setCart([]);
    }
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (jwtUser) {
        if (Date.now() >= jwtUser.exp * 1000) {
          localStorage.removeItem("token");
          location.reload();
        } else {
          setUser(jwtUser);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err.response);
        setCart(cart);
      });
  };

  const updateCart = async (type, id) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => {
      return item.product._id === id;
    });
    if (type === "increase") {
      const res = await increaseProductAPI(id);
      if (res.status === 200) {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        toast.success(res.data.message);
      }
    }
    if (type === "decrease") {
      const res = await decreaseProductAPI(id);
      if (res.status === 200) {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        toast.success(res.data.message);
      }
    }
  };

  const removeFromCart = async (id) => {
    const res = await removeFromCartAPI(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => {
        return item.product._id !== id;
      });
      setCart(newCart);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main className="main-content">
            <ToastContainer />
            <Routing />
          </main>
          {!hideFooterPaths.includes(location.pathname) && <Footer />}
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
