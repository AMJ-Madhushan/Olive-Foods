import mongoose from "mongoose";

const recommendedFoodSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
      required: true,
      unique: true,
      index: true
    },
    recommendations: {
      type: Array,
      required: true,
      default: []
    },
    activeConditions: {
      type: Array,
      default: []
    },
    totalFoods: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
recommendedFoodSchema.index({ userId: 1 });

const recommendedFoodsModel = mongoose.models.recommendedFood || mongoose.model("recommendedFood", recommendedFoodSchema);

export default recommendedFoodsModel;

