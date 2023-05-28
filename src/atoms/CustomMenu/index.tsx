import React, { useState } from 'react';
import "./styles.css"
export const CustomMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);

 
  

  const menuItems = [
    { label: 'View Item' },
    { label: 'Delete' },
  ];

  return (
    <div className="custom-menu">
    
    <ul className="menu-list bg-red">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item" >
              {item.label}
            </li>
          ))}
        </ul>
    </div>
  );
};

