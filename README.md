# 🍽️ Olive Foods - AI-Powered Food Management System

An intelligent food delivery platform that provides personalized meal recommendations based on users' health conditions using machine learning.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![ML](https://img.shields.io/badge/ML-Scikit--learn-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### For Users
- 🎯 **Personalized Recommendations**: ML-powered food suggestions based on health profile
- 💪 **Health Profile Management**: Track health conditions (diabetes, hypertension, etc.)
- 📊 **Nutritional Information**: View calories, protein, and carbohydrates for each food item
- 🧮 **BMI Calculator**: Built-in health assessment tool
- 🛒 **Online Ordering**: Browse and order food items
- 🔐 **Secure Authentication**: JWT-based user authentication

### For Administrators
- ➕ **Food Management**: Add, edit, and delete food items
- 📝 **Nutritional Data Entry**: Input complete nutritional information
- 📈 **Order Management**: Track and manage customer orders
- 👥 **User Management**: View and manage registered users
- 🎨 **Category Management**: 10 health-focused food categories

### ML-Powered Features
- 🤖 **6 Health Conditions**: Diabetes, Hypertension, Heart Disease, High Cholesterol, Obesity, Kidney Disease
- 📊 **3 Nutritional Metrics**: Calories, Protein, Carbohydrates
- 🎯 **Suitability Scoring**: AI-based food suitability predictions
- 🔄 **Real-time Recommendations**: Instant personalized suggestions

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     OLIVE FOODS SYSTEM                    │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌───────────┐  │
│  │Frontend │  │  Admin  │  │Backend  │  │ML Service │  │
│  │(React)  │  │(React)  │  │(Node.js)│  │(Flask)    │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └─────┬─────┘  │
│       │            │            │              │         │
│       └────────────┴────────────┼──────────────┘         │
│                                 │                         │
│                          ┌──────▼──────┐                 │
│                          │   MongoDB   │                 │
│                          └─────────────┘                 │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Python 3.8+
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Olive-Foods
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Setup ML Service**
   ```bash
   cd ml-service
   python -m pip install --upgrade pip setuptools wheel
   pip install -r requirements.txt
   cd src
   python generate_dataset.py
   python train_model.py
   cd ..
   python app.py
   ```

4. **Setup Admin Panel**
   ```bash
   cd admin
   npm install
   npm run dev
   ```

5. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

For detailed instructions, see [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)

## 📚 Documentation

- 📖 [Quick Start Guide](QUICK_START_GUIDE.md) - Get started in 20 minutes
- 🚀 [Deployment Guide](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- 🎓 [Google Colab Training](ml-service/GOOGLE_COLAB_TRAINING.md) - Train ML model in the cloud
- 🔧 [ML Service README](ml-service/README.md) - ML service documentation

## 🛠️ Tech Stack

### Frontend & Admin
- **React 18** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Routing
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Axios** - ML service communication

### ML Service
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **Scikit-learn** - Machine learning
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Joblib** - Model serialization

## 📊 Project Structure

```
OLIVE-FOODS/
├── admin/                    # Admin panel (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Add/         # Add food with nutritional info
│   │   │   └── List/        # List all foods
│   │   └── components/
│   └── package.json
│
├── backend/                  # Node.js API
│   ├── controllers/
│   │   ├── foodController.js
│   │   ├── userController.js
│   │   └── mlController.js  # ML integration
│   ├── models/
│   │   ├── foodModel.js     # Food with nutrition
│   │   └── userModel.js     # User with health profile
│   ├── routes/
│   │   └── mlRoute.js       # ML endpoints
│   └── server.js
│
├── frontend/                 # User-facing app (React)
│   ├── src/
│   └── package.json
│
└── ml-service/              # Python ML service
    ├── app.py               # Flask API
    ├── config.py
    ├── requirements.txt
    ├── models/              # Trained models (.pkl)
    └── src/
        ├── train_model.py
        ├── generate_dataset.py
        └── food_health_dataset.csv
```

## 🎯 Food Categories

1. **Salads & Greens** - Fresh, low-calorie options
2. **Low-Carb Meals** - For weight management and diabetes
3. **High-Protein** - Muscle building and satiety
4. **Heart-Healthy** - Good fats, low sodium
5. **Diabetic-Friendly** - Low glycemic index
6. **Whole Grains** - Complex carbs, fiber-rich
7. **Lean Protein** - Low-fat protein sources
8. **Vegetarian** - Plant-based options
9. **Soups** - Nutritious, low-calorie
10. **Grilled Items** - Healthy cooking method

## 🔌 API Endpoints

### Food Endpoints
- `POST /api/food/add` - Add new food item
- `GET /api/food/list` - Get all foods
- `POST /api/food/remove` - Remove food
- `POST /api/food/update` - Update food

### ML Endpoints
- `POST /api/ml/recommend` - Get personalized recommendations
- `POST /api/ml/predict-suitability` - Predict food suitability
- `POST /api/ml/health-profile/update` - Update health profile
- `POST /api/ml/health-profile/get` - Get health profile
- `POST /api/ml/calculate-bmi` - Calculate BMI
- `GET /api/ml/status` - Check ML service status

### User Endpoints
- `POST /api/user/register` - Register user
- `POST /api/user/login` - Login user
- `POST /api/user/cart/add` - Add to cart
- `POST /api/user/cart/remove` - Remove from cart

## 🧪 Testing

### Test ML Service
```bash
curl http://localhost:5001/health
```

### Test Backend
```bash
curl http://localhost:4000/api/ml/status
```

### Test Recommendations
```bash
curl -X POST http://localhost:4000/api/ml/recommend \
  -H "Content-Type: application/json" \
  -H "token: YOUR_JWT_TOKEN" \
  -d '{"userId": "USER_ID", "topN": 10}'
```

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Input Validation
- ✅ CORS Configuration
- ✅ Environment Variables
- ✅ Secure File Uploads

## 🎨 Screenshots

*Coming soon...*

## 📈 ML Model Details

- **Algorithm**: Random Forest Classifier (Multi-output)
- **Features**: 4 (calories, protein, carbohydrates, category)
- **Targets**: 6 health conditions
- **Training Data**: 150+ food items
- **Accuracy**: ~85%

### Model Training Process
1. Generate dataset with realistic nutritional values
2. Feature engineering and encoding
3. Train multiple models (Random Forest, Gradient Boosting, Decision Tree)
4. Select best model based on accuracy
5. Save model with preprocessing objects

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
cd backend
heroku create olive-foods-backend
git push heroku main
```

### ML Service (Heroku/Railway)
```bash
cd ml-service
heroku create olive-foods-ml
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
vercel
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Olive Foods Development Team

## 🙏 Acknowledgments

- Scikit-learn for ML algorithms
- MongoDB for database
- Express.js for backend framework
- React for frontend framework
- Flask for ML service

## 📧 Contact

For questions or support, please open an issue or contact the development team.

---

**Built with ❤️ by Olive Foods Team**

⭐ Star us on GitHub if you find this project useful!
