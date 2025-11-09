import mongoose from "mongoose";

const nutritionalInfoSchema = new mongoose.Schema({
  calories: { type: Number, required: true, min: 0 },
  protein: { type: Number, required: true, min: 0 },
  carbohydrates: { type: Number, required: true, min: 0 }
});

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
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
  },
  nutritionalInfo: { 
    type: nutritionalInfoSchema, 
    required: true 
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
