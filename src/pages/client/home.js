import MainBoxItem from "../../component/MaiBoxItem";
import ListValueHos from "../../component/ListValueHos";
import BoxExpert from "../../component/BoxExpert";
import Device from "../../component/Device";
import ChuyenKhoa from "../../component/ChuyenKhoa";
import { Carousel } from 'antd';
import { useEffect, useState } from "react";
import { getListBanner } from "../../services/client/banner.service";

function Home() {
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getListBanner();
      if (res) {
        setBanner(res.banner);
      }
    };
    fetchAPI();
  }, [])
 

  return (
    <>
      <div className="main__container container">
        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={3500} className="main__banner">
          {banners?.map((item) => {
            return (
              <>
                <div>
                  <img src={item.image} alt=""/>
                </div>
              </>
            )
          })}
          {/* <div>
            <img src="/images/br1.jpg" />
          </div>
          <div>
            <img src="/images/br2.jpg" />
          </div>
          <div>
            <img src="/images/br3.jpg" />
          </div>
          <div>
            <img src="/images/br4.png" />
          </div> */}
        </Carousel>

        <MainBoxItem />
        <ListValueHos />
        <BoxExpert />
        <Device />
        <ChuyenKhoa />
      </div>
    </>
  )

}
export default Home;