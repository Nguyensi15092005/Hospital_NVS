import { useEffect, useState } from "react";
import { getSetting } from "../../../services/client/setting.service";
import { getListTinTuc } from "../../../services/client/tintuc.service";
import { Col, Row } from "antd";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import {Link} from "react-router-dom";
import "./tintuc.scss";

function TinTucSuKien() {
  const [tintucImagePage, setImage] = useState();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const resImage = await getSetting();
      if (resImage) {
        setImage(resImage.setting.tintucImagePage);
      }
      const res = await getListTinTuc();
      if (res) {
        setdata(res.tintuc.reverse());
      }
    };
    fetchAPI();
  }, []);
  return (
    <>
      <div className="tintuc">

        {tintucImagePage ? <img src={tintucImagePage} className="tintuc__image-page" alt="tintucPageImage" /> : <></>}
        <div className="tintuc__title">
          Tin Tức & sự kiện
        </div>
        <div className="tintuc__not">
          <span></span>
        </div>
        <Row justify="space-between" gutter={[15, 20]} className="tintuc__box">
          {data?.map(item => {
            return (
              <Col xl={8} md={12} sm={22} key={item._id}>
                <Link to={`${item.slug}`}>
                  <div className="tintuc__box-item">
                    <img src={item.image} alt=""/>
                    <h2>
                      {item.title}
                    </h2>
                    <div className="date">
                      <HiOutlineCalendarDateRange className="icon" /> {(item.createdAt).split('T')[0]}
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}
export default TinTucSuKien;