import React, { useState } from 'react';
import '../header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown open/close

  // Function to toggle dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-2">
        <nav className="navbar">
          <a href="#home">Hệ thống</a>
          {/* Use Dropdown component from react-bootstrap */}
          <Dropdown show={isDropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Chức năng
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Dropdown items */}
              <Dropdown.Item href="#">Hóa đơn bán hàng</Dropdown.Item>
              <Dropdown.Item href="#">Bán lẻ</Dropdown.Item>
              <Dropdown.Item href="#">Bán sỉ</Dropdown.Item>
              <Dropdown.Item href="#">Bán theo đơn</Dropdown.Item>
              <Dropdown.Item href="#">Khách hoàn trả</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Other navigation links */}
          <a href="#arrivals">Quản lí thông tin</a>
          <a href="#reviews">Tra cứu</a>
          <a href="#" blogs="blogs">Báo cáo</a>
          <a href="#helps">Trợ giúp</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
