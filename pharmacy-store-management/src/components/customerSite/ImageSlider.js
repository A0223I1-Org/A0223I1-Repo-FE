
import 'react-slideshow-image/dist/styles.css'
import {Fade, Zoom, Slide} from "react-slideshow-image";
import styled from "styled-components";

const ImageSliderStyled = styled.div`
  .slide-container {
    margin: 20px 0;
  }

`

export const ImageSlider =()=>{
    return(
        <ImageSliderStyled>
        <div className='slide-container'>
            <Fade>
                {slideImages.map((image,index) => (
                    <div key={index}>
                        <div style={{...divStyle,backgroundImage:`url(${image.path})`}}>

                        </div>
                    </div>
                ))}
            </Fade>
        </div>
        </ImageSliderStyled>
    )
}
const slideImages = [
    {
        path: '/imgSlide/imgSlide1.webp'
    },
    {
        path: '/imgSlide/imgSlide2.webp'
    },
    {
        path: '/imgSlide/imgSlide3.webp'
    },
    {
        path: '/imgSlide/imgSlide4.webp'
    },
    {
        path: '/imgSlide/imgSlide5.webp'
    },
    {
        path: '/imgSlide/imgSlide6.jpg'
    }
];
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight:'100%',
    height: '600px',
    backgroundSize: 'cover',
    borderRadius: '10px'
}