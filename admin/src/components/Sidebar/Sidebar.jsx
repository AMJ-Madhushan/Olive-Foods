import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-br from-light to-white border-r-[3px] border-primary text-[max(1vw,10px)] shadow-[2px_0_15px_rgba(78,140,1,0.1)] relative overflow-y-auto max-[900px]:w-[15%] max-[768px]:w-[15%] max-[450px]:w-[12%]'>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(78,140,1,0.03)] to-[rgba(78,140,1,0.01)] pointer-events-none"></div>
      <div className="py-[30px] px-5 pb-5 text-center border-b-2 border-[rgba(78,140,1,0.1)] mb-5 relative max-[768px]:py-5 max-[768px]:px-2.5 max-[450px]:py-4 max-[450px]:px-1.5">
        <h3 className="text-primary text-xl font-bold m-0 uppercase tracking-[1px] max-[900px]:text-base max-[768px]:text-sm max-[450px]:text-xs relative after:content-[''] after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-0.5 after:bg-gradient-to-br after:from-primary after:to-primary-dark after:rounded-sm"></h3>
      </div>
      <div className="px-4 pb-[30px] flex flex-col gap-2 relative z-[1] max-[900px]:px-2.5 max-[768px]:px-2.5 max-[450px]:px-1.5 max-[450px]:pb-4">
        <NavLink to='add' className={({ isActive }) => `flex items-center gap-4 border-2 border-transparent border-r-0 py-[18px] px-5 rounded-r-[20px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden bg-white mr-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-h-[60px] max-[900px]:py-4 max-[900px]:px-3 max-[768px]:py-3 max-[768px]:px-2 max-[768px]:mr-1.5 max-[450px]:py-2.5 max-[450px]:px-1.5 max-[450px]:mr-1 max-[450px]:min-h-[45px] ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-primary translate-x-3 shadow-[0_8px_25px_rgba(78,140,1,0.25)]' : 'hover:bg-gradient-to-br hover:from-light hover:to-white hover:border-primary hover:translate-x-2 hover:shadow-[0_6px_20px_rgba(78,140,1,0.15)]'}`}>
          <img src={assets.add_icon} alt="Add Items" className="w-7 h-7 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 max-[768px]:w-6 max-[768px]:h-6 max-[450px]:w-5 max-[450px]:h-5" />
          <p className="font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-text m-0 flex-1 max-[900px]:hidden">Add Items</p>
          <div className="absolute left-full top-1/2 -translate-y-1/2 bg-text text-white py-2 px-3 rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-300 ease-in-out z-[1000] ml-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-[900px]:hidden">Add new food items to the menu</div>
        </NavLink>
        <NavLink to='list' className={({ isActive }) => `flex items-center gap-4 border-2 border-transparent border-r-0 py-[18px] px-5 rounded-r-[20px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden bg-white mr-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-h-[60px] max-[900px]:py-4 max-[900px]:px-3 max-[768px]:py-3 max-[768px]:px-2 max-[768px]:mr-1.5 max-[450px]:py-2.5 max-[450px]:px-1.5 max-[450px]:mr-1 max-[450px]:min-h-[45px] ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-primary translate-x-3 shadow-[0_8px_25px_rgba(78,140,1,0.25)]' : 'hover:bg-gradient-to-br hover:from-light hover:to-white hover:border-primary hover:translate-x-2 hover:shadow-[0_6px_20px_rgba(78,140,1,0.15)]'}`}>
          <img src={assets.order_icon} alt="List Items" className="w-7 h-7 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 max-[768px]:w-6 max-[768px]:h-6 max-[450px]:w-5 max-[450px]:h-5" />
          <p className="font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-text m-0 flex-1 max-[900px]:hidden">List Items</p>
          <div className="absolute left-full top-1/2 -translate-y-1/2 bg-text text-white py-2 px-3 rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-300 ease-in-out z-[1000] ml-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-[900px]:hidden">Manage existing food items</div>
        </NavLink>
        <NavLink to='orders' className={({ isActive }) => `flex items-center gap-4 border-2 border-transparent border-r-0 py-[18px] px-5 rounded-r-[20px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden bg-white mr-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-h-[60px] max-[900px]:py-4 max-[900px]:px-3 max-[768px]:py-3 max-[768px]:px-2 max-[768px]:mr-1.5 max-[450px]:py-2.5 max-[450px]:px-1.5 max-[450px]:mr-1 max-[450px]:min-h-[45px] ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-primary translate-x-3 shadow-[0_8px_25px_rgba(78,140,1,0.25)]' : 'hover:bg-gradient-to-br hover:from-light hover:to-white hover:border-primary hover:translate-x-2 hover:shadow-[0_6px_20px_rgba(78,140,1,0.15)]'}`}>
          <img src={assets.order_icon} alt="Orders" className="w-7 h-7 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 max-[768px]:w-6 max-[768px]:h-6 max-[450px]:w-5 max-[450px]:h-5" />
          <p className="font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-text m-0 flex-1 max-[900px]:hidden">Orders</p>
          <div className="absolute left-full top-1/2 -translate-y-1/2 bg-text text-white py-2 px-3 rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible transition-all duration-300 ease-in-out z-[1000] ml-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-[900px]:hidden">View and manage customer orders</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
