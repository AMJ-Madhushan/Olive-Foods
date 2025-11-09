import React, { useState, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Add = ({url}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get('id');
  const isEditMode = !!foodId;
  
  const {token, admin} = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads & Greens",
    calories: "",
    protein: "",
    carbohydrates: ""
  });

  // Load food data when in edit mode
  useEffect(() => {
    if (isEditMode && foodId && token) {
      loadFoodData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodId, isEditMode, token]);

  const loadFoodData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const foodItem = response.data.data.find(item => item._id === foodId);
        if (foodItem) {
          setData({
            name: foodItem.name || "",
            description: foodItem.description || "",
            price: foodItem.price || "",
            category: foodItem.category || "Salads & Greens",
            calories: foodItem.nutritionalInfo?.calories || "",
            protein: foodItem.nutritionalInfo?.protein || "",
            carbohydrates: foodItem.nutritionalInfo?.carbohydrates || ""
          });
          setExistingImage(foodItem.image || "");
        } else {
          toast.error("Food item not found");
          navigate("/list");
        }
      }
    } catch (error) {
      console.error("Error loading food data:", error);
      toast.error("Error loading food item");
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("calories", Number(data.calories));
    formData.append("protein", Number(data.protein));
    formData.append("carbohydrates", Number(data.carbohydrates));
    
    // Only append image if a new one is selected
    if (image) {
      formData.append("image", image);
    }
    
    // Add food ID if in edit mode
    if (isEditMode) {
      formData.append("id", foodId);
    }

    try {
      const endpoint = isEditMode ? `${url}/api/food/update` : `${url}/api/food/add`;
      const response = await axios.post(endpoint, formData, {headers: {token}});
      
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Reset form only if adding new item
        if (!isEditMode) {
          setData({
            name: "",
            description: "",
            price: "",
            category: "Salads & Greens",
            calories: "",
            protein: "",
            carbohydrates: ""
          });
          setImage(false);
        }
        
        // Navigate to list page after success
        setTimeout(() => {
          navigate("/list");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving food:", error);
      toast.error(error.response?.data?.message || "Error saving food item");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(!admin && !token){
      toast.error("Please Login First");
       navigate("/");
    }
  },[])
  if (loading && isEditMode) {
    return (
      <div className="add">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading food item data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <h2>{isEditMode ? "Update Food Item" : "Add New Food Item"}</h2>
        <div className="add-img-upload flex-col">
          <p>Upload image {isEditMode && <span className="optional-text">(optional - leave empty to keep current)</span>}</p>
          <label htmlFor="image">
            <img
              src={
                image 
                  ? URL.createObjectURL(image) 
                  : (existingImage ? `${url}/images/${existingImage}` : assets.upload_area)
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required={!isEditMode}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salads & Greens">Salads & Greens</option>
              <option value="Low-Carb Meals">Low-Carb Meals</option>
              <option value="High-Protein">High-Protein</option>
              <option value="Heart-Healthy">Heart-Healthy</option>
              <option value="Diabetic-Friendly">Diabetic-Friendly</option>
              <option value="Whole Grains">Whole Grains</option>
              <option value="Lean Protein">Lean Protein</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Soups">Soups</option>
              <option value="Grilled Items">Grilled Items</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <div className="add-nutritional-info">
          <h3>Nutritional Information (per serving)</h3>
          <div className="add-category-price">
            <div className="add-price flex-col">
              <p>Calories (kcal)</p>
              <input
                onChange={onChangeHandler}
                value={data.calories}
                type="Number"
                name="calories"
                placeholder="250"
                required
                min="0"
              />
            </div>
            <div className="add-price flex-col">
              <p>Protein (g)</p>
              <input
                onChange={onChangeHandler}
                value={data.protein}
                type="Number"
                name="protein"
                placeholder="20"
                required
                min="0"
              />
            </div>
            <div className="add-price flex-col">
              <p>Carbohydrates (g)</p>
              <input
                onChange={onChangeHandler}
                value={data.carbohydrates}
                type="Number"
                name="carbohydrates"
                placeholder="30"
                required
                min="0"
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          {isEditMode && (
            <button 
              type="button" 
              onClick={() => navigate("/list")} 
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Saving..." : (isEditMode ? "UPDATE" : "ADD")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
