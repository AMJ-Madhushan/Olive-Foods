import axios from 'axios';
import foodModel from '../models/foodModel.js';
import userModel from '../models/userModel.js';

// ML Service URL - configure in .env
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

// Get food recommendations based on user's health profile
const getFoodRecommendations = async (req, res) => {
  try {
    const userId = req.body.userId;
    
    // Get user's health profile from MongoDB
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    if (!user.healthProfile || !user.hasCompletedHealthProfile) {
      return res.json({ 
        success: false, 
        message: 'Please complete your health profile first',
        needsHealthProfile: true
      });
    }
    
    // Log health profile data being used
    console.log('🎯 Generating recommendations for user:', userId);
    console.log('   - Health Profile Data:');
    console.log('     Age:', user.healthProfile.age);
    console.log('     BMI:', user.healthProfile.bmi);
    console.log('     Activity Level:', user.healthProfile.activityLevel);
    console.log('     Conditions:', Object.keys(user.healthProfile.conditions || {}).filter(k => user.healthProfile.conditions[k]));
    
    // Get all active food items
    const foods = await foodModel.find({ isActive: true });
    
    if (foods.length === 0) {
      return res.json({ 
        success: false, 
        message: 'No food items available' 
      });
    }
    
    console.log('   - Total foods available:', foods.length);
    
    // Prepare data for ML service using stored health profile
    const mlRequest = {
      healthProfile: {
        conditions: user.healthProfile.conditions || {}
      },
      foods: foods.map(food => ({
        _id: food._id,
        name: food.name,
        description: food.description,
        category: food.category,
        price: food.price,
        image: food.image,
        nutritionalInfo: food.nutritionalInfo
      })),
      topN: req.body.topN || 20
    };
    
    // Call ML service
    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/ml/recommend-foods`,
      mlRequest,
      { timeout: 10000 }
    );
    
    res.json({
      success: true,
      recommendations: mlResponse.data.recommendations,
      activeConditions: mlResponse.data.activeConditions,
      totalFoods: mlResponse.data.totalFoods,
      message: 'Recommendations generated successfully'
    });
    
  } catch (error) {
    console.error('Error getting recommendations:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.json({ 
        success: false, 
        message: 'ML service is not available. Please try again later.',
        error: 'ML_SERVICE_UNAVAILABLE'
      });
    }
    
    res.json({ 
      success: false, 
      message: 'Error getting recommendations: ' + error.message 
    });
  }
};

// Predict food suitability when admin adds new food
const predictFoodSuitability = async (req, res) => {
  try {
    const { nutritionalInfo, category } = req.body;
    
    if (!nutritionalInfo || !category) {
      return res.json({ 
        success: false, 
        message: 'Nutritional info and category are required' 
      });
    }
    
    // Call ML service
    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/ml/predict-food-suitability`,
      {
        nutritionalInfo,
        category
      },
      { timeout: 5000 }
    );
    
    res.json({
      success: true,
      suitabilityScores: mlResponse.data.suitabilityScores,
      recommendations: mlResponse.data.recommendations,
      message: 'Suitability prediction completed'
    });
    
  } catch (error) {
    console.error('Error predicting suitability:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.json({ 
        success: false, 
        message: 'ML service is not available',
        error: 'ML_SERVICE_UNAVAILABLE'
      });
    }
    
    res.json({ 
      success: false, 
      message: 'Error predicting suitability: ' + error.message 
    });
  }
};

// Update user's health profile
const updateHealthProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const healthProfile = req.body.healthProfile;
    
    if (!userId) {
      return res.json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    if (!healthProfile) {
      return res.json({ 
        success: false, 
        message: 'Health profile data is required' 
      });
    }
    
    // Validate required fields
    if (!healthProfile.age || !healthProfile.weight || !healthProfile.height) {
      return res.json({ 
        success: false, 
        message: 'Age, weight, and height are required' 
      });
    }
    
    // Calculate BMI before saving
    const heightInMeters = healthProfile.height / 100;
    const bmi = healthProfile.weight / (heightInMeters * heightInMeters);
    
    // Update user's health profile with calculated BMI
    const updatedUser = await userModel.findByIdAndUpdate(
      userId, 
      {
        healthProfile: {
          ...healthProfile,
          bmi: parseFloat(bmi.toFixed(2))
        },
        hasCompletedHealthProfile: true
      },
      { new: true } // Return updated document
    );
    
    if (!updatedUser) {
      return res.json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    console.log('✅ Health profile updated for user:', userId);
    console.log('   - Age:', healthProfile.age);
    console.log('   - BMI:', parseFloat(bmi.toFixed(2)));
    console.log('   - Conditions:', Object.keys(healthProfile.conditions || {}).filter(k => healthProfile.conditions[k]));
    
    res.json({
      success: true,
      message: 'Health profile updated successfully',
      healthProfile: updatedUser.healthProfile
    });
    
  } catch (error) {
    console.error('Error updating health profile:', error);
    res.json({ 
      success: false, 
      message: 'Error updating health profile: ' + error.message 
    });
  }
};

// Get user's health profile
const getHealthProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    
    if (!userId) {
      return res.json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    const user = await userModel.findById(userId).select('healthProfile hasCompletedHealthProfile');
    
    if (!user) {
      return res.json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    console.log('📋 Health profile fetched for user:', userId);
    console.log('   - Has profile:', !!user.healthProfile);
    console.log('   - Completed:', user.hasCompletedHealthProfile);
    
    res.json({
      success: true,
      healthProfile: user.healthProfile || null,
      hasCompletedHealthProfile: user.hasCompletedHealthProfile || false
    });
    
  } catch (error) {
    console.error('Error getting health profile:', error);
    res.json({ 
      success: false, 
      message: 'Error getting health profile: ' + error.message 
    });
  }
};

// Calculate BMI
const calculateBMI = async (req, res) => {
  try {
    const { height, weight } = req.body;
    
    if (!height || !weight) {
      return res.json({ 
        success: false, 
        message: 'Height and weight are required' 
      });
    }
    
    // Call ML service for BMI calculation
    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/ml/calculate-bmi`,
      { height, weight },
      { timeout: 5000 }
    );
    
    res.json({
      success: true,
      bmi: mlResponse.data.bmi,
      category: mlResponse.data.category,
      status: mlResponse.data.status,
      healthRisk: mlResponse.data.healthRisk
    });
    
  } catch (error) {
    console.error('Error calculating BMI:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      // Fallback: calculate BMI locally
      const { height, weight } = req.body;
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      
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
      
      return res.json({
        success: true,
        bmi: parseFloat(bmi.toFixed(2)),
        category,
        status,
        healthRisk
      });
    }
    
    res.json({ 
      success: false, 
      message: 'Error calculating BMI: ' + error.message 
    });
  }
};

// Check ML service status
const checkMLServiceStatus = async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`, { timeout: 3000 });
    res.json({
      success: true,
      mlServiceAvailable: true,
      modelsLoaded: response.data.models_loaded,
      message: response.data.message
    });
  } catch (error) {
    res.json({
      success: false,
      mlServiceAvailable: false,
      message: 'ML service is not available'
    });
  }
};

export { 
  getFoodRecommendations, 
  predictFoodSuitability, 
  updateHealthProfile,
  getHealthProfile,
  calculateBMI,
  checkMLServiceStatus
};

