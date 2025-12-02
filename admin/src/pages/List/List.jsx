import React, { useEffect, useState } from "react";
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
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-text text-base animate-fadeIn flex flex-col gap-2.5 max-[768px]:w-[90%] max-[768px]:ml-[5%]">
      <p className="text-primary text-[2rem] font-bold mb-8 text-center">All Food Items</p>
      <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
        <div className="grid grid-cols-[0.8fr_2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr] items-center gap-4 p-5 px-6 border-b border-gray-300 text-[0.95rem] transition-all duration-300 ease-in-out relative bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-lg uppercase tracking-[1px] border-b-0 max-[768px]:hidden">
          <b className="text-white font-bold">Image</b>
          <b className="text-white font-bold">Name</b>
          <b className="text-white font-bold">Category</b>
          <b className="text-white font-bold">Calories</b>
          <b className="text-white font-bold">Protein (g)</b>
          <b className="text-white font-bold">Carbs (g)</b>
          <b className="text-white font-bold">Price</b>
          <b className="text-white font-bold">Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-[0.8fr_2fr_1.5fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr] items-center gap-4 p-5 px-6 border-b border-gray-300 text-[0.95rem] transition-all duration-300 ease-in-out relative hover:bg-light hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(78,140,1,0.1)] last:border-b-0 max-[768px]:grid-cols-[1fr_2fr_1fr] max-[768px]:gap-4 max-[768px]:p-4 max-[768px]:px-5 max-[600px]:grid-cols-[1fr_2fr] max-[600px]:gap-2.5 max-[600px]:p-3 max-[600px]:px-4">
              <img src={`${url}/images/` + item.image} alt="" className="w-[60px] h-[60px] object-cover rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] max-[768px]:w-[50px] max-[768px]:h-[50px] max-[600px]:w-[40px] max-[600px]:h-[40px]" />
              <p className="text-text font-medium m-0 max-[600px]:text-sm">{item.name}</p>
              <p className="bg-light text-primary py-1.5 px-3 rounded-[20px] font-semibold text-center text-sm capitalize inline-block whitespace-nowrap">{item.category}</p>
              <p className="bg-[#FFF3E0] text-[#F57C00] py-1 px-2.5 rounded-xl font-semibold text-sm text-center inline-block max-[768px]:hidden">{item.nutritionalInfo?.calories || 'N/A'}</p>
              <p className="bg-[#F3E5F5] text-[#7B1FA2] py-1 px-2.5 rounded-xl font-semibold text-sm text-center inline-block max-[768px]:hidden">{item.nutritionalInfo?.protein || 'N/A'}g</p>
              <p className="bg-[#E8F5E9] text-[#388E3C] py-1 px-2.5 rounded-xl font-semibold text-sm text-center inline-block max-[768px]:hidden">{item.nutritionalInfo?.carbohydrates || 'N/A'}g</p>
              <p className="text-primary font-bold text-base max-[768px]:hidden">LKR {item.price}</p>
              <div className="flex gap-2.5 items-center justify-center max-[768px]:col-span-1">
                <span 
                  onClick={() => navigate(`/add?id=${item._id}`)} 
                  className="font-bold text-xl cursor-pointer py-2 px-3 rounded-lg transition-all duration-300 ease-in-out text-center min-w-[40px] inline-flex items-center justify-center text-primary bg-[rgba(78,140,1,0.1)] hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(78,140,1,0.3)]"
                  title="Edit Food Item"
                >
                  ✏️
                </span>
                <span 
                  onClick={() => removeFood(item._id)} 
                  className="font-bold text-xl cursor-pointer py-2 px-3 rounded-lg transition-all duration-300 ease-in-out text-center min-w-[40px] inline-flex items-center justify-center text-[#dc3545] bg-[rgba(220,53,69,0.1)] hover:bg-[#dc3545] hover:text-white hover:scale-110 hover:shadow-[0_4px_15px_rgba(220,53,69,0.3)]"
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
