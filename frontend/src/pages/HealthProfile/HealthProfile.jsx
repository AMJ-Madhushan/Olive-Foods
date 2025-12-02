import React, { useState, useContext, useEffect } from 'react';
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
      <div className="min-h-screen py-[120px] px-5 pb-[60px] bg-gradient-to-br from-light to-white">
        <div className="max-w-[900px] mx-auto bg-white rounded-[20px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-fadeInUp">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
            <div className="w-[50px] h-[50px] border-[5px] border-[#f3f3f3] border-t-primary rounded-full animate-spin"></div>
            <p className="text-primary text-lg font-semibold">Loading your health profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[120px] px-5 pb-[60px] bg-gradient-to-br from-light to-white max-[768px]:py-[100px] max-[768px]:px-4 max-[768px]:pb-10">
      <div className="max-w-[900px] mx-auto bg-white rounded-[20px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-fadeInUp max-[768px]:p-6 max-[768px]:px-6">
        <h2 className="text-primary text-[2.2rem] font-bold mb-2.5 text-center max-[768px]:text-[1.8rem]">Update Medical Condition</h2>
        <p className="text-center text-[#666] text-base mb-[30px] max-[768px]:text-sm">Help us personalize your meal recommendations</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
          {/* Basic Information */}
          <div className="bg-light-alt p-6 rounded-[15px] border-2 border-[#E8F5E0]">
            <h3 className="text-primary text-xl font-semibold mb-4 flex items-center gap-2.5 max-[768px]:text-lg">Basic Information</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-4 max-[768px]:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="text-primary font-semibold text-[0.95rem]">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={healthData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  className="py-3 px-4 border-2 border-gray-300 rounded-[10px] text-base transition-all duration-300 ease-in-out bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary font-semibold text-[0.95rem]">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={healthData.weight}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.1"
                  placeholder="Enter weight in kg"
                  className="py-3 px-4 border-2 border-gray-300 rounded-[10px] text-base transition-all duration-300 ease-in-out bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary font-semibold text-[0.95rem]">Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={healthData.height}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.1"
                  placeholder="Enter height in cm"
                  className="py-3 px-4 border-2 border-gray-300 rounded-[10px] text-base transition-all duration-300 ease-in-out bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)]"
                />
              </div>
            </div>

            <button type="button" onClick={calculateBMI} className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-3 px-6 rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out mt-2.5 self-start hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(78,140,1,0.3)]">
              Calculate BMI
            </button>

            {bmiData && (
              <div className={`mt-5 p-5 rounded-xl bg-white border-l-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] animate-slideIn ${bmiData.healthRisk === 'high' || bmiData.healthRisk === 'medium' ? 'border-l-[#ff9800]' : 'border-l-[#4CAF50]'}`}>
                <h4 className="text-primary text-2xl mb-2">{bmiData.bmi}</h4>
                <p className="font-semibold text-lg mb-1 text-[#333]">{bmiData.category}</p>
                <p className="text-[#666] text-[0.95rem]">{bmiData.status}</p>
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div className="bg-light-alt p-6 rounded-[15px] border-2 border-[#E8F5E0]">
            <h3 className="text-primary text-xl font-semibold mb-4 flex items-center gap-2.5 max-[768px]:text-lg">Activity Level</h3>
            <div className="flex flex-col gap-2">
              <select
                name="activityLevel"
                value={healthData.activityLevel}
                onChange={handleChange}
                required
                className="py-3 px-4 border-2 border-gray-300 rounded-[10px] text-base transition-all duration-300 ease-in-out bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)]"
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
          <div className="bg-light-alt p-6 rounded-[15px] border-2 border-[#E8F5E0]">
            <h3 className="text-primary text-xl font-semibold mb-4 flex items-center gap-2.5 max-[768px]:text-lg">Health Conditions</h3>
            <p className="text-[#666] text-[0.95rem] mb-5 italic">
              Select any conditions that apply to you. This helps us recommend suitable meals.
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 max-[768px]:grid-cols-1">
              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_diabetes"
                  checked={healthData.conditions.diabetes}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.diabetes ? 'text-primary font-semibold' : ''}`}>Diabetes</span>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_hypertension"
                  checked={healthData.conditions.hypertension}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.hypertension ? 'text-primary font-semibold' : ''}`}>Hypertension (High Blood Pressure)</span>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_heartDisease"
                  checked={healthData.conditions.heartDisease}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.heartDisease ? 'text-primary font-semibold' : ''}`}>Heart Disease</span>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_highCholesterol"
                  checked={healthData.conditions.highCholesterol}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.highCholesterol ? 'text-primary font-semibold' : ''}`}>High Cholesterol</span>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_obesity"
                  checked={healthData.conditions.obesity}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.obesity ? 'text-primary font-semibold' : ''}`}>Obesity</span>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out relative hover:border-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.1)]">
                <input
                  type="checkbox"
                  name="condition_kidneyDisease"
                  checked={healthData.conditions.kidneyDisease}
                  onChange={handleChange}
                  className="w-[22px] h-[22px] cursor-pointer accent-primary"
                />
                <span className={`text-[#333] font-medium text-[0.95rem] select-none ${healthData.conditions.kidneyDisease ? 'text-primary font-semibold' : ''}`}>Kidney Disease</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-2.5 max-[768px]:flex-col">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="py-3.5 px-8 rounded-[10px] text-[1.05rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out border-none bg-[#f5f5f5] text-[#666] border-2 border-gray-300 hover:bg-gray-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed max-[768px]:w-full"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3.5 px-8 rounded-[10px] text-[1.05rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out border-none bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_4px_15px_rgba(78,140,1,0.3)] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)] disabled:opacity-60 disabled:cursor-not-allowed max-[768px]:w-full"
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

