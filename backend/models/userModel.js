import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  bmi: { type: Number },
  conditions: {
    diabetes: { type: Boolean, default: false },
    hypertension: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false },
    highCholesterol: { type: Boolean, default: false },
    obesity: { type: Boolean, default: false },
    kidneyDisease: { type: Boolean, default: false }
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    default: 'moderate'
  }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cartData: { type: Object, default: {} },
    healthProfile: { type: healthProfileSchema },
    hasCompletedHealthProfile: { type: Boolean, default: false }
  },
  { minimize: false, timestamps: true }
);

// Calculate BMI before saving
userSchema.pre('save', function(next) {
  if (this.healthProfile && this.healthProfile.height && this.healthProfile.weight) {
    const heightInMeters = this.healthProfile.height / 100;
    this.healthProfile.bmi = parseFloat((this.healthProfile.weight / (heightInMeters * heightInMeters)).toFixed(2));
  }
  next();
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;
