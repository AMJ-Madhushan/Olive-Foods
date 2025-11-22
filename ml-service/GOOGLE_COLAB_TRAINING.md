# 🎓 Training Olive Foods ML Model with Google Colab

Complete guide for training the food recommendation model using Google Colab.

## 📋 Prerequisites

- Google account
- Google Colab access (free)
- Files from `ml-service/src/`

## 🚀 Step-by-Step Guide

### Step 1: Open Google Colab

1. Go to https://colab.research.google.com/
2. Sign in with your Google account
3. Create a new notebook: **File → New Notebook**

### Step 2: Upload Training Files

**Option A: Upload Manually**

Click the folder icon on the left sidebar, then upload:
- `generate_dataset.py`
- `train_model.py`

**Option B: Upload via Code**

```python
from google.colab import files
uploaded = files.upload()
# Browse and select generate_dataset.py and train_model.py
```

### Step 3: Run Training (Copy-Paste Each Cell)

#### Cell 1: Install Dependencies

```python
# Install required packages
!pip install scikit-learn pandas numpy matplotlib seaborn joblib

print("✅ All packages installed successfully!")
```

#### Cell 2: Verify Installation

```python
# Verify all imports work
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
import joblib

print("✅ All imports successful!")
```

#### Cell 3: Generate Dataset

```python
# Generate the food health dataset
!python generate_dataset.py

# Verify dataset was created
import os
if os.path.exists('food_health_dataset.csv'):
    print("✅ Dataset generated successfully!")
    df = pd.read_csv('food_health_dataset.csv')
    print(f"\n📊 Dataset Info:")
    print(f"  - Total items: {len(df)}")
    print(f"  - Categories: {df['category'].nunique()}")
    print(f"\n Sample data:")
    print(df.head())
else:
    print("❌ Dataset not found!")
```

#### Cell 4: Train Model

```python
# Train the ML model
!python train_model.py

print("\n✅ Training completed!")
```

#### Cell 5: Verify Model Files

```python
# Check if model files were created
import os

model_files = [
    'food_recommendation_model.pkl',
    'feature_scaler.pkl',
    'feature_columns.pkl'
]

print("📦 Checking model files:")
for file in model_files:
    if os.path.exists(file):
        size = os.path.getsize(file) / 1024  # KB
        print(f"  ✅ {file} ({size:.2f} KB)")
    else:
        print(f"  ❌ {file} not found!")
```

#### Cell 6: Test the Model

```python
# Load and test the trained model
import joblib
import numpy as np

# Load model and preprocessing objects
model = joblib.load('food_recommendation_model.pkl')
scaler = joblib.load('feature_scaler.pkl')
feature_cols = joblib.load('feature_columns.pkl')

print("✅ Models loaded successfully!")
print(f"\n📋 Feature columns: {feature_cols}")

# Test with sample food
test_food = {
    'name': 'Grilled Chicken Salad',
    'calories': 250,
    'protein': 35,
    'carbohydrates': 15,
    'category_encoded': 6  # Lean Protein
}

# Prepare features
features = np.array([[
    test_food['calories'],
    test_food['protein'],
    test_food['carbohydrates'],
    test_food['category_encoded']
]])

# Scale and predict
features_scaled = scaler.transform(features)
predictions = model.predict(features_scaled)[0]

# Display results
conditions = ['diabetes', 'hypertension', 'heart_disease', 
              'cholesterol', 'obesity', 'kidney_disease']

print(f"\n🍽️  Testing: {test_food['name']}")
print(f"  Nutritional Info: {test_food['calories']} cal, "
      f"{test_food['protein']}g protein, {test_food['carbohydrates']}g carbs")
print(f"\n  Suitability Predictions:")

for idx, condition in enumerate(conditions):
    status = "✅ Suitable" if predictions[idx] == 1 else "❌ Not Suitable"
    print(f"    {condition:20s}: {status}")
```

#### Cell 7: Download Model Files

```python
# Download trained model files
from google.colab import files

print("📥 Downloading model files...")

files.download('food_recommendation_model.pkl')
files.download('feature_scaler.pkl')
files.download('feature_columns.pkl')

# Optional: Download dataset and visualizations
files.download('food_health_dataset.csv')

print("\n✅ Download complete!")
print("\n📝 Next steps:")
print("  1. Move .pkl files to ml-service/models/ directory")
print("  2. Start the Flask ML service")
print("  3. Test the API endpoints")
```

### Step 4: Download and Install

1. **Download Files**: The files will be downloaded to your computer
2. **Move to Project**: 
   ```bash
   # On your local machine
   mv ~/Downloads/*.pkl /path/to/Olive-Foods/ml-service/models/
   ```
3. **Start ML Service**:
   ```bash
   cd ml-service
   python app.py
   ```

## 🎯 Alternative: All-in-One Cell

If you prefer, you can run everything in a single cell:

```python
# ========================================
# OLIVE FOODS ML MODEL - COMPLETE TRAINING
# ========================================

# 1. Install dependencies
!pip install -q scikit-learn pandas numpy matplotlib seaborn joblib

# 2. Upload files
print("📂 Please upload generate_dataset.py and train_model.py")
from google.colab import files
uploaded = files.upload()

# 3. Generate dataset
print("\n📊 Generating dataset...")
!python generate_dataset.py

# 4. Train model
print("\n🤖 Training model...")
!python train_model.py

# 5. Verify files
import os
model_files = ['food_recommendation_model.pkl', 'feature_scaler.pkl', 'feature_columns.pkl']
print("\n✅ Verification:")
for file in model_files:
    print(f"  {'✓' if os.path.exists(file) else '✗'} {file}")

# 6. Download files
print("\n📥 Downloading model files...")
for file in model_files:
    if os.path.exists(file):
        files.download(file)

files.download('food_health_dataset.csv')

print("\n🎉 Complete! Models are ready to use.")
```

## 📊 Expected Training Time

- **Dataset Generation**: ~30 seconds
- **Model Training**: 2-5 minutes
- **Total Time**: ~6 minutes

## 🔍 What You'll See During Training

1. **Dataset Generation**:
   ```
   =====================================================
   🍽️  GENERATING FOOD HEALTH DATASET
   =====================================================
   
   📦 Generating Salads & Greens: 15 items
   📦 Generating Low-Carb Meals: 13 items
   ...
   ✅ DATASET GENERATED SUCCESSFULLY!
   ```

2. **Model Training**:
   ```
   =====================================================
   📊 LOADING DATASET
   =====================================================
   ✓ Dataset loaded successfully!
   
   =====================================================
   🤖 MODEL TRAINING
   =====================================================
   🔄 Training Random Forest...
   🔄 Training Gradient Boosting...
   🏆 Best Model: Random Forest
   ```

3. **Model Evaluation**:
   ```
   =====================================================
   📊 MODEL EVALUATION
   =====================================================
   🎯 Overall Accuracy: 0.8542
   
   Accuracy per Health Condition:
     diabetes_suitable           : 0.8500
     hypertension_suitable       : 0.8750
     ...
   ```

## ⚠️ Common Issues & Solutions

### Issue 1: Upload Failed
**Solution**: Try manual upload using folder icon on left sidebar

### Issue 2: Out of Memory
**Solution**: 
```python
# Use fewer estimators
# Edit train_model.py before running:
# Change n_estimators=100 to n_estimators=50
```

### Issue 3: Import Errors
**Solution**: 
```python
# Reinstall packages
!pip install --upgrade scikit-learn pandas numpy
```

### Issue 4: Files Not Downloading
**Solution**:
```python
# Download one at a time
from google.colab import files
files.download('food_recommendation_model.pkl')
# Wait for download to complete, then download next file
```

## 📈 Understanding Model Performance

Good performance indicators:
- ✅ Overall accuracy > 80%
- ✅ Per-condition accuracy > 75%
- ✅ Model file size: 1-5 MB

If accuracy is low:
1. Increase dataset size
2. Add more features
3. Try different hyperparameters

## 🧪 Testing Predictions

After training, test with different food items:

```python
# Test cases
test_foods = [
    {'name': 'Grilled Chicken', 'cal': 165, 'pro': 31, 'carb': 0, 'cat': 6},
    {'name': 'Fried Burger', 'cal': 680, 'pro': 28, 'carb': 52, 'cat': 2},
    {'name': 'Vegetable Soup', 'cal': 120, 'pro': 5, 'carb': 18, 'cat': 8}
]

for food in test_foods:
    features = np.array([[food['cal'], food['pro'], food['carb'], food['cat']]])
    features_scaled = scaler.transform(features)
    pred = model.predict(features_scaled)[0]
    
    print(f"\n{food['name']}:")
    print(f"  Diabetes: {'✓' if pred[0] else '✗'}")
    print(f"  Hypertension: {'✓' if pred[1] else '✗'}")
    print(f"  Heart Disease: {'✓' if pred[2] else '✗'}")
```

## 💾 Save Your Work

Save the Colab notebook for future retraining:
1. **File → Save a copy in Drive**
2. Name it: "Olive_Foods_ML_Training"
3. You can rerun anytime with updated data

## 🔄 Retraining the Model

When you collect real user data:

1. Update dataset with real nutritional values
2. Run the training cells again
3. Download new model files
4. Replace old models in your project

## 📚 Additional Resources

- [Google Colab Documentation](https://colab.research.google.com/notebooks/intro.ipynb)
- [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [Pandas Documentation](https://pandas.pydata.org/docs/)

## ✅ Checklist

- [ ] Opened Google Colab
- [ ] Uploaded training files
- [ ] Installed dependencies
- [ ] Generated dataset
- [ ] Trained model
- [ ] Downloaded .pkl files
- [ ] Moved files to ml-service/models/
- [ ] Started ML service
- [ ] Tested predictions

## 🎉 Success!

Once you see "Training completed successfully", you're ready to:
1. Download the model files
2. Install them in your local project
3. Start making predictions!

---

**Happy Training! 🚀**

For questions or issues, refer to the main DEPLOYMENT_GUIDE.md

