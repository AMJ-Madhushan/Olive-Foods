import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);

    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(storedAdmin === "true"); // convert string to boolean
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// PropTypes validation to satisfy ESLint
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
