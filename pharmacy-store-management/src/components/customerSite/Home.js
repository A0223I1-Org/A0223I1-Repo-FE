import {Link} from "react-router-dom";
import {BsArrowRight} from "react-icons/bs";
import './Home.css'
import {ImageSlider} from "./ImageSlider";
import {CardSwipe} from "./CardSwipe";
import styled from "styled-components";

const HomeCSS = styled.div`
  *
  {
    margin: 0;
    padding:0;
    font-family: sans-serif;


  }
  .top-banner
  {
    width: 100%;
    background: #fff8f2;
    overflow: hidden;
  }
  .top-banner .container
  {
    max-width: 100%;
    height: 300px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .top-banner .container .detail
  {
    margin-top: 8%;
    margin-left: 30px;
  }
  .top-banner .container .detail h2
  {
    font-size: 42px;
    color: #010f1c;

    margin-bottom: 40px;
  }
  .top-banner .container .detail .link
  {
    margin-top: 20px;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    color: #010f1c;
    background: #ffffff;
  }
  .top-banner .container .detail .link:hover
  {
    background: #0989ff;

  }
  .img-box {
    margin: 0
  }

  .img-box img {
    max-width: 100%;
    width: 300px;
    height: 100%;
  }

`
export const Home =()=>{
    return(
        <>
            <HomeCSS>
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
            {/*<ChatForm/>*/}
            </HomeCSS>
        </>
    )
}