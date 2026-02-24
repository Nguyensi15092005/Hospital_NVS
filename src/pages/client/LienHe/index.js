import { Button, Col, Form, Input, notification, Row } from "antd";
import "./lienhe.scss";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { postContact } from "../../../services/client/contact.service";
import { useEffect, useState } from "react";
import { getSetting } from "../../../services/client/setting.service";
const { TextArea } = Input;
function LienHe() {
  const [setting, setSeting] = useState();
  const [form] = Form.useForm();
  const [messageNotifi, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    messageNotifi.success({
      message: "Thành công",
      description: "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ tới.",
      placement,
    });
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getSetting();
      if (res) {
        setSeting(res.setting);
      }
    };
    fetchApi();
  }, [])

  const handleSubmit = async (value) => {
    const res = await postContact(value);
    if (res.code === 200) {
      form.resetFields();
      openNotification('top')
    }
  }
  return (
    <>
      {contextHolder}
      <div className="lienhe">
        <Row justify="center">
          <Col span={22} className="lienhe__address">
            <iframe
              src={setting ? setting.address_map : ""}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GG MAP"
            ></iframe>
            <ul className="context">
              <li>
                <h4>Bệnh viện {setting ? setting.name : ""}</h4>
              </li>
              <li>
                <MdOutlineEmail className="icon" />
                <span>{setting ? setting.mail_setting : ""}</span>
              </li>
              <li>
                <LuPhone className="icon" />
                <span>{setting ? setting.hotline : ""}</span>
              </li>
              <li>
                <LuMapPin className="icon" />
                <span>{setting ? setting.address : ""}</span>
              </li>
            </ul>
          </Col>
        </Row>
        <Row gutter={[20, 20]} justify="center">
          <Col span={24}>
            <div className="lienhe__title">Liên hệ đến chúng tôi</div>
            <div className="lienhe__not">
              <span></span>
            </div>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={13}>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              // style={{ maxWidth: 1000 }}
              onFinish={handleSubmit}
            >
              <Form.Item label="Họ và tên: " name="fullName" rules={[{ required: true, message: "Chưa nhập họ tên!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại: " name="phone" rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email: " name="email" >
                <Input />
              </Form.Item>
              <Form.Item label="Để lại lời nhắn: " name="note" rules={[{ required: true, message: "Chưa để lại lời nhắn!" }]}>
                <TextArea rows={8} />
              </Form.Item>
              <Form.Item label={null} className="bacsi__button">
                <Button type="primary" htmlType="submit" >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

      </div>
    </>
  )

}
export default LienHe;