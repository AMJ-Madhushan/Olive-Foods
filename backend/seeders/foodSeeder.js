import mongoose from 'mongoose';
import foodModel from '../models/foodModel.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from backend directory (parent of seeders)
dotenv.config({ path: join(__dirname, '..', '.env') });

// Sample food data with nutritional information for each category
const foodData = [
  // Salads & Greens
  {
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken breast, cherry tomatoes, cucumber, and balsamic vinaigrette",
    price: 12.99,
    category: "Salads & Greens",
    image: "food_1.png",
    nutritionalInfo: {
      calories: 250,
      protein: 35,
      carbohydrates: 15
    }
  },
  {
    name: "Caesar Salad",
    description: "Classic Caesar salad with romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
    price: 10.99,
    category: "Salads & Greens",
    image: "https://www.pexels.com/photo/pancake-with-sliced-strawberry-376464/",
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbohydrates: 18
    }
  },

  // Low-Carb Meals
  {
    name: "Cauliflower Rice Bowl",
    description: "Cauliflower rice with grilled vegetables, avocado, and herb sauce",
    price: 11.99,
    category: "Low-Carb Meals",
    image: "food_3.png",
    nutritionalInfo: {
      calories: 280,
      protein: 15,
      carbohydrates: 12
    }
  },
  {
    name: "Zucchini Noodles with Pesto",
    description: "Spiralized zucchini with homemade basil pesto and cherry tomatoes",
    price: 10.49,
    category: "Low-Carb Meals",
    image: "food_4.png",
    nutritionalInfo: {
      calories: 220,
      protein: 10,
      carbohydrates: 18
    }
  },

  // High-Protein
  {
    name: "Grilled Chicken Breast",
    description: "Perfectly grilled chicken breast with herbs and spices",
    price: 13.99,
    category: "High-Protein",
    image: "food_5.png",
    nutritionalInfo: {
      calories: 165,
      protein: 31,
      carbohydrates: 0
    }
  },
  {
    name: "Protein Power Bowl",
    description: "Quinoa bowl with grilled chicken, black beans, and mixed vegetables",
    price: 14.49,
    category: "High-Protein",
    image: "food_6.png",
    nutritionalInfo: {
      calories: 420,
      protein: 38,
      carbohydrates: 35
    }
  },

  // Heart-Healthy
  {
    name: "Baked Salmon with Vegetables",
    description: "Fresh Atlantic salmon baked with seasonal vegetables",
    price: 16.99,
    category: "Heart-Healthy",
    image: "food_7.png",
    nutritionalInfo: {
      calories: 290,
      protein: 34,
      carbohydrates: 12
    }
  },
  {
    name: "Avocado Toast",
    description: "Whole grain toast with smashed avocado, olive oil, and herbs",
    price: 8.99,
    category: "Heart-Healthy",
    image: "food_8.png",
    nutritionalInfo: {
      calories: 280,
      protein: 8,
      carbohydrates: 32
    }
  },

  // Diabetic-Friendly
  {
    name: "Veggie Omelette",
    description: "Egg white omelette with spinach, tomatoes, and mushrooms",
    price: 9.99,
    category: "Diabetic-Friendly",
    image: "food_9.png",
    nutritionalInfo: {
      calories: 150,
      protein: 18,
      carbohydrates: 8
    }
  },
  {
    name: "Lentil Soup",
    description: "Hearty lentil soup with vegetables and herbs",
    price: 7.99,
    category: "Diabetic-Friendly",
    image: "food_10.png",
    nutritionalInfo: {
      calories: 180,
      protein: 12,
      carbohydrates: 28
    }
  },

  // Whole Grains
  {
    name: "Brown Rice Bowl",
    description: "Organic brown rice with steamed vegetables and teriyaki sauce",
    price: 10.99,
    category: "Whole Grains",
    image: "food_11.png",
    nutritionalInfo: {
      calories: 290,
      protein: 14,
      carbohydrates: 48
    }
  },
  {
    name: "Quinoa Salad",
    description: "Protein-rich quinoa with mixed vegetables and lemon dressing",
    price: 11.49,
    category: "Whole Grains",
    image: "food_12.png",
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbohydrates: 45
    }
  },

  // Lean Protein
  {
    name: "Baked Chicken Breast",
    description: "Herb-marinated chicken breast baked to perfection",
    price: 12.99,
    category: "Lean Protein",
    image: "food_13.png",
    nutritionalInfo: {
      calories: 165,
      protein: 31,
      carbohydrates: 0
    }
  },
  {
    name: "Grilled Fish Fillet",
    description: "Fresh white fish grilled with lemon and herbs",
    price: 15.99,
    category: "Lean Protein",
    image: "food_14.png",
    nutritionalInfo: {
      calories: 210,
      protein: 32,
      carbohydrates: 0
    }
  },

  // Vegetarian
  {
    name: "Veggie Burger",
    description: "Plant-based burger with fresh vegetables and whole wheat bun",
    price: 11.99,
    category: "Vegetarian",
    image: "food_15.png",
    nutritionalInfo: {
      calories: 310,
      protein: 18,
      carbohydrates: 38
    }
  },
  {
    name: "Tofu Stir Fry",
    description: "Crispy tofu with mixed vegetables in savory sauce",
    price: 10.99,
    category: "Vegetarian",
    image: "food_16.png",
    nutritionalInfo: {
      calories: 240,
      protein: 16,
      carbohydrates: 22
    }
  },

  // Soups
  {
    name: "Vegetable Soup",
    description: "Fresh seasonal vegetables in savory broth",
    price: 6.99,
    category: "Soups",
    image: "food_17.png",
    nutritionalInfo: {
      calories: 120,
      protein: 5,
      carbohydrates: 18
    }
  },
  {
    name: "Chicken Noodle Soup",
    description: "Classic comfort soup with chicken and vegetables",
    price: 8.99,
    category: "Soups",
    image: "food_18.png",
    nutritionalInfo: {
      calories: 180,
      protein: 15,
      carbohydrates: 20
    }
  },

  // Grilled Items
  {
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled with herbs and lemon",
    price: 17.99,
    category: "Grilled Items",
    image: "food_19.png",
    nutritionalInfo: {
      calories: 290,
      protein: 34,
      carbohydrates: 0
    }
  },
  {
    name: "Grilled Vegetables",
    description: "Assorted seasonal vegetables grilled to perfection",
    price: 9.99,
    category: "Grilled Items",
    image: "food_20.png",
    nutritionalInfo: {
      calories: 150,
      protein: 6,
      carbohydrates: 25
    }
  }
];

const seedFoods = async () => {
  try {
    // Connect to MongoDB - Check for both MONGO_URL and MONGODB_URI
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MongoDB URI not found!');
      console.error('   Please set MONGO_URL or MONGODB_URI in your .env file');
      console.error('   Current .env location:', join(__dirname, '..', '.env'));
      process.exit(1);
    }
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully!');

    // Clear existing food data (optional)
    await foodModel.deleteMany({});
    console.log('🗑️  Cleared existing food data');

    // Insert new food data
    const foods = await foodModel.insertMany(foodData);
    console.log(`✅ Successfully seeded ${foods.length} food items`);
    
    // Display seeded data summary
    const categoryCounts = {};
    foods.forEach(food => {
      categoryCounts[food.category] = (categoryCounts[food.category] || 0) + 1;
    });
    
    console.log('\n📊 Food items by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} items`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder
seedFoods();

