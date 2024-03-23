import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

const CardStyled = styled.div`
  .card-container {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .card-container:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Image container */

  .card-container img {
    max-width: 100%; /* Adjust as needed */
    max-height: 90%; /* Adjust as needed */
    height: auto;
    width: auto;
    object-fit: cover;
    border-radius: 4px;
  }
  /* Text container */

  .card-container div:last-child {
    flex: 1;
    margin-left: 16px;
  }

  .card-container div:last-child p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  .card-container div:last-child p:first-child {
    font-weight: bold;
  }

  .card-container div:last-child p:last-child {
    font-size: 14px;
    color: #666;
  }

  .slick-slide > div {
    margin: 20px 10px;
  }


  .slick-prev:before, .slick-next:before {
    color: #010f1c;
    font-size: 35px;
  }
  .slick-prev{
    margin-left: 20px;
  }
  .slick-next{
    margin-right: 40px;
  }
`
export const CardSwipe = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        slideCount: 8
    }
    return (
        <CardStyled>
        <div className="w-3/4 card-main">
            <div className="mt-20">
                <Slider {...settings}>
                {cards.map((c) => (
                    <div className="card-container">
                        <div>
                            <img src={c.img} alt=""/>
                        </div>
                        <div>
                            <div style={{ maxHeight: '5.4em', overflow: 'hidden' }}>
                                <p style={{ lineHeight: '1.2em', maxHeight: '3.6em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.imgName}</p>
                            </div>
                            <p style={{textAlign: "center", maxWidth: "100%", fontSize:"30px", marginTop:"10px"}}>{c.retailPrice}</p>
                        </div>
                    </div>
                ))
                }
                </Slider>
            </div>
        </div>
        </CardStyled>
    )
}
const cards = [
    {
        imgName: 'Dung dịch nhỏ mắt Refresh Tears giảm khó chịu do khô mắt, dị vật (chai 15ml)',
        img: '/familyMedicine/familyMed1.webp',
        retailPrice: '66.000 ₫/chai'
    },
    {
        imgName: 'Hỗn dịch uống Phosphalugel 20% điều trị các triệu chứng viêm loét dạ dày tá tràng, viêm thực quản (hộp 26 gói)',
        img: '/familyMedicine/familyMed2.webp',
        retailPrice: '109.200 ₫/Hộp'
    },
    {
        imgName: 'Dung dịch uống BioGaia Protectis Baby Drops bổ sung lợi khuẩn tiêu hóa (Lọ 5ml)',
        img: '/familyMedicine/familyMed3.webp',
        retailPrice: '415.000 ₫/Lọ'
    },
    {
        imgName: 'Viên nén sủi bọt Efferalgan Eff. 500mg điều trị các chứng đau và/hoặc sốt như đau đầu, tình trạng như cúm, đau răng,...',
        img: '/familyMedicine/familyMed4.webp',
        retailPrice: '47.990 ₫/Hộp'
    },
    {
        imgName: 'Hỗn dịch uống Enterogermina 2B/5ml điều trị và phòng ngừa rối loạn vi khuẩn đường ruột (2 vỉ x 10 ống)',
        img: '/familyMedicine/familyMed5.webp',
        retailPrice: '165.000 ₫/Hộp'
    },
    {
        imgName: 'Dung dịch LIVESPO Clausy bổ sung men vi sinh giúp cân bằng hệ vi sinh đường ruột(Hộp 20 ống)',
        img: '/familyMedicine/familyMed6.webp',
        retailPrice: '128.000 ₫/Hộp'
    },
    {
        imgName: 'Viên nén Tanakan 40mg điều trị các triệu chứng rối loạn nhận thức ở người lớn tuổi (2 vỉ x 15 viên)',
        img: '/familyMedicine/familyMed7.webp',
        retailPrice: '138.000 ₫/Hộp'
    },
    {
        imgName: 'Viên ngậm Strepsils Original trị đau họng (2 vỉ x 12 viên)',
        img: '/familyMedicine/familyMed8.webp',
        retailPrice: '34.000 ₫/Hộp'
    },
]