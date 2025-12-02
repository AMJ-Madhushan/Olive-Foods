import React, { useContext, useState, useEffect } from "react";
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
    <div className="pb-[60px] bg-transparent w-full m-0 min-h-[500px]" id="food-display">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="text-center mb-12 animate-fadeInDown">
          <h2 className="text-[2.5rem] font-bold text-text mb-2 animate-slideInFromLeft max-[768px]:text-[2rem] max-[480px]:text-[1.75rem]">{category && category !== "All" ? category : "Our Menu"}</h2>
          <p className="text-primary text-lg font-medium animate-slideInFromRight max-[768px]:text-base">
            {isLoading
              ? "Loading..."
              : `${filteredFoods.length} delicious ${filteredFoods.length === 1 ? "item" : "items"} available`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-[100px] px-5 gap-5">
            <div className="w-[60px] h-[60px] border-[5px] border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[#666] text-xl font-medium">Loading delicious meals...</p>
          </div>
        ) : filteredFoods.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[30px] gap-y-10 max-[1200px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] max-[1200px]:gap-[25px] max-[1200px]:gap-y-9 max-[768px]:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-[768px]:gap-5 max-[768px]:gap-y-8 max-[480px]:grid-cols-1 max-[480px]:gap-5">
            {filteredFoods.map((item, index) => (
              <div
                key={item._id}
                className="animate-fadeInScale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out relative hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(78,140,1,0.2)]">
                  {/* Category Badge */}
                  <div className="absolute top-[15px] left-[15px] right-[15px] flex justify-between items-start z-10">
                    <span className="bg-[rgba(78,140,1,0.9)] text-white py-1.5 px-3.5 rounded-[15px] text-xs font-semibold backdrop-blur-[10px]">{item.category}</span>
                  </div>

                  {/* Image */}
                  <div className="w-full h-[200px] overflow-hidden relative">
                    <img
                      src={url + "/images/" + item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-[18px]">
                    <h3 className="text-[#333] text-xl font-bold mb-2 leading-snug">{item.name}</h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-3 line-clamp-2">
                      {item.description || "A delicious and nutritious meal option"}
                    </p>

                    {/* Nutritional Info */}
                    <div className="grid grid-cols-3 gap-2.5 mb-4 p-3 bg-light-alt rounded-xl">
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs text-[#666] font-medium mb-1">Calories</span>
                        <span className="text-base text-primary font-bold">
                          {item.nutritionalInfo?.calories || "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs text-[#666] font-medium mb-1">Protein</span>
                        <span className="text-base text-primary font-bold">
                          {item.nutritionalInfo?.protein || "N/A"}g
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs text-[#666] font-medium mb-1">Carbs</span>
                        <span className="text-base text-primary font-bold">
                          {item.nutritionalInfo?.carbohydrates || "N/A"}g
                        </span>
                      </div>
                    </div>

                    {/* Price + Add to Cart */}
                    <div className="flex justify-between items-center">
                      <span className="text-xl text-primary font-bold">LKR {item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(item._id, item.name)}
                        className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-2.5 px-5 rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(78,140,1,0.3)]"
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
          <div className="flex flex-col items-center justify-center py-[100px] px-5 text-center animate-fadeIn">
            <div className="text-[5rem] mb-4 animate-bounce max-[768px]:text-[4rem]">Plate</div>
            <h3 className="text-text text-[2rem] mb-2 max-[768px]:text-2xl">No items found</h3>
            <p className="text-[#666] text-lg max-w-[500px]">We don't have any items in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;