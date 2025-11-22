# 🍽️ Olive Foods ML-Powered System - Complete Deployment Guide

This guide will help you set up and deploy the complete Olive Foods system with ML-based food recommendations.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Database Setup](#database-setup)
4. [Backend Setup](#backend-setup)
5. [ML Service Setup](#ml-service-setup)
6. [Training the Model](#training-the-model)
7. [Admin Panel Setup](#admin-panel-setup)
8. [Frontend Setup](#frontend-setup)
9. [Running the Complete System](#running-the-complete-system)
10. [Testing](#testing)
11. [Deployment to Production](#deployment-to-production)
12. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Software Requirements

- **Node.js**: v16 or higher
- **Python**: v3.8 or higher
- **MongoDB**: v4.4 or higher (local or MongoDB Atlas)
- **npm**: v8 or higher
- **pip**: Latest version
- **Git**: Latest version

### Check Installation

```bash
node --version
python --version
npm --version
pip --version
mongod --version
```

---

## 2. Project Structure

```
OLIVE-FOODS/
├── admin/                    # Admin panel (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Add/         # Food item creation with nutritional data
│   │   │   └── List/        # Food items list
│   │   └── ...
│   └── package.json
│
├── backend/                  # Node.js + Express API
│   ├── controllers/
│   │   ├── foodController.js
│   │   ├── mlController.js  # NEW: ML integration
│   │   └── ...
│   ├── models/
│   │   ├── foodModel.js     # UPDATED: Nutritional info
│   │   ├── userModel.js     # UPDATED: Health profile
│   │   └── ...
│   ├── routes/
│   │   ├── mlRoute.js       # NEW: ML routes
│   │   └── ...
│   ├── .env
│   └── server.js            # UPDATED: ML routes added
│
├── frontend/                 # User-facing app (React + Vite)
│   ├── src/
│   └── package.json
│
└── ml-service/              # NEW: Python ML Service
    ├── app.py               # Flask API
    ├── config.py            # Configuration
    ├── requirements.txt     # Python dependencies
    ├── models/              # Trained ML models (.pkl files)
    └── src/                 # Training scripts
        ├── train_model.py
        ├── generate_dataset.py
        └── food_health_dataset.csv
```

---

## 3. Database Setup

### Option A: Local MongoDB

1. **Install MongoDB**
   ```bash
   # Windows: Download from mongodb.com
   # Mac: brew install mongodb-community
   # Linux: sudo apt-get install mongodb
   ```

2. **Start MongoDB**
   ```bash
   mongod --dbpath /path/to/data/directory
   ```

3. **Create Database**
   ```bash
   mongo
   > use olive_foods
   > db.createCollection("users")
   > db.createCollection("foods")
   ```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Whitelist your IP address

---

## 4. Backend Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
- multer
- **axios** (NEW: for ML service communication)
- and more...

### Step 2: Configure Environment Variables

Create `.env` file in `backend/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/olive_foods
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/olive_foods

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Stripe (if using payment)
STRIPE_SECRET_KEY=your_stripe_secret_key

# ML Service URL
ML_SERVICE_URL=http://localhost:5001

# Server Port
PORT=4000
```

### Step 3: Test Backend

```bash
npm run dev
```

You should see:
```
Server Started on port: 4000
MongoDB Connected
ML Service URL: http://localhost:5001
```

---

## 5. ML Service Setup

### Step 1: Install Python Dependencies

```bash
cd ml-service
pip install -r requirements.txt
```

This installs:
- Flask
- flask-cors
- numpy
- pandas
- scikit-learn
- joblib
- gunicorn

### Step 2: Verify Installation

```bash
python -c "import flask, sklearn, pandas, numpy; print('All packages installed successfully!')"
```

---

## 6. Training the Model

### Option A: Train Locally

```bash
cd ml-service/src

# Step 1: Generate dataset
python generate_dataset.py

# Step 2: Train model
python train_model.py
```

**Expected Output:**
- `food_health_dataset.csv` - Dataset with 150+ food items
- Model files in `ml-service/models/`:
  - `food_recommendation_model.pkl`
  - `feature_scaler.pkl`
  - `feature_columns.pkl`
- Visualization files:
  - `health_scores_distribution.png`
  - `correlation_matrix.png`
  - `feature_importance.png`

### Option B: Train with Google Colab

1. **Open Google Colab**: https://colab.research.google.com/

2. **Upload Files**:
   - `ml-service/src/generate_dataset.py`
   - `ml-service/src/train_model.py`

3. **Run in Colab**:

   ```python
   # Cell 1: Install dependencies
   !pip install scikit-learn pandas numpy matplotlib seaborn joblib
   
   # Cell 2: Upload training files (if not already uploaded)
   from google.colab import files
   uploaded = files.upload()  # Upload generate_dataset.py and train_model.py
   
   # Cell 3: Generate dataset
   !python generate_dataset.py
   
   # Cell 4: Train model
   !python train_model.py
   
   # Cell 5: Download trained models
   files.download('food_recommendation_model.pkl')
   files.download('feature_scaler.pkl')
   files.download('feature_columns.pkl')
   ```

4. **Download Model Files**:
   - After training completes, download the `.pkl` files
   - Place them in `ml-service/models/` directory

### Step 3: Verify Model Files

```bash
cd ml-service/models
ls -la
```

You should see:
- `food_recommendation_model.pkl` (~1-5 MB)
- `feature_scaler.pkl` (~1 KB)
- `feature_columns.pkl` (~1 KB)

---

## 7. Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel will run on: http://localhost:5173 (or similar)

### Admin Features:
- Add food items with nutritional information
- Update food categories
- Manage orders
- View all food items with nutritional data

---

## 8. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on: http://localhost:5174 (or similar)

### User Features:
- Browse food items
- Complete health profile
- Get personalized food recommendations
- Place orders

---

## 9. Running the Complete System

### Terminal 1: Start MongoDB (if local)
```bash
mongod --dbpath /path/to/data
```

### Terminal 2: Start Backend
```bash
cd backend
npm run dev
```
Runs on: `http://localhost:4000`

### Terminal 3: Start ML Service
```bash
cd ml-service
python app.py
```
Runs on: `http://localhost:5001`

### Terminal 4: Start Admin Panel
```bash
cd admin
npm run dev
```
Runs on: `http://localhost:5173`

### Terminal 5: Start Frontend
```bash
cd frontend
npm run dev
```
Runs on: `http://localhost:5174`

---

## 10. Testing

### Test ML Service

```bash
# Health check
curl http://localhost:5001/health

# Calculate BMI
curl -X POST http://localhost:5001/api/ml/calculate-bmi \
  -H "Content-Type: application/json" \
  -d '{"height": 170, "weight": 70}'
```

### Test Backend API

```bash
# Check ML service status
curl http://localhost:4000/api/ml/status

# Get food list
curl http://localhost:4000/api/food/list
```

### Test Complete Flow

1. **Admin Panel** (http://localhost:5173):
   - Login as admin
   - Add a food item with nutritional info:
     - Name: "Grilled Chicken Salad"
     - Category: "Salads & Greens"
     - Calories: 250
     - Protein: 35g
     - Carbohydrates: 15g
     - Price: $12.99

2. **Frontend** (http://localhost:5174):
   - Register a new user
   - Complete health profile:
     - Age: 30
     - Weight: 75kg
     - Height: 175cm
     - Health conditions: Select "Diabetes"
   - Click "Get Meal Recommendations"
   - View personalized recommendations

---

## 11. Deployment to Production

### Deploy Backend (Node.js)

#### Option 1: Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create olive-foods-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set ML_SERVICE_URL=https://your-ml-service.herokuapp.com

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean/AWS/Azure

1. Create a VM instance
2. Install Node.js and PM2
3. Clone repository
4. Install dependencies
5. Set environment variables
6. Run with PM2:
   ```bash
   pm2 start server.js --name olive-backend
   pm2 save
   pm2 startup
   ```

### Deploy ML Service (Python)

#### Option 1: Heroku

```bash
cd ml-service

# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Create runtime.txt
echo "python-3.10.0" > runtime.txt

# Deploy
heroku create olive-foods-ml
git push heroku main
```

#### Option 2: Railway.app

1. Connect GitHub repository
2. Select `ml-service` folder
3. Deploy automatically

#### Option 3: AWS Lambda + API Gateway

Use Zappa or Serverless framework for serverless deployment

### Deploy Frontend & Admin (React)

#### Option 1: Vercel

```bash
cd frontend  # or admin

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

---

## 12. Troubleshooting

### Issue: ML Service Not Connecting

**Symptoms**: Backend shows "ML service is not available"

**Solutions**:
1. Check if ML service is running:
   ```bash
   curl http://localhost:5001/health
   ```

2. Check `ML_SERVICE_URL` in backend `.env`

3. Check firewall rules

4. Check ML service logs:
   ```bash
   cd ml-service
   python app.py
   ```

### Issue: Models Not Loading

**Symptoms**: ML service starts but says "Models not loaded"

**Solutions**:
1. Verify model files exist:
   ```bash
   ls -la ml-service/models/
   ```

2. Re-train the model:
   ```bash
   cd ml-service/src
   python train_model.py
   ```

3. Check file permissions

### Issue: MongoDB Connection Failed

**Symptoms**: "MongoDB connection error"

**Solutions**:
1. Check if MongoDB is running:
   ```bash
   # Local
   mongod --version
   
   # Atlas
   # Check connection string in .env
   ```

2. Verify MongoDB URI in `.env`

3. Check network/firewall rules

4. For Atlas: Check IP whitelist

### Issue: Import Error in Python

**Symptoms**: "ModuleNotFoundError: No module named 'flask'"

**Solutions**:
```bash
cd ml-service
pip install -r requirements.txt --upgrade
```

### Issue: Admin Can't Add Food with Nutritional Info

**Symptoms**: Form submission fails

**Solutions**:
1. Check backend logs
2. Verify all required fields are filled
3. Check network tab in browser dev tools
4. Verify backend is running on correct port

### Issue: No Recommendations Generated

**Symptoms**: User gets empty recommendations

**Solutions**:
1. Check if user completed health profile
2. Verify food items exist in database
3. Check ML service is running
4. Check backend logs for errors

---

## 📊 System Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   MongoDB   │
│   (React)   │     │  (Node.js)  │     │  (Database) │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           │ HTTP Requests
                           ▼
                    ┌─────────────┐
                    │ ML Service  │
                    │  (Flask)    │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  ML Models  │
                    │  (.pkl)     │
                    └─────────────┘
```

---

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use strong, random secret keys
3. **MongoDB**: Enable authentication in production
4. **CORS**: Configure allowed origins properly
5. **API Rate Limiting**: Implement rate limiting
6. **Input Validation**: Validate all user inputs
7. **HTTPS**: Use HTTPS in production

---

## 📝 Next Steps

1. ✅ Set up all services
2. ✅ Train ML model
3. ✅ Add food items via admin panel
4. ✅ Test recommendations
5. 🔄 Deploy to production
6. 🔄 Monitor and optimize
7. 🔄 Collect user feedback
8. 🔄 Retrain model with real data

---

## 🆘 Support

For issues or questions:
1. Check this guide
2. Review error logs
3. Check GitHub issues
4. Contact development team

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Google Colab Guide](https://colab.research.google.com/)

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Olive Foods Development Team**

