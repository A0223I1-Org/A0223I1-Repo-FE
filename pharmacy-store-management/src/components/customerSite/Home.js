import {Link} from "react-router-dom";
import {BsArrowRight} from "react-icons/bs";
import './Home.css'
import {useEffect, useState} from "react";
import * as medicineService from '../../utils/InformationService/MedicineInformationManagementService/MedicineInformationService'
import {ImageSlider} from "./ImageSlider";
import {CardSwipe} from "./CardSwipe";
import {ChatForm} from "./chat/ChatForm";
export const Home =()=>{
    return(
        <>
            <div className='top-banner'>
                <div className='container'>
                    <div className='detail'>
                        <h2>Mẫu khẩu trang mới 2024</h2>
                        <Link to='/medicines' className='link'>Mua ngay <BsArrowRight/></Link>
                    </div>
                    <div className='img-box'>
                        <img src="/khau-trang-y-te.webp" alt="slidering"/>
                    </div>
                </div>
            </div>
            <ImageSlider/>
            <CardSwipe/>
            <ChatForm/>
        </>
    )
}