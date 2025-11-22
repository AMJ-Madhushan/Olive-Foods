from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import sys

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
MODEL_DIR = 'models'
model = None
scaler = None
feature_cols = None

def load_models():
    """Load ML models on startup"""
    global model, scaler, feature_cols
    
    try:
        model_path = os.path.join(MODEL_DIR, 'food_recommendation_model.pkl')
        scaler_path = os.path.join(MODEL_DIR, 'feature_scaler.pkl')
        features_path = os.path.join(MODEL_DIR, 'feature_columns.pkl')
        
        if os.path.exists(model_path):
            model = joblib.load(model_path)
            scaler = joblib.load(scaler_path)
            feature_cols = joblib.load(features_path)
            print("✓ ML Models loaded successfully!")
        else:
            print("⚠ Warning: Model files not found. Please train the model first.")
            print(f"Expected path: {model_path}")
    except Exception as e:
        print(f"✗ Error loading models: {str(e)}")

# Load models on startup
load_models()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    models_loaded = model is not None and scaler is not None
    return jsonify({
        'status': 'healthy',
        'message': 'ML Service is running',
        'models_loaded': models_loaded
    }), 200

@app.route('/api/ml/recommend-foods', methods=['POST'])
def recommend_foods():
    """
    Recommend foods based on user's health profile
    
    Request body:
    {
        "healthProfile": {
            "conditions": {
                "diabetes": true,
                "hypertension": false,
                "heartDisease": false,
                "highCholesterol": false,
                "obesity": false,
                "kidneyDisease": false
            }
        },
        "foods": [
            {
                "_id": "123",
                "name": "Grilled Chicken",
                "nutritionalInfo": {
                    "calories": 250,
                    "protein": 35,
                    "carbohydrates": 15
                },
                "category": "Lean Protein",
                "price": 12.99,
                "image": "chicken.jpg"
            }
        ],
        "topN": 10
    }
    """
    try:
        if model is None or scaler is None:
            return jsonify({
                'error': 'Models not loaded. Please train the model first.'
            }), 500
        
        data = request.json
        health_profile = data.get('healthProfile', {})
        conditions = health_profile.get('conditions', {})
        foods = data.get('foods', [])
        top_n = data.get('topN', 10)
        
        # Get active conditions
        active_conditions = [
            cond for cond, has_it in conditions.items() if has_it
        ]
        
        # Category encoding map
        category_map = {
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
        
        recommendations = []
        
        for food in foods:
            nutritional_info = food.get('nutritionalInfo', {})
            
            # Create feature array
            features = {
                'calories': nutritional_info.get('calories', 0),
                'protein': nutritional_info.get('protein', 0),
                'carbohydrates': nutritional_info.get('carbohydrates', 0),
                'category_encoded': category_map.get(food.get('category', 'Grilled Items'), 9)
            }
            
            # Ensure we have all required features
            feature_array = np.array([[features.get(col, 0) for col in feature_cols]])
            
            # Scale and predict
            features_scaled = scaler.transform(feature_array)
            predictions = model.predict(features_scaled)[0]
            
            # Calculate suitability score
            condition_map = {
                'diabetes': 0,
                'hypertension': 1,
                'heartDisease': 2,
                'highCholesterol': 3,
                'obesity': 4,
                'kidneyDisease': 5
            }
            
            if not active_conditions:
                suitability_score = 100
            else:
                suitable_count = sum(
                    predictions[condition_map[cond]] for cond in active_conditions
                    if cond in condition_map
                )
                suitability_score = (suitable_count / len(active_conditions)) * 100
            
            recommendations.append({
                'foodId': food.get('_id'),
                'name': food.get('name'),
                'category': food.get('category'),
                'suitabilityScore': round(suitability_score, 2),
                'nutritionalInfo': nutritional_info,
                'image': food.get('image'),
                'price': food.get('price'),
                'description': food.get('description', '')
            })
        
        # Sort by suitability score
        recommendations.sort(key=lambda x: x['suitabilityScore'], reverse=True)
        
        return jsonify({
            'success': True,
            'recommendations': recommendations[:top_n],
            'activeConditions': active_conditions,
            'totalFoods': len(foods)
        }), 200
        
    except Exception as e:
        print(f"Error in recommend_foods: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/ml/predict-food-suitability', methods=['POST'])
def predict_food_suitability():
    """
    Predict if a food item is suitable for different health conditions
    
    Request body:
    {
        "nutritionalInfo": {
            "calories": 250,
            "protein": 35,
            "carbohydrates": 15
        },
        "category": "Lean Protein"
    }
    """
    try:
        if model is None or scaler is None:
            return jsonify({
                'error': 'Models not loaded. Please train the model first.'
            }), 500
        
        data = request.json
        nutritional_info = data.get('nutritionalInfo', {})
        
        # Category encoding map
        category_map = {
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
        
        features = {
            'calories': nutritional_info.get('calories', 0),
            'protein': nutritional_info.get('protein', 0),
            'carbohydrates': nutritional_info.get('carbohydrates', 0),
            'category_encoded': category_map.get(data.get('category', 'Grilled Items'), 9)
        }
        
        # Create feature array
        feature_array = np.array([[features.get(col, 0) for col in feature_cols]])
        
        # Scale and predict
        features_scaled = scaler.transform(feature_array)
        predictions = model.predict(features_scaled)[0]
        
        # Create response with scores (0-10 scale)
        result = {
            'success': True,
            'suitabilityScores': {
                'diabetes': int(predictions[0]) * 10,
                'hypertension': int(predictions[1]) * 10,
                'heartDisease': int(predictions[2]) * 10,
                'highCholesterol': int(predictions[3]) * 10,
                'obesity': int(predictions[4]) * 10,
                'kidneyDisease': int(predictions[5]) * 10
            },
            'recommendations': []
        }
        
        # Add recommendations based on scores
        if int(predictions[0]) == 1:
            result['recommendations'].append('Suitable for diabetic patients')
        if int(predictions[1]) == 1:
            result['recommendations'].append('Suitable for hypertension patients')
        if int(predictions[2]) == 1:
            result['recommendations'].append('Heart-healthy option')
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error in predict_food_suitability: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/ml/calculate-bmi', methods=['POST'])
def calculate_bmi():
    """
    Calculate BMI and provide health status
    
    Request body:
    {
        "height": 170,  // in cm
        "weight": 70    // in kg
    }
    """
    try:
        data = request.json
        height = data.get('height', 0)  # cm
        weight = data.get('weight', 0)  # kg
        
        if height <= 0 or weight <= 0:
            return jsonify({
                'success': False,
                'error': 'Invalid height or weight'
            }), 400
        
        height_m = height / 100
        bmi = weight / (height_m ** 2)
        
        # Determine BMI category
        if bmi < 18.5:
            category = 'Underweight'
            status = 'You are underweight. Consider eating more nutritious foods.'
            health_risk = 'low'
        elif 18.5 <= bmi < 25:
            category = 'Normal'
            status = 'You have a healthy weight. Maintain your current lifestyle!'
            health_risk = 'minimal'
        elif 25 <= bmi < 30:
            category = 'Overweight'
            status = 'You are overweight. Consider a balanced diet and exercise.'
            health_risk = 'medium'
        else:
            category = 'Obese'
            status = 'You are obese. Please consult a healthcare professional.'
            health_risk = 'high'
        
        return jsonify({
            'success': True,
            'bmi': round(bmi, 2),
            'category': category,
            'status': status,
            'healthRisk': health_risk
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('DEBUG', 'True') == 'True'
    
    print("="*50)
    print("🍽️  OLIVE FOODS ML SERVICE")
    print("="*50)
    print(f"Server running on: http://localhost:{port}")
    print(f"Debug mode: {debug}")
    print("="*50)
    
    app.run(host='0.0.0.0', port=port, debug=debug)

