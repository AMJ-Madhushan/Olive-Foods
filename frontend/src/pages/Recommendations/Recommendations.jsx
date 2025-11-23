import React, { useState, useContext, useEffect } from 'react';
import './Recommendations.css';
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

  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Finding the best meals for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1>🍽️ Personalized Meal Recommendations</h1>
        <p className="subtitle">
          Based on your health profile, we've found the best meals for you
        </p>
        
        {activeConditions.length > 0 && (
          <div className="active-conditions">
            <span className="conditions-label">Considering your conditions:</span>
            <div className="conditions-list">
              {activeConditions.map((condition, index) => (
                <span key={index} className="condition-tag">
                  {condition.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <h3>No recommendations available</h3>
          <p>Please update your health profile to get personalized recommendations</p>
          <button onClick={() => navigate('/health-profile')} className="btn-profile">
            Update Health Profile
          </button>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map((item, index) => (
            <div key={index} className="recommendation-card">
              <div className="card-header">
                <span className={`suitability-badge ${getSuitabilityClass(item.suitabilityScore)}`}>
                  {Math.round(item.suitabilityScore)}% Match
                </span>
                <span className="category-badge">{item.category}</span>
              </div>

              <div className="card-image">
                <img src={url + '/images/' + item.image} alt={item.name} />
              </div>

              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="description">
                  {item.description || 'Delicious and healthy meal option'}
                </p>

                <div className="nutritional-info">
                  <div className="nutrient">
                    <span className="nutrient-label">Calories</span>
                    <span className="nutrient-value">
                      {item.nutritionalInfo?.calories || 'N/A'}
                    </span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Protein</span>
                    <span className="nutrient-value">
                      {item.nutritionalInfo?.protein || 'N/A'}g
                    </span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Carbs</span>
                    <span className="nutrient-value">
                      {item.nutritionalInfo?.carbohydrates || 'N/A'}g
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="price">LKR {item.price}</span>
                  <button
                    onClick={() => {
                      addToCart(item.foodId);
                      toast.success('Added to cart!');
                    }}
                    className="btn-add-cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className={`match-indicator ${getSuitabilityClass(item.suitabilityScore)}`}>
                <span>{getSuitabilityLabel(item.suitabilityScore)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="recommendations-footer">
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to Home
        </button>
        <button onClick={fetchRecommendations} className="btn-refresh">
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  );
};

export default Recommendations;

