import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./service.scss";
import { getSetting } from "../../../services/client/setting.service";
import { getListService } from "../../../services/client/dichvukhambenh.service";

function DichVuKhamBenh() {
  const [serviceImagePage, setService] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const resImage = await getSetting();
      if (resImage) {
        setService(resImage.setting.serviceImagePage);
        console.log(resImage.setting)
      };
      const resService = await getListService();
      if (resService) {
        setData(resService.dichvu)
      }
    };
    fetchApi();
  }, []);
  const cutText = (text, maxLength = 200) => {
    if (!text) {
      return "";
    }
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  };
  return (
    <>
      <div className="service">

        {serviceImagePage ? <img src={serviceImagePage} className="service__image-page" alt="servicePageImage" /> : <></>}
        <div className="service__title">
          Dịch vụ khám bệnh
        </div>
        <div className="service__not">
          <span></span>
        </div>
        <Row justify="space-between" gutter={[10, 20]} className="service__box">
          {data?.map(item => {
            return (
              <Col xl={6} md={8} sm={22} key={item._id}>
                <div className="service__box--item">
                  <div className="icon">
                    <img src={item.image} alt=""/>
                  </div>
                  <h2>
                    {item.title}
                  </h2>
                  <p>
                    {cutText(item.content)}
                  </p>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}
export default DichVuKhamBenh;