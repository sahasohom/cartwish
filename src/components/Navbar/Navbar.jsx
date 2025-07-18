import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import locked from "../../assets/locked.png";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionAPI } from "../../services/productService";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim() !== "") {
        try {
          const res = await getSuggestionAPI(search);
          setSuggestions(res.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if ((e.key === "Enter") & (selectedItem > -1)) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      } else {
        setSelectedItem(-1);
      }
    }
  };

  return (
    <nav className="align_center navbar ">
      <div className="align_center">
        <h1 className="navbar_heading" onClick={() => navigate("/")}>
          CartWish
        </h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => {
                // console.log(suggestion);
                return (
                  <li
                    className={
                      selectedItem === index
                        ? "search_suggetion_link active"
                        : "search_suggetion_link"
                    }
                    key={suggestion._id}
                  >
                    <Link
                      to={`/products?search=${suggestion.title}`}
                      onClick={() => {
                        setSearch("");
                        setSuggestions([]);
                      }}
                    >
                      {suggestion.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={locked} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
