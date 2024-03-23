import React from 'react'
import {FaTruckMoving} from 'react-icons/fa'
import './Nav.css'
import { AiOutlineUser} from "react-icons/ai";
import {BsBell} from "react-icons/bs";
import {Link} from "react-router-dom";
import {CiLogin, CiLogout} from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import {PiMagnifyingGlassThin} from "react-icons/pi";
import styled from "styled-components";

const NavCSS = styled.div`
  *
  {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }

  .free
  {
    padding: 10px 30px;
    width: 100%;
    background-color: #010f1c;
    display: flex;

  }

  .free .icon
  {
    color: #f3b123;
    font-size: 32px;
  }

  .free p {
    margin-left: 10px;
    color: #f6f7f9;
    margin-top: 15px;
    font-size: 14px;
    font-weight: 600;
  }

  .main-header{
    width: 100%;
    height: auto;
    border-bottom: 1px solid #010f1c;
    background: #0989ff;
  }
  .main-header .container {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align items vertically */
    overflow: hidden;
  }
  .main-header .container .logo
  {
    max-width: 150px; /* Adjust max-width as needed */
    height: auto;
  }
  .main-header .container .logo img{
    width: 100%;
    height: auto;
  }
  .main-header .container .search-box
  {
    margin-right: 30px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    width: 500px; /* Adjust width as needed */
  }
  .main-header .container .search-box input
  {
    outline: none;
    width: 500px;
    color: #ecf2f7;
  }
  .main-header .container .icon
  {
    display: flex;
  }

  .main-header .container .icon .account
  {
    display: flex;
    margin-right: 30px;
  }
  .main-header .container .icon .account .user-icon
  {
    margin-right: 10px;
    font-size: 22px;
    color: #010f1c;
    cursor: pointer;
  }
  .main-header .container .icon .account p{
    margin-right: 5px;
    margin-top: 2px;
  }
  .main-header .container .icon .second-icon
  {
    display: flex;

  }
  .main-header .container .icon .second-icon .link
  {
    margin-right: 5px;
    font-size: 22px;
    cursor: pointer;
    color: #ffffff;
  }
  .main-header .container .icon .auth button{
    background: #0989ff;
    font-size: 22px;
    cursor: pointer;
    color: #ffffff;
  }
  .header {
    width: 100%;
    padding: 20px 30px;
    box-shadow: rgba(0,0,0,0.35) 0 5px 15px;
  }
  .header .container
  {
    display: flex;
    max-width: 100%;
    justify-content: space-between;
  }
  .header .container .nav ul
  {
    display: flex;
  }
  .header .container .nav ul li
  {
    margin-left: 20px;
    list-style: none;
  }
  .header .container .nav ul li .link{
    text-decoration: none;
    color: #010f1c;
    transition: 0.5s;
  }
  .header .container .nav ul li .link:hover
  {
    color: #0989ff;
  }



`
export const Nav = () =>{
    const {user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <>
            <NavCSS>
            <div className="free">
                <div className='icon'>
                    <FaTruckMoving/>
                </div>
                <p> MIỄN PHÍ vận chuyển cho đơn hàng từ 200.000Đ</p>
            </div>
            <div className='main-header'>
                <div className='container'>
                    <div className='logo'>
                        <img src="/logo-tagline.svg" alt="logo"/>
                    </div>
                    <div className='search-box'>
                        <input type="text" value='' placeholder='Tên thuốc, triệu chứng, vitamin và thực phẩm chức năng' autoComplete='off'/>
                    </div>
                    <div className='icon'>
                        {
                            isAuthenticated &&
                            (
                                <div className='account'>
                                    <div className='user-icon'>
                                        <AiOutlineUser></AiOutlineUser>
                                    </div>
                                    <p>Hello, {user.name}</p>
                                </div>
                            )
                        }
                        <div className='second-icon'>
                            <Link to='/' className='link'><BsBell></BsBell></Link>
                            <Link to='/cart' className='link'><MdOutlineLocalGroceryStore /></Link>

                        </div>
                        <div className='auth'>
                            {
                                isAuthenticated?
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout/></button>
                                    :
                                    <button onClick={()=>loginWithRedirect()}><CiLogin/></button>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className='header'>
                <div className='container'>
                    <div className='nav'>
                        <ul>
                            <li>
                                <Link to='/' className='link'>Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to='/about' className='link'>Nhãn hàng Pharmacity</Link>
                            </li>
                            <li>
                                <Link to='/contact' className='link'>Hỗ trợ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </NavCSS>
        </>
    )
}