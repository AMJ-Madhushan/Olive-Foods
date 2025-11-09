# 🌱 Food Seeder Guide - Olive Foods

This guide explains how to use the food seeder to populate your database with sample food items.

## 📋 What is a Seeder?

A seeder is a script that populates your database with sample/initial data. Our food seeder adds **20 food items** (2 items per category) with complete nutritional information to your MongoDB database.

## 📦 Included Data

The seeder creates food items across **10 health-focused categories**:

| Category | Items | Description |
|----------|-------|-------------|
| **Salads & Greens** | 2 | Fresh salads with nutritional info |
| **Low-Carb Meals** | 2 | Low carbohydrate options |
| **High-Protein** | 2 | Protein-rich meals |
| **Heart-Healthy** | 2 | Good for cardiovascular health |
| **Diabetic-Friendly** | 2 | Suitable for diabetics |
| **Whole Grains** | 2 | Complex carbohydrates |
| **Lean Protein** | 2 | Low-fat protein sources |
| **Vegetarian** | 2 | Plant-based options |
| **Soups** | 2 | Nutritious soups |
| **Grilled Items** | 2 | Grilled food options |

Each food item includes:
- ✅ Name and description
- ✅ Price
- ✅ Category
- ✅ Nutritional Info (calories, protein, carbohydrates)
- ✅ Image reference

## 🚀 How to Run the Seeder

### Prerequisites

1. **MongoDB must be running**
   ```bash
   # Check if MongoDB is running
   # For local MongoDB:
   mongod --version
   
   # For MongoDB Atlas: Ensure your connection string is in .env
   ```

2. **Backend dependencies installed**
   ```bash
   cd backend
   npm install
   ```

3. **Environment variables configured**
   - Make sure your `backend/.env` file has the correct `MONGODB_URI`

### Running the Seeder

#### Option 1: Using Node (Recommended)

```bash
# Navigate to backend directory
cd backend

# Run the seeder
node seeders/foodSeeder.js
```

#### Option 2: Using npm script

If you add this to your `backend/package.json`:

```json
{
  "scripts": {
    "seed": "node seeders/foodSeeder.js"
  }
}
```

Then run:
```bash
cd backend
npm run seed
```

### Expected Output

When the seeder runs successfully, you'll see:

```bash
📦 Connected to MongoDB
🗑️  Cleared existing food data
✅ Successfully seeded 20 food items

📊 Food items by category:
  - Salads & Greens: 2 items
  - Low-Carb Meals: 2 items
  - High-Protein: 2 items
  - Heart-Healthy: 2 items
  - Diabetic-Friendly: 2 items
  - Whole Grains: 2 items
  - Lean Protein: 2 items
  - Vegetarian: 2 items
  - Soups: 2 items
  - Grilled Items: 2 items

✅ Seeding completed successfully!
```

## ⚠️ Important Notes

### Data Clearing

**The seeder CLEARS all existing food data before inserting new items.**

If you want to keep existing data, modify line 280 in `backend/seeders/foodSeeder.js`:

```javascript
// Comment out this line to keep existing data:
// await foodModel.deleteMany({});
```

### Image References

The seeder uses placeholder image names (`food_1.png`, `food_2.png`, etc.). Make sure you have corresponding images in your `backend/uploads/` directory, or the food items will display with broken image links.

To add actual images:
1. Place food images in `backend/uploads/`
2. Update the `image` field in the seeder data to match your actual image filenames

## 🔄 Re-running the Seeder

You can run the seeder multiple times. Each time it runs:
1. ✅ Clears all existing food data (if not commented out)
2. ✅ Inserts fresh data
3. ✅ Closes the database connection

This is useful for:
- Resetting your database to initial state
- Testing with fresh data
- Development purposes

## 🛠️ Customizing the Seeder

### Adding More Food Items

Edit `backend/seeders/foodSeeder.js` and add more items to the `foodData` array:

```javascript
{
  name: "Your Food Name",
  description: "Detailed description",
  price: 15.99,
  category: "Lean Protein", // Must match one of the 10 categories
  image: "your_food_image.png",
  nutritionalInfo: {
    calories: 300,
    protein: 25,
    carbohydrates: 20
  }
}
```

### Valid Categories

Only use these category names (must match exactly):
- `Salads & Greens`
- `Low-Carb Meals`
- `High-Protein`
- `Heart-Healthy`
- `Diabetic-Friendly`
- `Whole Grains`
- `Lean Protein`
- `Vegetarian`
- `Soups`
- `Grilled Items`

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solution:**
1. Check if MongoDB is running
2. Verify `MONGODB_URI` in your `.env` file
3. For MongoDB Atlas, check your network connection

```bash
# Test your MongoDB connection
mongosh "your_connection_string"
```

### Error: "Validation failed"

**Solution:**
- Check that all required fields are present
- Verify nutritional info has `calories`, `protein`, `carbohydrates`
- Ensure category name matches exactly

### Error: "Module not found"

**Solution:**
```bash
cd backend
npm install
```

### Food items not showing images

**Solution:**
1. Check `backend/uploads/` directory has images
2. Update image filenames in seeder to match your actual files
3. Or upload matching images through admin panel

## 📊 Verifying Seeded Data

### Check in MongoDB

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use olive_foods

# View all food items
db.foods.find().pretty()

# Count food items
db.foods.countDocuments()

# View items by category
db.foods.find({ category: "Salads & Greens" }).pretty()
```

### Check in Application

1. **Admin Panel**: http://localhost:5173
   - Navigate to "List Items"
   - You should see all 20 food items

2. **Frontend**: http://localhost:5174
   - Visit the menu page
   - All food items should be visible

## 🔐 Production Considerations

### For Production Deployment:

1. **Don't run seeder on production** unless you want to reset data
2. **Backup your database** before running seeder
3. **Use separate seeder** for production with real data
4. **Consider using migrations** instead of seeders for production

### Backup Before Seeding

```bash
# Backup MongoDB database
mongodump --db olive_foods --out ./backup

# Restore if needed
mongorestore --db olive_foods ./backup/olive_foods
```

## 📝 Best Practices

1. ✅ **Development**: Run seeder to get started quickly
2. ✅ **Testing**: Use seeder for consistent test data
3. ✅ **Staging**: Seed with production-like data
4. ❌ **Production**: Don't use seeder (use migrations or manual data entry)

## 🎯 Next Steps After Seeding

1. **Start your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start ML service** (if using recommendations):
   ```bash
   cd ml-service
   python app.py
   ```

3. **Start admin panel**:
   ```bash
   cd admin
   npm run dev
   ```

4. **Start frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Test the application**:
   - Visit admin panel to see seeded food items
   - Visit frontend to browse menu
   - Try adding items to cart

## 📚 Additional Resources

- [MongoDB Seeding Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/)
- [Mongoose Models Documentation](https://mongoosejs.com/docs/models.html)
- Main README: [README.md](./README.md)
- Deployment Guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🆘 Need Help?

If you encounter issues:
1. Check error messages carefully
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check the seeder file for syntax errors
5. Review this guide's troubleshooting section

---

**Happy Seeding! 🌱**

Your database will be populated with healthy, nutritious food options ready for ML-based recommendations!

