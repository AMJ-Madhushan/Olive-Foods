import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <div className="sidebar-options">
        <NavLink to='add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
          <div className="tooltip">Add new food items to the menu</div>
        </NavLink>
        <NavLink to='list' className="sidebar-option">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
          <div className="tooltip">Manage existing food items</div>
        </NavLink>
        <NavLink to='orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
          <div className="tooltip">View and manage customer orders</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
