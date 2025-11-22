import os

class Config:
    """Configuration class for ML Service"""
    
    # Flask settings
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'
    PORT = int(os.environ.get('PORT', 5001))
    
    # Model paths
    MODEL_DIR = 'models'
    MODEL_FILE = 'food_recommendation_model.pkl'
    SCALER_FILE = 'feature_scaler.pkl'
    FEATURES_FILE = 'feature_columns.pkl'
    
    # API settings
    MAX_RECOMMENDATIONS = 50
    DEFAULT_RECOMMENDATIONS = 10
    
    # Health conditions mapping
    HEALTH_CONDITIONS = [
        'diabetes',
        'hypertension',
        'heartDisease',
        'highCholesterol',
        'obesity',
        'kidneyDisease'
    ]
    
    # Food categories
    FOOD_CATEGORIES = [
        'Salads & Greens',
        'Low-Carb Meals',
        'High-Protein',
        'Heart-Healthy',
        'Diabetic-Friendly',
        'Whole Grains',
        'Lean Protein',
        'Vegetarian',
        'Soups',
        'Grilled Items'
    ]
    
    # Category encoding map
    CATEGORY_ENCODING = {
        'Salads & Greens': 0,
        'Low-Carb Meals': 1,
        'High-Protein': 2,
        'Heart-Healthy': 3,
        'Diabetic-Friendly': 4,
        'Whole Grains': 5,
        'Lean Protein': 6,
        'Vegetarian': 7,
        'Soups': 8,
        'Grilled Items': 9
    }
    
    # Feature columns used in ML model
    FEATURE_COLUMNS = [
        'calories',
        'protein',
        'carbohydrates',
        'category_encoded'
    ]
    
    # BMI categories
    BMI_CATEGORIES = {
        'underweight': (0, 18.5),
        'normal': (18.5, 25),
        'overweight': (25, 30),
        'obese': (30, float('inf'))
    }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

