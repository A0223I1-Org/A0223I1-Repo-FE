import img1 from "../navInformation/image/default-avatar.png";
import img2 from "../navInformation/image/default-avatar.png";
import img8 from "../nav/image/logout.png";
import React from "react";

const NavInformation = () => {
    return (
        <div className="main-left">
            <nav className="sidebar">
                <ul>
                    <li style={{ textAlign: "center", fontSize: "22.8px", padding: " 0px 3px"}}>Chọn nhanh</li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a href="http://localhost:3000/listCustomer"><img src={img1} alt="icon" /> Quản lý khách hàng</a></li>
                    <li><a href="#Nhanvien"><img src={img2} alt="icon" /> Quản lý nhân viên</a></li>
                    <li><a href="#Dangxuat"><img src={img8} alt="icon" /> Đăng xuất</a></li>
                </ul>
            </nav>

        </div>
    );
};

export default NavInformation;