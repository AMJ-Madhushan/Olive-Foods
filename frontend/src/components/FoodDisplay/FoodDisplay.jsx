import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list, url, addToCart, toast } = useContext(StoreContext); // assuming toast is available or use react-toastify
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = category && category !== "All"
        ? food_list.filter(item => item.category === category)
        : food_list;

      setFilteredFoods(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [category, food_list]);

  // Optional: if you don't have toast in context, import it here
  // import { toast } from 'react-toastify';

  const handleAddToCart = (foodId, foodName) => {
    addToCart(foodId);
    toast?.success?.(`${foodName} added to cart!`) || alert(`${foodName} added!`);
  };

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-content">
        <div className="food-display-header">
          <h2>{category && category !== "All" ? category : "Our Menu"}</h2>
          <p className="food-count">
            {isLoading
              ? "Loading..."
              : `${filteredFoods.length} delicious ${filteredFoods.length === 1 ? "item" : "items"} available`}
          </p>
        </div>

        {isLoading ? (
          <div className="food-loading">
            <div className="loading-spinner-large"></div>
            <p>Loading delicious meals...</p>
          </div>
        ) : filteredFoods.length > 0 ? (
          <div className="food-display-list">
            {filteredFoods.map((item, index) => (
              <div
                key={item._id}
                className="food-item-wrapper rich-food-card-wrapper"
                style={{ "--item-index": index }}
              >
                <div className="recommendation-card menu-card">
                  {/* Category Badge */}
                  <div className="card-header">
                    <span className="category-badge">{item.category}</span>
                  </div>

                  {/* Image */}
                  <div className="card-image">
                    <img
                      src={url + "/images/" + item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="card-content">
                    <h3>{item.name}</h3>
                    <p className="description">
                      {item.description || "A delicious and nutritious meal option"}
                    </p>

                    {/* Nutritional Info */}
                    <div className="nutritional-info">
                      <div className="nutrient">
                        <span className="nutrient-label">Calories</span>
                        <span className="nutrient-value">
                          {item.nutritionalInfo?.calories || "N/A"}
                        </span>
                      </div>
                      <div className="nutrient">
                        <span className="nutrient-label">Protein</span>
                        <span className="nutrient-value">
                          {item.nutritionalInfo?.protein || "N/A"}g
                        </span>
                      </div>
                      <div className="nutrient">
                        <span className="nutrient-label">Carbs</span>
                        <span className="nutrient-value">
                          {item.nutritionalInfo?.carbohydrates || "N/A"}g
                        </span>
                      </div>
                    </div>

                    {/* Price + Add to Cart */}
                    <div className="card-footer">
                      <span className="price">LKR {item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(item._id, item.name)}
                        className="btn-add-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-food-found">
            <div className="no-food-icon">Plate</div>
            <h3>No items found</h3>
            <p>We don't have any items in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;