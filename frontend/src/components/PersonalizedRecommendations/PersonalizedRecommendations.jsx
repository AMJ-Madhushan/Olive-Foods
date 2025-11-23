import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PersonalizedRecommendations.css';

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

  return (
    <div className="personalized-recommendations">
      <div className="recommendations-section-header">
        <h2>Personalized Meal Recommendations</h2>
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

      <div className="recommendations-grid">
        {displayRecommendations.map((item, index) => (
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

      {recommendations.length > 6 && (
        <div className="view-all-container">
          <button 
            onClick={() => navigate('/recommendations')} 
            className="btn-view-all"
          >
            View All Recommendations →
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;

