# 💾 Health Profile Data Persistence - Implementation Guide

This document explains how medical condition data is saved, fetched, and used in the Olive Foods system.

## 📊 Data Flow Overview

```
User fills Health Profile Form
    ↓
Frontend sends data to Backend API
    ↓
Backend saves to MongoDB (users collection)
    ↓
Data persists in database
    ↓
On page refresh: Frontend fetches from DB
    ↓
On "Suggest Me": Backend uses stored DB data for ML recommendations
```

## ✅ Implementation Details

### 1. **Data Storage in Database**

#### Database Structure:
The health profile is stored in the `users` collection under the `healthProfile` field:

```javascript
{
  _id: ObjectId("..."),
  name: "User Name",
  email: "user@example.com",
  healthProfile: {
    age: 30,
    weight: 75,
    height: 175,
    bmi: 24.49,
    activityLevel: "moderate",
    conditions: {
      diabetes: true,
      hypertension: false,
      heartDisease: false,
      highCholesterol: false,
      obesity: false,
      kidneyDisease: false
    }
  },
  hasCompletedHealthProfile: true
}
```

#### Backend Endpoint:
```
POST /api/ml/health-profile/update
```

**Request Body:**
```json
{
  "healthProfile": {
    "age": 30,
    "weight": 75,
    "height": 175,
    "activityLevel": "moderate",
    "conditions": {
      "diabetes": true,
      "hypertension": false,
      "heartDisease": false,
      "highCholesterol": false,
      "obesity": false,
      "kidneyDisease": false
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Health profile updated successfully",
  "healthProfile": { ... }
}
```

### 2. **Data Fetching on Page Load**

#### Frontend Implementation:
When the user visits `/health-profile`, the page automatically:
1. ✅ Checks if user is logged in
2. ✅ Fetches existing health profile from database
3. ✅ Populates all form fields with saved data
4. ✅ Displays calculated BMI if height/weight exist
5. ✅ Shows all checked health conditions

#### Backend Endpoint:
```
POST /api/ml/health-profile/get
```

**Response:**
```json
{
  "success": true,
  "healthProfile": {
    "age": 30,
    "weight": 75,
    "height": 175,
    "bmi": 24.49,
    "activityLevel": "moderate",
    "conditions": { ... }
  },
  "hasCompletedHealthProfile": true
}
```

### 3. **Using Stored Data for Recommendations**

#### When User Clicks "Suggest Me":
1. ✅ Backend fetches user's health profile from MongoDB
2. ✅ Extracts health conditions from stored data
3. ✅ Gets all active food items from database
4. ✅ Sends health conditions + foods to ML service
5. ✅ ML service processes and returns recommendations
6. ✅ Recommendations are based on stored DB data

#### Backend Endpoint:
```
POST /api/ml/recommend
```

**Process:**
```javascript
// 1. Get user from database
const user = await userModel.findById(userId);

// 2. Extract stored health conditions
const conditions = user.healthProfile.conditions;

// 3. Send to ML service
const mlRequest = {
  healthProfile: {
    conditions: conditions  // From database!
  },
  foods: [...],
  topN: 20
};

// 4. Get recommendations based on stored data
const recommendations = await mlService.recommend(mlRequest);
```

## 🔧 Key Features

### ✅ Automatic Data Persistence
- All health profile data is automatically saved to MongoDB
- No manual save required - happens on form submission
- Data persists across sessions and page refreshes

### ✅ Automatic Data Loading
- Form automatically loads existing data on page visit
- All fields pre-populated with saved values
- BMI automatically calculated and displayed

### ✅ Real-time Updates
- Changes are immediately saved to database
- Next page visit shows updated data
- Recommendations use latest stored data

### ✅ Data Validation
- Required fields validated before saving
- BMI automatically calculated and stored
- Health conditions properly structured

## 📝 Code Changes Made

### Frontend Changes:

1. **HealthProfile.jsx**:
   - ✅ Enhanced `fetchHealthProfile()` to properly load all data
   - ✅ Added loading state while fetching
   - ✅ Properly handles conditions data structure
   - ✅ Auto-calculates BMI from loaded data

2. **HealthProfile.css**:
   - ✅ Added loading spinner styles

### Backend Changes:

1. **mlController.js**:
   - ✅ Enhanced `updateHealthProfile()` with validation
   - ✅ Auto-calculates BMI before saving
   - ✅ Better error handling and logging
   - ✅ Enhanced `getHealthProfile()` with logging
   - ✅ Enhanced `getFoodRecommendations()` to use stored data
   - ✅ Added console logs for debugging

## 🧪 Testing the Implementation

### Test 1: Save Health Profile
1. Login as user
2. Go to `/health-profile`
3. Fill out the form:
   - Age: 30
   - Weight: 75
   - Height: 175
   - Select "Diabetes" condition
   - Click "Save Health Profile"
4. ✅ Check backend console - should see "Health profile updated"
5. ✅ Check MongoDB - user document should have `healthProfile` field

### Test 2: Refresh and Load Data
1. After saving, refresh the page
2. ✅ Form should auto-load with saved data
3. ✅ Age, weight, height should be pre-filled
4. ✅ "Diabetes" checkbox should be checked
5. ✅ BMI should be displayed automatically

### Test 3: Get Recommendations
1. Click "🎯 Suggest Me" button
2. ✅ Backend console should show:
   ```
   🎯 Generating recommendations for user: ...
   - Health Profile Data:
     Age: 30
     BMI: 24.49
     Conditions: ['diabetes']
   ```
3. ✅ Recommendations page should show foods suitable for diabetes
4. ✅ Each food should have suitability score

### Test 4: Update Health Profile
1. Go back to `/health-profile`
2. Change weight to 80
3. Add "Hypertension" condition
4. Save
5. ✅ Data should update in database
6. ✅ Refresh page - new data should load
7. ✅ Get recommendations - should consider both conditions

## 🔍 Database Verification

### Check in MongoDB:

```javascript
// Connect to MongoDB
mongosh "your_connection_string"

// Switch to database
use smartbite

// Find user with health profile
db.users.findOne({ email: "user@example.com" })

// Check health profile structure
db.users.findOne({ email: "user@example.com" }, { healthProfile: 1 })

// Count users with completed profiles
db.users.countDocuments({ hasCompletedHealthProfile: true })
```

## 🐛 Troubleshooting

### Issue: Data not saving
**Check:**
1. Backend console for errors
2. Network tab in browser for API response
3. MongoDB connection
4. User authentication token

### Issue: Data not loading on refresh
**Check:**
1. Browser console for errors
2. Network tab - is API call successful?
3. Backend logs - is data being fetched?
4. MongoDB - does user have healthProfile field?

### Issue: Recommendations not using stored data
**Check:**
1. Backend console logs - should show health profile data
2. ML service logs - should receive conditions
3. User's `hasCompletedHealthProfile` flag
4. MongoDB - verify healthProfile.conditions exists

## 📊 Data Structure Reference

### Health Profile Schema:
```javascript
{
  age: Number,              // Required
  weight: Number,           // Required (kg)
  height: Number,           // Required (cm)
  bmi: Number,              // Auto-calculated
  activityLevel: String,    // 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  conditions: {
    diabetes: Boolean,
    hypertension: Boolean,
    heartDisease: Boolean,
    highCholesterol: Boolean,
    obesity: Boolean,
    kidneyDisease: Boolean
  }
}
```

## ✅ Verification Checklist

- [x] Health profile saves to MongoDB
- [x] Data persists across sessions
- [x] Form loads existing data on refresh
- [x] All fields properly populated
- [x] Conditions checkboxes reflect saved state
- [x] BMI calculated and displayed
- [x] Recommendations use stored DB data
- [x] Backend logs show data being used
- [x] No data loss on page refresh
- [x] Updates properly saved to database

## 🎯 Summary

✅ **All medical condition data is now:**
- Saved to MongoDB users collection
- Automatically loaded on page refresh
- Used for ML-powered recommendations
- Persisted across sessions
- Properly validated before saving

The system now has complete data persistence for health profiles, ensuring that user medical conditions are always stored in the database and used for personalized food recommendations!

---

**Last Updated:** November 2025  
**Status:** ✅ Fully Implemented and Tested

