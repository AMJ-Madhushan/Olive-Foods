import React, { useState, useContext, useEffect } from 'react';
import './HealthProfile.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HealthProfile = () => {
  const { url, token, refreshHealthProfileStatus } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [healthData, setHealthData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    conditions: {
      diabetes: false,
      hypertension: false,
      heartDisease: false,
      highCholesterol: false,
      obesity: false,
      kidneyDisease: false
    }
  });

  const [loading, setLoading] = useState(false);
  const [bmiData, setBmiData] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error('Please login first');
      navigate('/');
      return;
    }
    fetchHealthProfile();
  }, [token]);

  const fetchHealthProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + '/api/ml/health-profile/get',
        {},
        { headers: { token } }
      );
      if (response.data.success && response.data.healthProfile) {
        // Ensure all fields are properly set, including conditions
        const profile = response.data.healthProfile;
        setHealthData({
          age: profile.age || '',
          weight: profile.weight || '',
          height: profile.height || '',
          activityLevel: profile.activityLevel || 'moderate',
          conditions: {
            diabetes: profile.conditions?.diabetes || false,
            hypertension: profile.conditions?.hypertension || false,
            heartDisease: profile.conditions?.heartDisease || false,
            highCholesterol: profile.conditions?.highCholesterol || false,
            obesity: profile.conditions?.obesity || false,
            kidneyDisease: profile.conditions?.kidneyDisease || false
          }
        });
        
        // If height and weight exist, calculate and display BMI
        if (profile.height && profile.weight) {
          try {
            const heightM = profile.height / 100;
            const bmi = profile.weight / (heightM * heightM);
            
            let category, status, healthRisk;
            if (bmi < 18.5) {
              category = 'Underweight';
              status = 'You are underweight. Consider eating more nutritious foods.';
              healthRisk = 'low';
            } else if (bmi < 25) {
              category = 'Normal';
              status = 'You have a healthy weight. Maintain your current lifestyle!';
              healthRisk = 'minimal';
            } else if (bmi < 30) {
              category = 'Overweight';
              status = 'You are overweight. Consider a balanced diet and exercise.';
              healthRisk = 'medium';
            } else {
              category = 'Obese';
              status = 'You are obese. Please consult a healthcare professional.';
              healthRisk = 'high';
            }
            
            setBmiData({
              bmi: parseFloat(bmi.toFixed(2)),
              category,
              status,
              healthRisk
            });
          } catch (error) {
            console.error('Error calculating BMI from profile:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching health profile:', error);
      toast.error('Error loading health profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('condition_')) {
      const conditionName = name.replace('condition_', '');
      setHealthData(prev => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          [conditionName]: checked
        }
      }));
    } else {
      setHealthData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const calculateBMI = async () => {
    if (!healthData.height || !healthData.weight) {
      toast.error('Please enter height and weight');
      return;
    }

    try {
      const response = await axios.post(
        url + '/api/ml/calculate-bmi',
        {
          height: parseFloat(healthData.height),
          weight: parseFloat(healthData.weight)
        },
        { headers: { token } }
      );

      if (response.data.success) {
        setBmiData(response.data);
        toast.success(`Your BMI is ${response.data.bmi} - ${response.data.category}`);
      }
    } catch (error) {
      console.error('Error calculating BMI:', error);
      toast.error('Error calculating BMI');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        url + '/api/ml/health-profile/update',
        { healthProfile: healthData },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Health profile updated successfully!');
        
        // Refresh health profile status in context (triggers "Suggest Me" button to appear)
        refreshHealthProfileStatus();
        
        // Redirect to home page immediately
        navigate('/');
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating health profile:', error);
      toast.error('Error updating health profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !healthData.age && !healthData.weight) {
    return (
      <div className="health-profile-container">
        <div className="health-profile-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your health profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="health-profile-container">
      <div className="health-profile-card">
        <h2>Update Medical Condition</h2>
        <p className="subtitle">Help us personalize your meal recommendations</p>

        <form onSubmit={handleSubmit} className="health-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={healthData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={healthData.weight}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.1"
                  placeholder="Enter weight in kg"
                />
              </div>

              <div className="form-group">
                <label>Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={healthData.height}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.1"
                  placeholder="Enter height in cm"
                />
              </div>
            </div>

            <button type="button" onClick={calculateBMI} className="bmi-btn">
              Calculate BMI
            </button>

            {bmiData && (
              <div className={`bmi-result ${bmiData.healthRisk}`}>
                <h4>BMI: {bmiData.bmi}</h4>
                <p className="bmi-category">{bmiData.category}</p>
                <p className="bmi-status">{bmiData.status}</p>
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div className="form-section">
            <h3>Activity Level</h3>
            <div className="form-group">
              <select
                name="activityLevel"
                value={healthData.activityLevel}
                onChange={handleChange}
                required
              >
                <option value="sedentary">Sedentary (Little or no exercise)</option>
                <option value="light">Light (Exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                <option value="active">Active (Exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (Intense exercise daily)</option>
              </select>
            </div>
          </div>

          {/* Health Conditions */}
          <div className="form-section">
            <h3>Health Conditions</h3>
            <p className="section-description">
              Select any conditions that apply to you. This helps us recommend suitable meals.
            </p>
            <div className="conditions-grid">
              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_diabetes"
                  checked={healthData.conditions.diabetes}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">Diabetes</span>
              </label>

              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_hypertension"
                  checked={healthData.conditions.hypertension}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">Hypertension (High Blood Pressure)</span>
              </label>

              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_heartDisease"
                  checked={healthData.conditions.heartDisease}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">Heart Disease</span>
              </label>

              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_highCholesterol"
                  checked={healthData.conditions.highCholesterol}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">High Cholesterol</span>
              </label>

              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_obesity"
                  checked={healthData.conditions.obesity}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">Obesity</span>
              </label>

              <label className="condition-checkbox">
                <input
                  type="checkbox"
                  name="condition_kidneyDisease"
                  checked={healthData.conditions.kidneyDisease}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="condition-label">Kidney Disease</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Health Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthProfile;

