"""
Generate Sample Dataset for Food Recommendation ML Model

This script creates a realistic dataset with 150+ food items including:
- Nutritional information (calories, protein, carbohydrates)
- Food categories
- Health suitability scores for various conditions

Usage:
    python generate_dataset.py
"""

import pandas as pd
import numpy as np
import os

# Set random seed for reproducibility
np.random.seed(42)

# ============================================
# GOOGLE COLAB SETUP
# ============================================

def setup_colab_environment():
    """
    Detect if running in Google Colab and mount Google Drive
    Returns: base_path for files
    """
    try:
        import google.colab
        IN_COLAB = True
        print("\n" + "="*70)
        print("🔗 GOOGLE COLAB DETECTED")
        print("="*70)
        
        # Mount Google Drive
        from google.colab import drive
        print("\n📁 Mounting Google Drive...")
        drive.mount('/content/drive')
        print("✓ Google Drive mounted successfully!")
        
        # Set base path to Google Drive
        base_path = '/content/drive/MyDrive/Olive-Foods-ML/'
        
        # Create directory if it doesn't exist
        os.makedirs(base_path, exist_ok=True)
        print(f"✓ Working directory: {base_path}")
        
        return base_path, IN_COLAB
        
    except ImportError:
        # Not in Colab, use local paths
        print("\n💻 Running locally")
        return '', False

# Initialize environment
BASE_PATH, IN_COLAB = setup_colab_environment()

# Food categories
categories = [
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

# Sample food names by category
food_items = {
    'Salads & Greens': [
        'Grilled Chicken Salad', 'Caesar Salad', 'Greek Salad', 'Kale Salad',
        'Spinach Salad', 'Garden Salad', 'Tuna Salad', 'Cobb Salad',
        'Asian Chicken Salad', 'Quinoa Salad', 'Caprese Salad', 'Nicoise Salad',
        'Waldorf Salad', 'Arugula Salad', 'Mediterranean Salad'
    ],
    'Low-Carb Meals': [
        'Zucchini Noodles with Pesto', 'Cauliflower Rice Bowl', 'Egg White Scramble',
        'Lettuce Wrap Tacos', 'Grilled Steak with Asparagus', 'Shirataki Noodle Stir Fry',
        'Cabbage Rolls', 'Stuffed Bell Peppers', 'Cloud Bread Sandwich',
        'Eggplant Lasagna', 'Spaghetti Squash', 'Keto Pizza', 'Cheese Crisps'
    ],
    'High-Protein': [
        'Grilled Chicken Breast', 'Protein Smoothie Bowl', 'Egg White Omelette',
        'Turkey Breast', 'Tuna Steak', 'Cottage Cheese Bowl', 'Greek Yogurt Parfait',
        'Chicken Burrito Bowl', 'Beef Stir Fry', 'Salmon Fillet',
        'Shrimp Skewers', 'Protein Pancakes', 'Chicken Wrap'
    ],
    'Heart-Healthy': [
        'Baked Salmon with Vegetables', 'Oatmeal with Berries', 'Avocado Toast',
        'Chia Seed Pudding', 'Walnut Crusted Fish', 'Olive Oil Pasta',
        'Almond Butter Toast', 'Mediterranean Bowl', 'Flaxseed Muffin',
        'Omega-3 Smoothie', 'Sardine Salad', 'Mackerel Grill'
    ],
    'Diabetic-Friendly': [
        'Cinnamon Oatmeal', 'Sugar-Free Berry Bowl', 'Veggie Omelette',
        'Grilled Fish with Greens', 'Lentil Soup', 'Chickpea Curry',
        'Roasted Vegetables', 'Baked Tofu', 'Steamed Broccoli with Chicken',
        'Cauliflower Mash', 'Green Bean Casserole', 'Mushroom Soup'
    ],
    'Whole Grains': [
        'Brown Rice Bowl', 'Quinoa Pilaf', 'Whole Wheat Pasta',
        'Barley Soup', 'Oatmeal Bowl', 'Bulgur Salad', 'Farro Bowl',
        'Wild Rice Mix', 'Whole Grain Bread', 'Buckwheat Pancakes',
        'Millet Porridge', 'Amaranth Bowl', 'Whole Wheat Pizza'
    ],
    'Lean Protein': [
        'Baked Chicken Breast', 'Grilled Turkey', 'Cod Fillet',
        'Tilapia Baked', 'Shrimp Cocktail', 'Egg Whites', 'Turkey Meatballs',
        'Chicken Skewers', 'Fish Tacos', 'Lean Beef Patty',
        'Venison Steak', 'Rabbit Stew', 'Bison Burger'
    ],
    'Vegetarian': [
        'Veggie Burger', 'Tofu Stir Fry', 'Lentil Dal', 'Chickpea Curry',
        'Black Bean Burrito', 'Falafel Wrap', 'Vegetable Curry',
        'Paneer Tikka', 'Tempeh Bowl', 'Seitan Stir Fry',
        'Edamame Bowl', 'Bean Chili', 'Veggie Pizza'
    ],
    'Soups': [
        'Vegetable Soup', 'Chicken Broth', 'Tomato Soup', 'Lentil Soup',
        'Minestrone', 'Miso Soup', 'Butternut Squash Soup', 'French Onion Soup',
        'Split Pea Soup', 'Mushroom Soup', 'Gazpacho', 'Pho', 'Ramen'
    ],
    'Grilled Items': [
        'Grilled Salmon', 'BBQ Chicken', 'Grilled Vegetables', 'Kebabs',
        'Grilled Shrimp', 'Steak', 'Pork Chops', 'Lamb Chops',
        'Grilled Portobello', 'Grilled Halloumi', 'Grilled Corn',
        'Mixed Grill', 'Tandoori Chicken', 'Grilled Eggplant', 'BBQ Tofu'
    ]
}

def calculate_health_scores(calories, protein, carbs, category):
    """
    Calculate realistic health suitability scores based on nutritional values
    Returns: dict of scores (1-10) for each health condition
    """
    scores = {}
    
    # Diabetes Score - favor low carbs, low calories, high protein
    if carbs < 20 and calories < 300:
        scores['diabetes_score'] = np.random.randint(8, 11)
    elif carbs > 50 or calories > 600:
        scores['diabetes_score'] = np.random.randint(1, 4)
    else:
        scores['diabetes_score'] = np.random.randint(4, 8)
    
    # Adjust for diabetic-friendly category
    if category == 'Diabetic-Friendly':
        scores['diabetes_score'] = min(10, scores['diabetes_score'] + 2)
    
    # Hypertension Score - favor low sodium (simulated by low calories/carbs)
    if calories < 300 and carbs < 40:
        scores['hypertension_score'] = np.random.randint(7, 11)
    elif calories > 600:
        scores['hypertension_score'] = np.random.randint(1, 4)
    else:
        scores['hypertension_score'] = np.random.randint(4, 8)
    
    # Adjust for soups and salads
    if category in ['Soups', 'Salads & Greens']:
        scores['hypertension_score'] = max(6, scores['hypertension_score'])
    
    # Heart Disease Score - favor lean protein, low fat
    if protein > 25 and calories < 400:
        scores['heart_disease_score'] = np.random.randint(7, 11)
    elif calories > 600:
        scores['heart_disease_score'] = np.random.randint(1, 5)
    else:
        scores['heart_disease_score'] = np.random.randint(4, 8)
    
    # Adjust for heart-healthy category
    if category in ['Heart-Healthy', 'Lean Protein']:
        scores['heart_disease_score'] = min(10, scores['heart_disease_score'] + 2)
    
    # Cholesterol Score - favor plant-based, lean proteins
    if category in ['Vegetarian', 'Salads & Greens', 'Whole Grains']:
        scores['cholesterol_score'] = np.random.randint(7, 11)
    elif protein > 30 and category in ['Lean Protein', 'Grilled Items']:
        scores['cholesterol_score'] = np.random.randint(6, 9)
    else:
        scores['cholesterol_score'] = np.random.randint(3, 7)
    
    # Obesity Score (weight loss) - favor low calories, high protein
    if calories < 250 and protein > 20:
        scores['obesity_score'] = np.random.randint(8, 11)
    elif calories > 500:
        scores['obesity_score'] = np.random.randint(1, 4)
    else:
        scores['obesity_score'] = np.random.randint(4, 8)
    
    # Adjust for low-carb meals
    if category == 'Low-Carb Meals':
        scores['obesity_score'] = min(10, scores['obesity_score'] + 2)
    
    # Kidney Disease Score - moderate protein, low sodium
    if protein < 25 and calories < 400:
        scores['kidney_score'] = np.random.randint(6, 10)
    elif protein > 40:
        scores['kidney_score'] = np.random.randint(1, 4)
    else:
        scores['kidney_score'] = np.random.randint(4, 7)
    
    return scores

def generate_nutritional_values(category):
    """Generate realistic nutritional values based on category"""
    
    nutrition_ranges = {
        'Salads & Greens': {'cal': (150, 350), 'pro': (10, 35), 'carb': (10, 30)},
        'Low-Carb Meals': {'cal': (200, 400), 'pro': (20, 40), 'carb': (5, 25)},
        'High-Protein': {'cal': (200, 450), 'pro': (30, 50), 'carb': (10, 40)},
        'Heart-Healthy': {'cal': (200, 400), 'pro': (15, 35), 'carb': (20, 45)},
        'Diabetic-Friendly': {'cal': (150, 350), 'pro': (15, 35), 'carb': (10, 30)},
        'Whole Grains': {'cal': (250, 450), 'pro': (8, 20), 'carb': (40, 65)},
        'Lean Protein': {'cal': (150, 300), 'pro': (25, 45), 'carb': (0, 15)},
        'Vegetarian': {'cal': (200, 450), 'pro': (10, 25), 'carb': (30, 60)},
        'Soups': {'cal': (100, 300), 'pro': (5, 20), 'carb': (15, 40)},
        'Grilled Items': {'cal': (250, 500), 'pro': (25, 45), 'carb': (10, 35)}
    }
    
    ranges = nutrition_ranges.get(category, {'cal': (200, 500), 'pro': (10, 30), 'carb': (20, 50)})
    
    return {
        'calories': np.random.randint(ranges['cal'][0], ranges['cal'][1]),
        'protein': np.random.randint(ranges['pro'][0], ranges['pro'][1]),
        'carbohydrates': np.random.randint(ranges['carb'][0], ranges['carb'][1])
    }

def generate_dataset():
    """Generate the complete dataset"""
    print("="*70)
    print("🍽️  GENERATING FOOD HEALTH DATASET")
    print("="*70)
    
    data = []
    food_id = 1
    
    for category in categories:
        foods = food_items.get(category, [])
        print(f"\n📦 Generating {category}: {len(foods)} items")
        
        for food_name in foods:
            # Generate nutritional values
            nutrition = generate_nutritional_values(category)
            
            # Calculate health scores
            scores = calculate_health_scores(
                nutrition['calories'],
                nutrition['protein'],
                nutrition['carbohydrates'],
                category
            )
            
            # Create data entry
            entry = {
                'food_id': food_id,
                'food_name': food_name,
                'category': category,
                'calories': nutrition['calories'],
                'protein': nutrition['protein'],
                'carbohydrates': nutrition['carbohydrates'],
                'diabetes_score': scores['diabetes_score'],
                'hypertension_score': scores['hypertension_score'],
                'heart_disease_score': scores['heart_disease_score'],
                'cholesterol_score': scores['cholesterol_score'],
                'obesity_score': scores['obesity_score'],
                'kidney_score': scores['kidney_score']
            }
            
            data.append(entry)
            food_id += 1
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Save to CSV with proper path
    output_file = 'food_health_dataset.csv'
    full_output_path = os.path.join(BASE_PATH, output_file) if BASE_PATH else output_file
    df.to_csv(full_output_path, index=False)
    
    print("\n" + "="*70)
    print("✅ DATASET GENERATED SUCCESSFULLY!")
    print("="*70)
    print(f"\n📊 Dataset Statistics:")
    print(f"  - Total food items: {len(df)}")
    print(f"  - Categories: {len(categories)}")
    print(f"  - File saved: {full_output_path}")
    print(f"  - File size: {df.memory_usage(deep=True).sum() / 1024:.2f} KB")
    
    if IN_COLAB:
        print(f"\n📁 Dataset saved to Google Drive!")
        print(f"  Location: MyDrive/Olive-Foods-ML/{output_file}")
    
    print(f"\n📋 Sample Data:")
    print(df.head(10))
    
    print(f"\n📈 Category Distribution:")
    print(df['category'].value_counts())
    
    print(f"\n📊 Nutritional Ranges:")
    print(df[['calories', 'protein', 'carbohydrates']].describe())
    
    print("\n" + "="*70)
    print("🎯 Next Steps:")
    print("  1. Review the generated dataset: food_health_dataset.csv")
    print("  2. Run training script: python train_model.py")
    print("  3. Check the generated model files in ../models/")
    print("="*70)
    
    return df

if __name__ == "__main__":
    generate_dataset()

