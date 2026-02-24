import {Row, Col} from "antd";

function ListValueHos() {
  return (
    <div className="main__listhos">
      <div className="main__listhos--title">
        giá trị khác biệt của bệnh viện
      </div>
      <div className="main__listhos--not">
        <span></span>
      </div>
      <Row gutter={[10, 10]} className="main__listhos--box">
        <Col span={4} className="main__listhos--item">
          <img src="/images/listhost1.png" alt=""/>
          <p className="content">
            chuyên gia đầu ngành - bác sĩ giỏi - giàu kinh nghiệm
          </p>
        </Col>
        <Col span={4} className="main__listhos--item">
          <img src="/images/listhost2.png" alt=""/>
          <p className="content">
            Trang thiết bị hiện đại bật nhất
          </p>
        </Col>
        <Col span={4} className="main__listhos--item">
          <img src="/images/listhost3.png" alt=""/>
          <p className="content">
            hiệu quả điều trị cao thành tựu nổi bật
          </p>
        </Col>
        <Col span={4} className="main__listhos--item">
          <img src="/images/listhost4.png" alt=""/>
          <p className="content">
            quy trình toàn diện, khoa học, chuyên nghiệp
          </p>
        </Col>
        <Col span={4} className="main__listhos--item">
          <img src="/images/listhost5.png" alt=""/>
          <p className="content">
            dịch vụ cao cấp chi phí hợp lý
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default ListValueHos;