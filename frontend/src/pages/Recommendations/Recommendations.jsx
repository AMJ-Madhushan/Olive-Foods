import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const { url, token, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeConditions, setActiveConditions] = useState([]);

  useEffect(() => {
    if (!token) {
      toast.error('Please login first');
      navigate('/');
      return;
    }
    fetchRecommendations();
  }, [token]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + '/api/ml/recommend',
        { topN: 20 },
        { headers: { token } }
      );

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
        setActiveConditions(response.data.activeConditions || []);
      } else {
        if (response.data.needsHealthProfile) {
          toast.info('Please complete your health profile first');
          navigate('/health-profile');
        } else {
          toast.error(response.data.message || 'Failed to get recommendations');
        }
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

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

  const getSuitabilityLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
  };

  if (loading) {
    return (
      <div className="relative w-screen -ml-[calc(50vw-50%)] min-h-screen py-[120px] px-10 pb-[60px] bg-gradient-to-br from-light to-white box-border max-[768px]:py-[100px] max-[768px]:px-5 max-[768px]:pb-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <div className="w-[60px] h-[60px] border-[5px] border-[#f3f3f3] border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary text-xl font-semibold">Finding the best meals for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen -ml-[calc(50vw-50%)] min-h-screen py-[120px] px-10 pb-[60px] bg-gradient-to-br from-light to-white box-border max-[768px]:py-[100px] max-[768px]:px-5 max-[768px]:pb-10">
      <div className="text-center mb-12 animate-fadeInDown">
        <h1 className="text-primary text-[2.5rem] font-bold mb-2.5 max-[768px]:text-[2rem] max-[480px]:text-[1.8rem]">🍽️ Personalized Meal Recommendations</h1>
        <p className="text-[#666] text-lg mb-6 max-[768px]:text-base">
          Based on your health profile, we've found the best meals for you
        </p>
        
        {activeConditions.length > 0 && (
          <div className="flex flex-col items-center gap-3 mt-5">
            <span className="text-primary font-semibold text-base">Considering your conditions:</span>
            <div className="flex flex-wrap gap-2.5 justify-center max-[768px]:flex-col max-[768px]:items-stretch">
              {activeConditions.map((condition, index) => (
                <span key={index} className="bg-gradient-to-br from-primary to-primary-dark text-white py-2 px-4 rounded-[20px] text-sm font-semibold capitalize shadow-[0_4px_12px_rgba(78,140,1,0.3)] max-[768px]:text-center">
                  {condition.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-[60px] px-5 bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[600px] mx-auto">
          <h3 className="text-primary text-[1.8rem] mb-4">No recommendations available</h3>
          <p className="text-[#666] text-lg mb-6">Please update your health profile to get personalized recommendations</p>
          <button onClick={() => navigate('/health-profile')} className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-3.5 px-8 rounded-[10px] text-[1.05rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(78,140,1,0.3)] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)]">
            Update Health Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[30px] mb-10 animate-fadeIn max-[768px]:grid-cols-1 max-[768px]:gap-5">
          {recommendations.map((item, index) => (
            <div key={index} className="bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out relative animate-slideUp hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(78,140,1,0.2)]">
              <div className="absolute top-[15px] left-[15px] right-[15px] flex justify-between items-start z-10">
                <span className={`py-2 px-4 rounded-[20px] font-bold text-sm text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] ${getSuitabilityBadgeClass(item.suitabilityScore)}`}>
                  {Math.round(item.suitabilityScore)}% Match
                </span>
                <span className="bg-[rgba(78,140,1,0.9)] text-white py-1.5 px-3.5 rounded-[15px] text-xs font-semibold backdrop-blur-[10px]">{item.category}</span>
              </div>

              <div className="w-full h-[220px] overflow-hidden relative group">
                <img src={url + '/images/' + item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
              </div>

              <div className="p-5">
                <h3 className="text-[#333] text-xl font-bold mb-2.5 leading-snug">{item.name}</h3>
                <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description || 'Delicious and healthy meal option'}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-light-alt rounded-xl">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs text-[#666] font-medium mb-1">Calories</span>
                    <span className="text-lg text-primary font-bold">
                      {item.nutritionalInfo?.calories || 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs text-[#666] font-medium mb-1">Protein</span>
                    <span className="text-lg text-primary font-bold">
                      {item.nutritionalInfo?.protein || 'N/A'}g
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs text-[#666] font-medium mb-1">Carbs</span>
                    <span className="text-lg text-primary font-bold">
                      {item.nutritionalInfo?.carbohydrates || 'N/A'}g
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl text-primary font-bold">LKR {item.price}</span>
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
      )}

      <div className="flex justify-center gap-5 mt-10 animate-fadeIn max-[768px]:flex-col">
        <button onClick={() => navigate('/')} className="py-3.5 px-8 rounded-[10px] text-[1.05rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out border-none bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(78,140,1,0.3)] max-[768px]:w-full">
          ← Back to Home
        </button>
        <button onClick={fetchRecommendations} className="py-3.5 px-8 rounded-[10px] text-[1.05rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out border-none bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_4px_15px_rgba(78,140,1,0.3)] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)] max-[768px]:w-full">
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  );
};

export default Recommendations;

