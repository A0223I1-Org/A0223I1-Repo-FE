import React, { useState } from 'react';
import '../header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';



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
    background: #0072BC;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    height: 60px;
    margin-left: 1px;
}

#dropdown-basic{
  background-color: #0072BC;
}
.header .header-2 .navbar {
    text-align: left;
}

.dropdown-menu{
    background: #3794d2 !important;

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
    background:  #0b68a6;
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
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false); // State to track dropdown open/close

  // Function to toggle dropdown state
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false); // State to track dropdown open/close

  // Function to toggle dropdown state
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  return (
    <StyleReportChart>
    <header className="header">
      <div className="header-2">
        <nav className="navbar">
          <a href="#home">Hệ thống</a>
          {/* Use Dropdown component from react-bootstrap */}
          <Dropdown show={isDropdownOpen1} onToggle={toggleDropdown1}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Chức năng
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Dropdown items */}
              <Dropdown.Item as={NavLink} to="/retailSale">Hóa đơn bán hàng</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/retail">Bán lẻ</Dropdown.Item>
              <Dropdown.Item href="#">Bán sỉ</Dropdown.Item>
              <Dropdown.Item href="#">Bán theo đơn</Dropdown.Item>
              <Dropdown.Item href="#">Khách hoàn trả</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          

          {/* Other navigation links */}
          <Dropdown show={isDropdownOpen2} onToggle={toggleDropdown2}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Quản lý thông tin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Dropdown items */}
              <Dropdown.Item as={NavLink} to="/medicineGroup">Quản lý nhóm thuốc</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/medicineInfo">Quản lý thông tin thuốc</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/listPrescription">Quản lý toa thuốc</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/supplier">Quản lý nhà cung cấp</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/listCustomer">Quản lý khách hàng</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/employee/list">Quản lý nhân viên</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>          
          <a href="#reviews">Tra cứu</a>
          <NavLink to="/report">Báo cáo</NavLink>
          <a href="#helps">Trợ giúp</a>
          <NavLink to="/customerService">Hỗ trợ khách hàng</NavLink>
        </nav>
      </div>
    </header>
    </StyleReportChart>
  );
};

export default Header;
