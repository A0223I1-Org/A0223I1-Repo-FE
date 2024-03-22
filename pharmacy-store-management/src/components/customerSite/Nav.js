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
export const Nav = () =>{
    const {user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <>
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
                                <Link to='/contact' className='link'>Hỗ trọ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*<div className='chat-box'>*/}
            {/*    <div className="page-content page-container" id="page-content">*/}
            {/*        <div className="padding">*/}
            {/*            <div className="row container d-flex justify-content-center">*/}
            {/*                <div className="col-md-6">*/}
            {/*                    <div className="card card-bordered">*/}
            {/*                        <div className="card-header">*/}
            {/*                            <h4 className="card-title"><strong>Chat</strong></h4>*/}
            {/*                            <a className="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat*/}
            {/*                                App</a>*/}
            {/*                        </div>*/}


            {/*                        <div className="ps-container ps-theme-default ps-active-y" id="chat-content"*/}
            {/*                             style={{overflowY: "scroll", height:400}}>*/}
            {/*                            <div className="media media-chat">*/}
            {/*                                <img className="avatar" src="" alt="..."/>*/}
            {/*                                <div className="media-body">*/}

            {/*                                </div>*/}
            {/*                            </div>*/}

            {/*                            <div className="media media-meta-day">Today</div>*/}

            {/*                            <div className="media media-chat media-chat-reverse">*/}
            {/*                                <div className="media-body">*/}

            {/*                                </div>*/}
            {/*                            </div>*/}



            {/*                            <div className="ps-scrollbar-x-rail" style={{left:0, bottom:0}}>*/}
            {/*                                <div className="ps-scrollbar-x" tabIndex="0"*/}
            {/*                                     style={{left:0, width:0}}></div>*/}
            {/*                            </div>*/}
            {/*                            <div className="ps-scrollbar-y-rail" style={{top: 0, height: 0, right: 2}}>*/}
            {/*                                <div className="ps-scrollbar-y" tabIndex="0"*/}
            {/*                                     style={{top: 0, height: 2,}}></div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}

            {/*                        <div className="publisher bt-1 border-light">*/}
            {/*                            <img className="avatar avatar-xs"*/}
            {/*                                 src=""*/}
            {/*                                 alt="..."/>*/}
            {/*                            <input className="publisher-input" type="text" placeholder="Write something"/>*/}
            {/*                            <span className="publisher-btn file-group">*/}
            {/*                            <i className="fa fa-paperclip file-browser"></i>*/}
            {/*                            <input type="file"/>*/}
            {/*                            </span>*/}
            {/*                            <a className="publisher-btn text-info" href="#" data-abc="true"><i*/}
            {/*                                className="fa fa-paper-plane"></i></a>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}