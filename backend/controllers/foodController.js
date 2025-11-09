import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// add food items

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  
  // Parse nutritional info from request
  const nutritionalInfo = {
    calories: Number(req.body.calories),
    protein: Number(req.body.protein),
    carbohydrates: Number(req.body.carbohydrates)
  };

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    nutritionalInfo: nutritionalInfo
  });
  
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error: " + error.message });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// update food item
const updateFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const updateData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        nutritionalInfo: {
          calories: Number(req.body.calories),
          protein: Number(req.body.protein),
          carbohydrates: Number(req.body.carbohydrates)
        }
      };

      if (req.file) {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        updateData.image = req.file.filename;
      }

      await foodModel.findByIdAndUpdate(req.body.id, updateData);
      res.json({ success: true, message: "Food Updated" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error: " + error.message });
  }
};

export { addFood, listFood, removeFood, updateFood };
