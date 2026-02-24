import { Button, Col, Form, message, Input, Row } from "antd";
import "./account.scss";
import { setLoginAdmin } from "../../../action/login";
import { postLogin } from "../../../services/admin/account.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../../services/admin/role.service";
import { setCookie } from "../../../helpers/cookie";

function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage()

  // console.log("chayj vao day");

  const handleFinish = async (value) => {
    const option = {
      name: value.name,
      email: value.email,
      password: value.password
    };
    const res = await postLogin(option);
    if (res.code === 200) {
      console.log("chayj vao day");
      setCookie("tokenAdmin", res.tokenAdmin, 1);
      setCookie("accountName", res.accountName, 1);
      dispatch(setLoginAdmin(true));
      const resPermission = await getRoleId(res.role_id);
      if(resPermission){
        localStorage.setItem("permission", JSON.stringify(resPermission.permission));
      }
      navigate("/admin");
    }
    else {
      messageApi.error(res.message);
    }
  }
  return (
    <div className="RootLoginAdmin">
      {contextHolder}
      <Row justify="center">
        <Col xl={10} lg={14} sm={20} xs={22} className="login">
          <Row justify="center">
            <Col xl={14} lg={18} sm={20} xs={21}>
              <div className="login__logo">
                <img src="/images/logo.jpg" alt=""/>
              </div>
              <h2 className="login__title">ĐĂNG NHẬP ADMIN</h2>
              <Form layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Bạn chưa nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Mật khẩu " name="password" rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item className="login__button">
                  <Button type="primary" className="login__button" htmlType="submit">Đăng nhập</Button>
                </Form.Item>

              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default LoginAdmin;