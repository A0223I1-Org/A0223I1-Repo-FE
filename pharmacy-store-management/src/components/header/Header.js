import React, { useState } from 'react';
import '../header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap
import styled from 'styled-components';


const StyleReportChart = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap');

:root {
    --blue: #0072BC;
    --light-blue:#3794d2;
    --dark-blue:  #0b68a6;
    --black: #444;
    --light-color: #666;
    --border: .1rem solid rgba(0, 0, 0, .1);
    --border-hover: .1rem solid var(--black);
    --box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
}

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-transform: capitalize;
    transition: all .2s linear;
}
.header .header-2 {
    background: var(--blue);
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    height: 60px;
}

.header .header-2 .navbar {
    text-align: left;
}

.dropdown-menu{
    background: var(--light-blue) !important;

}

.header .header-2 .navbar a {
    color: #fff;
    display: inline-block;
    margin: 2px 2px; 
    padding: .65rem; 
    text-decoration: none; 
    transition: all .2s linear;
    font-size: 14.5px;
}

.header .header-2 .navbar a:hover {
    background: var(--dark-blue);
    border-radius: 10px;
}

.header .header-2.active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
`;
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown open/close

  // Function to toggle dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <StyleReportChart>
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
    </StyleReportChart>
  );
};

export default Header;
