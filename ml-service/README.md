# 🍽️ Olive Foods ML Service

Machine Learning service for health-based food recommendations in the Olive Foods system.

## 📁 Directory Structure

```
ml-service/
├── app.py                 # Flask API server
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── models/               # Trained ML models (generated after training)
│   ├── food_recommendation_model.pkl
│   ├── feature_scaler.pkl
│   └── feature_columns.pkl
└── src/                  # Training scripts and dataset
    ├── generate_dataset.py
    ├── train_model.py
    └── food_health_dataset.csv (generated)
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd ml-service
pip install -r requirements.txt
```

### Step 2: Generate Dataset

```bash
cd src
python generate_dataset.py
```

This will create `food_health_dataset.csv` with 150+ food items.

### Step 3: Train the Model

```bash
python train_model.py
```

This will:
- Load and analyze the dataset
- Train multiple ML models
- Evaluate model performance
- Save the best model to `../models/`
- Generate visualizations

### Step 4: Start the ML Service

```bash
cd ..
python app.py
```

The service will start on `http://localhost:5001`

## 📊 Training with Google Colab

### Upload Files to Colab

1. Open Google Colab
2. Upload these files:
   - `src/generate_dataset.py`
   - `src/train_model.py`

### Run in Colab

```python
# Cell 1: Install dependencies
!pip install scikit-learn pandas numpy matplotlib seaborn joblib

# Cell 2: Generate dataset
!python generate_dataset.py

# Cell 3: Train model
!python train_model.py

# Cell 4: Download trained models
from google.colab import files

files.download('food_recommendation_model.pkl')
files.download('feature_scaler.pkl')
files.download('feature_columns.pkl')
```

### After Training

1. Download the `.pkl` files from Colab
2. Place them in `ml-service/models/` directory
3. Start the Flask service

## 🔌 API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "message": "ML Service is running",
  "models_loaded": true
}
```

### Recommend Foods
```
POST /api/ml/recommend-foods
```

Request:
```json
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
  "foods": [...],
  "topN": 10
}
```

### Predict Food Suitability
```
POST /api/ml/predict-food-suitability
```

Request:
```json
{
  "nutritionalInfo": {
    "calories": 250,
    "protein": 35,
    "carbohydrates": 15
  },
  "category": "Lean Protein"
}
```

### Calculate BMI
```
POST /api/ml/calculate-bmi
```

Request:
```json
{
  "height": 170,
  "weight": 70
}
```

## 🧪 Testing the API

```bash
# Test health endpoint
curl http://localhost:5001/health

# Test BMI calculation
curl -X POST http://localhost:5001/api/ml/calculate-bmi \
  -H "Content-Type: application/json" \
  -d '{"height": 170, "weight": 70}'
```

## 🔧 Configuration

Edit `config.py` to customize:
- Port number
- Model paths
- Feature columns
- Health conditions

## 📝 Model Features

The ML model uses these features:
- **calories**: Total calories
- **protein**: Protein content (g)
- **carbohydrates**: Carbohydrate content (g)
- **category_encoded**: Food category (encoded)

## 🎯 Health Conditions

The model predicts suitability for:
- Diabetes
- Hypertension
- Heart Disease
- High Cholesterol
- Obesity
- Kidney Disease

## 🐛 Troubleshooting

### Models not loading
- Ensure `.pkl` files exist in `models/` directory
- Run training script to generate models
- Check file permissions

### Import errors
- Verify all dependencies are installed
- Use Python 3.8 or higher
- Try: `pip install -r requirements.txt --upgrade`

### Port already in use
- Change port in `config.py`
- Or set environment variable: `PORT=5002 python app.py`

## 📚 Additional Resources

- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Pandas Documentation](https://pandas.pydata.org/)

## 👥 Support

For issues or questions, contact the Olive Foods development team.

