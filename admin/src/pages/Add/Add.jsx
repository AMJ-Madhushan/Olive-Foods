import React, { useState, useEffect } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
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

  const handleImageChange = (file) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const removeImage = () => {
    setImage(false);
    if (!isEditMode) {
      setExistingImage("");
    }
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
      <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-text text-base animate-fadeIn max-[768px]:w-[90%] max-[768px]:ml-[5%] max-[400px]:ml-[15px] max-[400px]:w-[calc(100%-30px)]">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
          <div className="w-[50px] h-[50px] border-[5px] border-[#f3f3f3] border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary text-lg font-semibold">Loading food item data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-text text-base animate-fadeIn max-[768px]:w-[90%] max-[768px]:ml-[5%] max-[400px]:ml-[15px] max-[400px]:w-[calc(100%-30px)]">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 bg-white p-10 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 max-[768px]:p-8 max-[768px]:px-5 max-[400px]:p-5 max-[400px]:px-4">
        <h2 className="text-primary text-[2rem] font-bold mb-8 text-center max-[768px]:text-xl">{isEditMode ? "Update Food Item" : "Add New Food Item"}</h2>
        
        {/* Enhanced Image Uploader */}
        <div className="flex flex-col gap-4">
          <label className="text-primary font-semibold text-lg mb-2">
            Product Image {isEditMode && <span className="text-sm text-[#666] font-normal italic">(optional - leave empty to keep current)</span>}
          </label>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out ${
              isDragging
                ? "border-primary bg-[rgba(78,140,1,0.15)] scale-[1.02]"
                : image || existingImage
                ? "border-gray-300 bg-gray-50"
                : "border-primary bg-light hover:bg-[rgba(78,140,1,0.1)] hover:border-primary-dark"
            }`}
          >
            {(image || existingImage) ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="relative group">
                  <img
                    src={
                      image 
                        ? URL.createObjectURL(image) 
                        : `${url}/images/${existingImage}`
                    }
                    alt="Product preview"
                    className="w-[200px] h-[200px] object-cover rounded-xl shadow-lg transition-all duration-300 max-[400px]:w-[150px] max-[400px]:h-[150px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-red-600 transform hover:scale-105"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {image ? `Selected: ${image.name}` : "Current image"}
                </p>
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-primary text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Change Image
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-col items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-primary font-semibold text-lg mb-1">
                      {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Choose File
                </label>
              </div>
            )}
            
            <input
              onChange={(e) => handleImageChange(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
              required={!isEditMode}
            />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-full">
          <p className="text-primary font-semibold text-lg mb-2.5">Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text w-full focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
            required
          />
        </div>
        <div className="flex flex-col w-full max-w-full">
          <p className="text-primary font-semibold text-lg mb-2.5">Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            className="py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text w-full resize-y min-h-[120px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
            required
          ></textarea>
        </div>
        <div className="flex gap-[30px] flex-wrap max-[768px]:flex-col max-[768px]:gap-5">
          <div className="flex-1 min-w-[200px] flex flex-col max-[768px]:min-w-full">
            <p className="text-primary font-semibold text-lg mb-2.5">Product category</p>
            <select
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
              className="w-full py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
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
          <div className="flex-1 min-w-[200px] flex flex-col max-[768px]:min-w-full">
            <p className="text-primary font-semibold text-lg mb-2.5">Product price (LKR)</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="2000"
              className="w-full py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
              required
            />
          </div>
        </div>
        <div className="w-full p-6 bg-light rounded-[15px] border-2 border-primary">
          <h3 className="text-primary text-xl font-bold mb-5 text-center">Nutritional Information (per serving)</h3>
          <div className="flex gap-[30px] flex-wrap max-[768px]:flex-col max-[768px]:gap-5">
            <div className="flex-1 min-w-[200px] flex flex-col max-[768px]:min-w-full">
              <p className="text-primary font-semibold text-lg mb-2.5">Calories (kcal)</p>
              <input
                onChange={onChangeHandler}
                value={data.calories}
                type="Number"
                name="calories"
                placeholder="250"
                className="w-full py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
                required
                min="0"
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col max-[768px]:min-w-full">
              <p className="text-primary font-semibold text-lg mb-2.5">Protein (g)</p>
              <input
                onChange={onChangeHandler}
                value={data.protein}
                type="Number"
                name="protein"
                placeholder="20"
                className="w-full py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
                required
                min="0"
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col max-[768px]:min-w-full">
              <p className="text-primary font-semibold text-lg mb-2.5">Carbohydrates (g)</p>
              <input
                onChange={onChangeHandler}
                value={data.carbohydrates}
                type="Number"
                name="carbohydrates"
                placeholder="30"
                className="w-full py-[15px] px-5 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px"
                required
                min="0"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end items-center">
          {isEditMode && (
            <button 
              type="button" 
              onClick={() => navigate("/list")} 
              className="bg-[#f5f5f5] text-[#666] border-2 border-gray-300 py-[15px] px-10 text-lg font-bold rounded-xl cursor-pointer transition-all duration-300 ease-in-out uppercase tracking-[1px] min-w-[150px] hover:bg-gray-300 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-[15px] px-10 text-lg font-bold rounded-xl cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(78,140,1,0.3)] uppercase tracking-[1px] self-center min-w-[150px] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)] active:-translate-y-0.5 active:shadow-[0_4px_15px_rgba(78,140,1,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-gradient-to-br disabled:hover:from-primary disabled:hover:to-primary-dark disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_15px_rgba(78,140,1,0.3)]" disabled={loading}>
            {loading ? "Saving..." : (isEditMode ? "UPDATE" : "ADD")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
