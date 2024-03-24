import React from 'react';
import '../nav/Nav';
import img1 from '../nav/image/banthuoc.png';
import img2 from '../nav/image/nhapkho.png';
import img3 from '../nav/image/xuathoantra.png';
import img4 from '../nav/image/xuathuy.png';
import img5 from '../nav/image/search.png';
import img6 from '../nav/image/baocao.png';
import img7 from '../nav/image/nhatky.png';
import img8 from '../nav/image/logout.png';
import styled from 'styled-components';


const StyleNav = styled.div`


.main {
    display: flex;
    padding-left: 3px;
    padding-top: 10px;
     
}
.main-left {
    flex: 1;
    width: 220px; 
    height: 100%;
    background: #0072BC;
    border-radius: 7px;  
    margin-right: 15px  
}
img {
    width: 32px; 
    height: 32px; 
}
.sidebar ul {
    list-style-type: none; 
    margin-top: 10px;
    
}

.sidebar ul li a {
    display: flex; 
    align-items: center; 
    padding: 7.5px; 
    text-decoration: none; 
    color: rgb(255, 255, 255); 
    margin-top: 8.5px;
    margin-bottom: 8.5px;
}

.sidebar ul li img  {
    margin-right: 5px; 
   
}
.sidebar ul li a:hover img  {
    margin-right: 10px; 
    background: #0b68a6;
    border-radius: 4px; 
}

`;

const Nav = () => {
    return (
        <StyleNav>
        <div className="main-left">
        <nav className="sidebar">
        <ul>
            <li style={{ textAlign: "center", fontSize: "22.8px", padding: " 0px 3px"}}>Chọn nhanh</li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li><a href="#Banhang"><img src={img1} alt="icon" /> Bán hàng</a></li>
            <li><a href="#Nhapkho"><img src={img2} alt="icon" /> Nhập kho</a></li>
            <li><a href="#Xuathoantra"><img src={img3} alt="icon" /> Xuất hoàn trả </a></li>
            <li><a href="#Xuathuy"><img src={img4} alt="icon" /> Xuất hủy</a></li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li><a href="#Tracuunhanh"><img src={img5} alt="icon" /> Tra cứu nhanh</a></li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li><a href="#Hethongbaocao"><img src={img6} alt="icon" /> Hệ thống báo cáo</a></li>
            <li><a href="#Nhatkybanhang"><img src={img7} alt="icon" /> Nhật ký bán hàng</a></li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li><a href="#Dangxuat"><img src={img8} alt="icon" /> Đăng xuất</a></li>
        </ul>
    </nav>
    </div>
    </StyleNav>
   );
};

  export default Nav;