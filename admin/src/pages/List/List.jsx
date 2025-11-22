import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token,admin } = useContext(StoreContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId },
      { headers: { token } }
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Calories</b>
          <b>Protein (g)</b>
          <b>Carbs (g)</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p className="category-badge">{item.category}</p>
              <p className="nutritional-badge calories">{item.nutritionalInfo?.calories || 'N/A'}</p>
              <p className="nutritional-badge protein">{item.nutritionalInfo?.protein || 'N/A'}g</p>
              <p className="nutritional-badge carbs">{item.nutritionalInfo?.carbohydrates || 'N/A'}g</p>
              <p className="price-tag">${item.price}</p>
              <div className="action-buttons">
                <span 
                  onClick={() => navigate(`/add?id=${item._id}`)} 
                  className="edit-icon cursor"
                  title="Edit Food Item"
                >
                  ✏️
                </span>
                <span 
                  onClick={() => removeFood(item._id)} 
                  className="delete-icon cursor"
                  title="Delete Food Item"
                >
                  X
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
