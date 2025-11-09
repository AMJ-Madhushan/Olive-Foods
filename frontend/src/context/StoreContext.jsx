import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [hasHealthProfile, setHasHealthProfile] = useState(false);
  const [healthProfileRefreshTrigger, setHealthProfileRefreshTrigger] = useState(0);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Item added to cart");
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Add to cart error:", error);
        toast.error("Server error. Please try again.");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));

    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Item removed from cart");
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Remove from cart error:", error);
        toast.error("Server error. Please try again.");
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Error fetching products");
      }
    } catch (error) {
      console.error("Fetch food list error:", error);
      toast.error("Server error. Cannot fetch products.");
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Load cart data error:", error);
    }
  };

  const checkHealthProfileStatus = async () => {
    if (!token) {
      setHasHealthProfile(false);
      return;
    }
    
    try {
      const response = await axios.post(
        `${url}/api/ml/health-profile/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success && response.data.hasCompletedHealthProfile) {
        setHasHealthProfile(true);
      } else {
        setHasHealthProfile(false);
      }
    } catch (error) {
      console.error('Error checking health profile:', error);
      setHasHealthProfile(false);
    }
  };

  const refreshHealthProfileStatus = () => {
    setHealthProfileRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      checkHealthProfileStatus();
    } else {
      setHasHealthProfile(false);
    }
  }, [token, healthProfileRefreshTrigger]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    hasHealthProfile,
    refreshHealthProfileStatus,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
