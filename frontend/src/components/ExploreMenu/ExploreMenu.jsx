import React from "react";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory, categories }) => {
  
  // Category icons mapping (using emoji for better visual representation)
  const categoryIcons = {
    'Salads & Greens': '🥗',
    'Low-Carb Meals': '🥙',
    'High-Protein': '🍗',
    'Heart-Healthy': '❤️',
    'Diabetic-Friendly': '🩺',
    'Whole Grains': '🌾',
    'Lean Protein': '🍖',
    'Vegetarian': '🥬',
    'Soups': '🍲',
    'Grilled Items': '🔥'
  };

  // Category colors for visual distinction
  const categoryColors = {
    'Salads & Greens': '#4CAF50',
    'Low-Carb Meals': '#2196F3',
    'High-Protein': '#FF5722',
    'Heart-Healthy': '#E91E63',
    'Diabetic-Friendly': '#9C27B0',
    'Whole Grains': '#FF9800',
    'Lean Protein': '#795548',
    'Vegetarian': '#8BC34A',
    'Soups': '#FFC107',
    'Grilled Items': '#F44336'
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-header">
        <h2>Browse by Category</h2>
        <p>Select a category to explore our healthy meal options</p>
      </div>
      <div className="explore-menu-list">
        {categories.map((cat, index) => {
          const isActive = category === cat;
          const categoryColor = categoryColors[cat] || '#4E8C01';
          
          return (
            <div 
              onClick={() => handleCategoryClick(cat)} 
              key={index} 
              className={`explore-menu-list-item ${isActive ? 'active' : ''}`}
              style={{
                '--category-color': categoryColor,
                '--animation-delay': `${index * 0.1}s`
              }}
            >
              <div className="category-icon" style={{ backgroundColor: categoryColor }}>
                <span>{categoryIcons[cat] || '🍽️'}</span>
              </div>
              <p className="category-name">{cat}</p>
              {isActive && <div className="active-indicator"></div>}
            </div>
          );
        })}
      </div>
      {categories.length === 0 && (
        <div className="loading-categories">
          <div className="loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      )}
    </div>
  );
};

export default ExploreMenu;
