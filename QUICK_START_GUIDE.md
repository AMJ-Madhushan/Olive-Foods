# 🚀 Olive Foods - Quick Start Guide

Get your ML-powered food recommendation system up and running in minutes!

## ⚡ Prerequisites

- Node.js v16+
- Python 3.8+
- MongoDB (local or Atlas)

## 📦 Installation Steps

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/olive_foods
JWT_SECRET=your_secret_key_here
ML_SERVICE_URL=http://localhost:5001
PORT=4000
EOF

# Start backend
npm run dev
```

### 2. ML Service Setup (10 minutes)

```bash
# Navigate to ml-service
cd ml-service

# Install Python dependencies
pip install -r requirements.txt

# Generate dataset and train model
cd src
python generate_dataset.py
python train_model.py

# Start ML service
cd ..
python app.py
```

### 3. Admin Panel Setup (3 minutes)

```bash
# Navigate to admin
cd admin

# Install dependencies
npm install

# Start admin panel
npm run dev
```

### 4. Frontend Setup (3 minutes)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

## 🎯 Quick Test

1. **Admin Panel** (http://localhost:5173):
   - Login (or register as admin)
   - Add a food item:
     ```
     Name: Grilled Chicken Salad
     Category: Salads & Greens
     Calories: 250
     Protein: 35
     Carbohydrates: 15
     Price: 12.99
     ```

2. **Frontend** (http://localhost:5174):
   - Register a new user
   - Complete health profile
   - Get personalized recommendations!

## ✅ Verify Everything Works

### Check Services

```bash
# Check Backend
curl http://localhost:4000

# Check ML Service
curl http://localhost:5001/health

# Check ML Service Status from Backend
curl http://localhost:4000/api/ml/status
```

Expected responses: All should return success messages

## 🐛 Common Issues

### ML Service Won't Start
```bash
pip install -r requirements.txt --upgrade
```

### Backend Can't Connect to ML Service
- Ensure ML service is running on port 5001
- Check `ML_SERVICE_URL` in backend `.env`

### MongoDB Connection Error
```bash
# Start MongoDB (if local)
mongod --dbpath /path/to/data

# OR use MongoDB Atlas connection string
```

### Models Not Found
```bash
cd ml-service/src
python generate_dataset.py
python train_model.py
```

## 📊 What's Included?

✅ **3 Nutritional Facts**: Calories, Protein, Carbohydrates  
✅ **10 Food Categories**: Optimized for health conditions  
✅ **6 Health Conditions**: Diabetes, Hypertension, Heart Disease, High Cholesterol, Obesity, Kidney Disease  
✅ **150+ Sample Foods**: Ready-to-use dataset  
✅ **ML-Powered Recommendations**: Personalized food suggestions  
✅ **BMI Calculator**: Built-in health assessment  

## 🎓 Training with Google Colab

If you prefer to train the model in Google Colab:

1. Open https://colab.research.google.com/
2. Upload `ml-service/src/generate_dataset.py` and `train_model.py`
3. Run:
   ```python
   !pip install scikit-learn pandas numpy matplotlib seaborn joblib
   !python generate_dataset.py
   !python train_model.py
   ```
4. Download the `.pkl` files
5. Place them in `ml-service/models/`

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | http://localhost:4000 | Main API server |
| ML Service | http://localhost:5001 | ML predictions |
| Admin Panel | http://localhost:5173 | Food management |
| Frontend | http://localhost:5174 | User interface |

## 🔑 Default Admin Credentials

Create admin user through registration, then update role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@olivefood.com" },
  { $set: { role: "admin" } }
)
```

## 📚 Next Steps

1. ✅ Complete setup (you just did this!)
2. 📝 Add more food items via admin panel
3. 🧪 Test with different health profiles
4. 🎨 Customize frontend design
5. 🚀 Deploy to production (see DEPLOYMENT_GUIDE.md)

## 💡 Pro Tips

- **Development**: Use `npm run dev` for hot reload
- **Production**: Use `npm run build` and serve with nginx
- **ML Model**: Retrain periodically with real user data
- **Database**: Backup regularly
- **Security**: Change all default secrets before production

## 🆘 Need Help?

1. Check DEPLOYMENT_GUIDE.md for detailed instructions
2. Review error logs in terminal
3. Check ml-service/README.md for ML-specific issues
4. Verify all services are running

## ✨ Features Overview

### For Users:
- Personalized meal recommendations
- Health profile management
- BMI calculator
- Browse food with nutritional info
- Order food online

### For Admins:
- Add/edit food items
- Manage nutritional data
- View orders
- Manage users

### ML Features:
- Multi-output classification
- Health condition analysis
- Suitability scoring
- Real-time predictions

---

**Ready to go?** All services should now be running! 🎉

Start by adding food items in the admin panel, then test recommendations in the frontend!

