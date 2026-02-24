import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { getListKhoa } from "../../services/client/khoa.service";

function ChuyenKhoa() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListKhoa();
      if (res) {
        setData(res);
      }
    };

    fetchApi();
  }, []);


  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    speed: 300,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
      <div className="main__chuyenkhoa">
        <div className="main__chuyenkhoa--title">
          Chuyên khoa
        </div>
        <div className="main__chuyenkhoa--not">
          <span></span>
        </div>
        <Slider {...settings}>

          {data?.map(item => (
            <div className="main__chuyenkhoa--item">
              <div className="main__chuyenkhoa--item-icon">
                <img src={item.image} alt=""/>
              </div>
              <div className="main__chuyenkhoa--item-content">
                {item.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default ChuyenKhoa;