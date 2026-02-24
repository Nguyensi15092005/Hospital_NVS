import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTinTuc } from "../../../services/client/tintuc.service";
import { Col, Row } from "antd";

function ChiTietTinTuc() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getTinTuc(params.slug);
      if (res) {
        setData(res.tintuc)
      }
    };
    fetchAPI();
  }, [params.slug])
  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <div className="detail">
            {data ? <img src={data.image} className="detail__image" alt="" /> : <></>}
            <h2>
              {data ? data.title : ""}
            </h2>
            {data? <div dangerouslySetInnerHTML={{ __html: data.content }} className="detail__content"></div> : <></>}
          </div>
        </Col>
      </Row>
    </>
  )
}
export default ChiTietTinTuc;