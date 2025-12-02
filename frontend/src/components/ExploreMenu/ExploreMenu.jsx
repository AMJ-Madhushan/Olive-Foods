import React from "react";

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
    <div className="flex flex-col gap-10 py-[60px] px-5 pb-10 bg-transparent max-w-[1400px] mx-auto" id="explore-menu">
      <div className="text-center animate-fadeInDown max-[768px]:py-10 max-[768px]:px-4">
        <h2 className="text-text font-bold text-[2.5rem] mb-2 max-[768px]:text-[2rem]">Browse by Category</h2>
        <p className="text-[#666] text-lg max-w-[600px] mx-auto max-[768px]:text-[0.95rem]">Select a category to explore our healthy meal options</p>
      </div>
      <div className="grid grid-cols-5 gap-6 py-5 max-[1200px]:grid-cols-4 max-[1200px]:gap-5 max-[768px]:grid-cols-3 max-[768px]:gap-4 max-[480px]:grid-cols-2">
        {categories.map((cat, index) => {
          const isActive = category === cat;
          const categoryColor = categoryColors[cat] || '#4E8C01';
          
          return (
            <div 
              onClick={() => handleCategoryClick(cat)} 
              key={index} 
              className={`relative flex flex-col items-center gap-3 p-5 px-4 bg-white rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-fadeInUp hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-[768px]:p-4 max-[768px]:px-2.5 ${
                isActive 
                  ? `-translate-y-2 scale-105 shadow-[0_12px_28px_rgba(0,0,0,0.2)]` 
                  : ''
              }`}
              style={{
                backgroundColor: isActive ? categoryColor : 'white',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center text-[2rem] transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-[1.15] hover:rotate-[5deg] max-[768px]:w-[60px] max-[768px]:h-[60px] max-[768px]:text-[1.8rem]" style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : categoryColor }}>
                <span>{categoryIcons[cat] || '🍽️'}</span>
              </div>
              <p className={`text-text text-[0.95rem] font-medium text-center transition-all duration-300 ease-in-out leading-tight max-[768px]:text-[0.85rem] max-[480px]:text-[0.8rem] ${isActive ? 'text-white font-semibold' : ''}`}>{cat}</p>
              {isActive && <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-white rounded-sm animate-[slideIn_0.3s_ease-out]"></div>}
            </div>
          );
        })}
      </div>
      {categories.length === 0 && (
        <div className="flex flex-col items-center gap-5 py-[60px] px-5">
          <div className="w-[50px] h-[50px] border-4 border-[#f3f3f3] border-t-primary rounded-full animate-spin"></div>
          <p className="text-[#666] text-lg">Loading categories...</p>
        </div>
      )}
    </div>
  );
};

export default ExploreMenu;
