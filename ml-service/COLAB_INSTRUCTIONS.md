# 🎓 Google Colab Training - Quick Guide

Your training scripts now **automatically detect and mount Google Drive**!

## 📋 Steps to Train in Google Colab

### 1. Open Google Colab
Go to: https://colab.research.google.com/

### 2. Upload Training Files

Click the folder icon on the left, then upload these 2 files:
- `ml-service/src/generate_dataset.py`
- `ml-service/src/train_model.py`

### 3. Run Training (Copy-Paste)

#### Cell 1: Install Dependencies
```python
!pip install scikit-learn pandas numpy matplotlib seaborn joblib
```

#### Cell 2: Generate Dataset
```python
!python generate_dataset.py
```

**What happens:**
- ✅ Automatically detects Google Colab
- ✅ Mounts your Google Drive (you'll need to authorize)
- ✅ Creates folder: `MyDrive/Olive-Foods-ML/`
- ✅ Generates 150+ food items
- ✅ Saves `food_health_dataset.csv` to Google Drive

#### Cell 3: Train Model
```python
!python train_model.py
```

**What happens:**
- ✅ Loads dataset from Google Drive
- ✅ Trains ML model (2-5 minutes)
- ✅ Saves 3 `.pkl` files to Google Drive:
  - `food_recommendation_model.pkl`
  - `feature_scaler.pkl`
  - `feature_columns.pkl`
- ✅ Creates visualization images

### 4. Download Models

**Option A: From Google Drive (Recommended)**

1. Open Google Drive in browser
2. Navigate to: `MyDrive/Olive-Foods-ML/`
3. Download the 3 `.pkl` files
4. Place them in your local: `ml-service/models/`

**Option B: Download Directly from Colab**

```python
from google.colab import files

files.download('/content/drive/MyDrive/Olive-Foods-ML/food_recommendation_model.pkl')
files.download('/content/drive/MyDrive/Olive-Foods-ML/feature_scaler.pkl')
files.download('/content/drive/MyDrive/Olive-Foods-ML/feature_columns.pkl')
```

## 🎯 What's Different?

### Old Way (Manual):
- ❌ Manual Google Drive mounting code
- ❌ Manual path configuration
- ❌ Complex setup

### New Way (Automatic):
- ✅ Scripts auto-detect Colab
- ✅ Auto-mount Google Drive
- ✅ Auto-save to Google Drive
- ✅ Works locally without changes

## 📁 File Structure in Google Drive

After training, your Google Drive will have:

```
MyDrive/
└── Olive-Foods-ML/
    ├── food_health_dataset.csv
    ├── food_recommendation_model.pkl
    ├── feature_scaler.pkl
    ├── feature_columns.pkl
    ├── health_scores_distribution.png
    ├── correlation_matrix.png
    ├── category_distribution.png
    └── feature_importance.png
```

## 🔄 Retraining

To retrain with new data:

1. Upload updated `food_health_dataset.csv` to Google Drive folder
2. Run `!python train_model.py` again
3. New models will overwrite old ones

## ✅ Expected Output

### When running `generate_dataset.py`:
```
======================================================================
🔗 GOOGLE COLAB DETECTED
======================================================================

📁 Mounting Google Drive...
Mounted at /content/drive
✓ Google Drive mounted successfully!
✓ Working directory: /content/drive/MyDrive/Olive-Foods-ML/

======================================================================
🍽️  GENERATING FOOD HEALTH DATASET
======================================================================

📦 Generating Salads & Greens: 15 items
📦 Generating Low-Carb Meals: 13 items
...
✅ DATASET GENERATED SUCCESSFULLY!
📁 Dataset saved to Google Drive!
```

### When running `train_model.py`:
```
======================================================================
🔗 GOOGLE COLAB DETECTED
======================================================================

📁 Mounting Google Drive...
✓ Google Drive mounted successfully!

======================================================================
🍽️  OLIVE FOODS - ML MODEL TRAINING
======================================================================

📊 LOADING DATASET
✓ Dataset loaded successfully!

🤖 MODEL TRAINING
🔄 Training Random Forest...
✓ Random Forest accuracy: 0.8542

💾 SAVING MODELS
✓ Models saved successfully!
📁 Models saved to Google Drive!
  Location: MyDrive/Olive-Foods-ML/
```

## 🐛 Troubleshooting

### "No module named 'google.colab'"
✅ This is normal when running locally - scripts will work fine

### "File not found"
- Make sure you ran `generate_dataset.py` first
- Check Google Drive for the CSV file

### "Permission denied"
- Authorize Google Drive access when prompted
- Try remounting: `drive.mount('/content/drive', force_remount=True)`

### Models not in local project
- Download from Google Drive
- Place in `ml-service/models/` directory

## 💡 Tips

1. **Keep Colab Active**: Training takes 2-5 minutes - keep browser tab open
2. **Check Google Drive**: Files persist even if you close Colab
3. **Reuse Data**: Dataset stays in Drive - no need to regenerate
4. **Download Models**: Remember to download `.pkl` files to your local project

## 🚀 After Training

1. Download the 3 `.pkl` files from Google Drive
2. Place them in `ml-service/models/` on your computer
3. Start ML service: `python ml-service/app.py`
4. Test: `curl http://localhost:5001/health`

---

**That's it!** Your scripts are now Colab-ready with automatic Google Drive integration! 🎉

