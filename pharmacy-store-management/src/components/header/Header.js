import React from 'react';
import '../header/Header';

const Header = () => {
  return (
    <header className="header">
    <div className="header-2">
        <nav className="navbar">
            <a href="#home">Hệ thống</a>
            <div className="dropdown">
                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Chức năng
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Hóa đơn bán hàng</a></li>
                    <li><a className="dropdown-item" href="#">Bán lẻ</a></li>
                    <li><a className="dropdown-item" href="#">Bán sỉ</a></li>
                    <li><a className="dropdown-item" href="#">Bán theo đơn</a></li>
                    <li><a className="dropdown-item" href="#">Khách hoàn trả</a></li>
                </ul>
            </div>

            <a href="#arrivals">Quản lí thông tin</a>
            <a href="#reviews">Tra cứu</a>
            <a href="#blogs">Báo cáo</a>
            <a href="#helps">Trợ giúp</a>
        </nav>
    </div>
    </header>
  );
};

export default Header;