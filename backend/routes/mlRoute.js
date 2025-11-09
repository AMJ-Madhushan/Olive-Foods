import express from 'express';
import { 
  getFoodRecommendations, 
  predictFoodSuitability,
  updateHealthProfile,
  getHealthProfile,
  calculateBMI,
  checkMLServiceStatus
} from '../controllers/mlController.js';
import authMiddleware from '../middleware/auth.js';

const mlRouter = express.Router();

// Get personalized food recommendations
mlRouter.post('/recommend', authMiddleware, getFoodRecommendations);

// Predict food suitability (for admin when adding food)
mlRouter.post('/predict-suitability', authMiddleware, predictFoodSuitability);

// Update user's health profile
mlRouter.post('/health-profile/update', authMiddleware, updateHealthProfile);

// Get user's health profile
mlRouter.post('/health-profile/get', authMiddleware, getHealthProfile);

// Calculate BMI
mlRouter.post('/calculate-bmi', authMiddleware, calculateBMI);

// Check ML service status
mlRouter.get('/status', checkMLServiceStatus);

export default mlRouter;

