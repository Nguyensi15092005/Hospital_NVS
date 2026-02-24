import { useEffect, useState } from "react"
import { Col, Row } from "antd"
import { getAbout } from "../../services/client/about.service";
import "./about.scss";
function GioiThieu() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAbout();
      if (res) {
        setData(res.about);
      }
    };
    fetchApi();
  }, [])
  return (
    <>
      {data ?
        <>
          <Row gutter={[0, 20]}>
            <Col xl={24}>
              <img src={data.image} className="about__image" alt=""/>
            </Col>
          </Row>
          <Row justify="center" className="about__about-us">
            <Col xl={18}>
              <div className="about__title">
                Về chúng tôi
              </div>
              <div className="about__not">
                <span></span>
              </div>
              <div className="about__content">
                {data.about_us}
              </div>
            </Col>
          </Row>

          <Row justify="center" className="about__mission">
            <Col xl={20}>
              <div className="about__title">
                Tầm nhìn và sứ mệnh
              </div>
              <div className="about__not">
                <span></span>
              </div>
              <div className="about__content">
                {data.mission}
              </div>
            </Col>
          </Row>

          <Row justify="center" className="about__value" gutter={[20]}>
            <Col xl={14}>
              <div className="about__title">
                giá trị cốt lõi
              </div>
              <div className="about__not">
                <span></span>
              </div>
              <div className="about__content" dangerouslySetInnerHTML={{ __html: data.value }}>

              </div>
            </Col>
            <Col xl={8}>
              <div className="about__title">
                giá trị cốt lõi
              </div>
              <div className="about__not">
                <span></span>
              </div>
              <div className="about__content" dangerouslySetInnerHTML={{ __html: data.why_choose_us }}>

              </div>
            </Col>
          </Row>

          <Row justify="center" className="about__team" gutter={[20]}>
            <Col xl={22}>
              <div className="about__team-box">
                <img src={data.team.imageTeam} className="about__team--image" alt=""/>
                <div className="about__team--box">
                  <div className="about__team--box-title">đội ngũ chuyên gia</div>
                  <p className="about__team--des">
                    {data.team.description}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row justify="center" className="about__team" gutter={[20]}>
            <Col xl={22}>
              <div className="about__team-box">
                <img src={data.device.imageDevice} className="about__team--image" alt=""/>
                <div className="about__team--box">
                  <div className="about__team--box-title">Trang thiết bị</div>
                  <p className="about__team--des">
                    {data.device.description}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </>
        : <></>}
    </>
  )
};
export default GioiThieu