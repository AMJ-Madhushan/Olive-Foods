import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PersonalizedRecommendations = () => {
  const { url, token, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [activeConditions, setActiveConditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchSavedRecommendations();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchSavedRecommendations = async () => {
    try {
      const response = await axios.post(
        url + '/api/ml/recommendations/get',
        {},
        { headers: { token } }
      );

      if (response.data.success && response.data.hasRecommendations) {
        setRecommendations(response.data.recommendations);
        setActiveConditions(response.data.activeConditions || []);
      } else {
        setRecommendations([]);
        setActiveConditions([]);
      }
    } catch (error) {
      console.error('Error fetching saved recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuitabilityClass = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'low';
  };

  const getSuitabilityLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
  };

  // Don't render if no recommendations or not logged in
  if (!token || loading || recommendations.length === 0) {
    return null;
  }

  // Show only top 6 recommendations on home page
  const displayRecommendations = recommendations.slice(0, 6);

  const getSuitabilityBadgeClass = (score) => {
    if (score >= 80) return 'bg-gradient-to-br from-[#4CAF50] to-[#388E3C]';
    if (score >= 60) return 'bg-gradient-to-br from-[#2196F3] to-[#1976D2]';
    if (score >= 40) return 'bg-gradient-to-br from-[#FF9800] to-[#F57C00]';
    return 'bg-gradient-to-br from-[#9E9E9E] to-[#757575]';
  };

  const getMatchIndicatorClass = (score) => {
    if (score >= 80) return 'bg-[#4CAF50]';
    if (score >= 60) return 'bg-[#2196F3]';
    if (score >= 40) return 'bg-[#FF9800]';
    return 'bg-[#9E9E9E]';
  };

  return (
    <div className="py-20 bg-white w-screen -ml-[calc(50vw-50%)] mt-0">
      <div className="text-center mb-12 animate-fadeInDown max-w-[1200px] mx-auto px-5">
        <h2 className="text-text text-[2.5rem] font-semibold mb-2.5 max-[768px]:text-[2rem] max-[480px]:text-[1.75rem]">Personalized Meal Recommendations</h2>
        <p className="text-text text-lg mb-6 leading-relaxed max-[768px]:text-base">
          Based on your health profile, we've found the best meals for you
        </p>
        {activeConditions.length > 0 && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <span className="text-primary font-semibold text-[0.95rem]">Considering your conditions:</span>
            <div className="flex flex-wrap gap-2.5 justify-center max-[768px]:flex-col max-[768px]:items-stretch">
              {activeConditions.map((condition, index) => (
                <span key={index} className="bg-gradient-to-br from-primary to-primary-dark text-white py-2 px-4 rounded-[20px] text-[0.85rem] font-semibold capitalize shadow-[0_4px_12px_rgba(78,140,1,0.3)] max-[768px]:text-center">
                  {condition.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[30px] mb-8 animate-fadeIn max-w-[1200px] mx-auto px-5 max-[768px]:grid-cols-1 max-[768px]:gap-5">
        {displayRecommendations.map((item, index) => (
          <div key={index} className="bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out relative animate-slideUp hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(78,140,1,0.2)]">
            <div className="absolute top-[15px] left-[15px] right-[15px] flex justify-between items-start z-10">
              <span className={`py-2 px-4 rounded-[20px] font-bold text-[0.85rem] text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] ${getSuitabilityBadgeClass(item.suitabilityScore)}`}>
                {Math.round(item.suitabilityScore)}% Match
              </span>
              <span className="bg-[rgba(78,140,1,0.9)] text-white py-1.5 px-3.5 rounded-[15px] text-xs font-semibold backdrop-blur-[10px]">{item.category}</span>
            </div>

            <div className="w-full h-[200px] overflow-hidden relative group">
              <img src={url + '/images/' + item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
            </div>

            <div className="p-[18px]">
              <h3 className="text-[#333] text-xl font-bold mb-2 leading-snug">{item.name}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-3 line-clamp-2">
                {item.description || 'Delicious and healthy meal option'}
              </p>

              <div className="grid grid-cols-3 gap-2.5 mb-4 p-3 bg-light-alt rounded-xl">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-[#666] font-medium mb-1">Calories</span>
                  <span className="text-base text-primary font-bold">
                    {item.nutritionalInfo?.calories || 'N/A'}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-[#666] font-medium mb-1">Protein</span>
                  <span className="text-base text-primary font-bold">
                    {item.nutritionalInfo?.protein || 'N/A'}g
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-[#666] font-medium mb-1">Carbs</span>
                  <span className="text-base text-primary font-bold">
                    {item.nutritionalInfo?.carbohydrates || 'N/A'}g
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl text-primary font-bold">LKR {item.price}</span>
                <button
                  onClick={() => {
                    addToCart(item.foodId);
                    toast.success('Added to cart!');
                  }}
                  className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-2.5 px-5 rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(78,140,1,0.3)]"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className={`py-2 text-center font-semibold text-xs text-white ${getMatchIndicatorClass(item.suitabilityScore)}`}>
              <span>{getSuitabilityLabel(item.suitabilityScore)}</span>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length > 6 && (
        <div className="text-center mt-8 animate-fadeIn max-w-[1200px] mx-auto px-5">
          <button 
            onClick={() => navigate('/recommendations')} 
            className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-3.5 px-8 rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(78,140,1,0.3)] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)]"
          >
            View All Recommendations →
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;

