import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading animation when category changes
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // Filter foods based on selected category
      const filtered = food_list.filter(item => item.category === category);
      setFilteredFoods(filtered);
      setIsLoading(false);
    }, 300); // Small delay for smooth transition

    return () => clearTimeout(timer);
  }, [category, food_list]);

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-content">
        <div className="food-display-header">
          <h2>
            {category ? `${category}` : 'Our Menu'}
          </h2>
          <p className="food-count">
            {isLoading ? 'Loading...' : `${filteredFoods.length} delicious ${filteredFoods.length === 1 ? 'item' : 'items'} available`}
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
                className="food-item-wrapper"
                style={{ '--item-index': index }}
              >
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-food-found">
            <div className="no-food-icon">🍽️</div>
            <h3>No items found</h3>
            <p>We don't have any items in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
