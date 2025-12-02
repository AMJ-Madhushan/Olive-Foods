import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url} =useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment=async()=>{
        const response= await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }else{
            toast.error("Something went wrong");
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='min-h-screen grid bg-light w-screen -ml-[calc(50vw-50%)] py-20'>
        <div className="max-w-[1200px] mx-auto px-5 grid min-h-[60vh]">
          <div className="w-[100px] h-[100px] place-self-center border-[5px] border-[#bdbdbd] border-t-primary rounded-full animate-[rotate_1s_infinite]"></div>
        </div>
    </div>
  )
}

export default Verify
