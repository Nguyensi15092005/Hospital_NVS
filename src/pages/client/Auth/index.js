import { useState } from "react";
import "./auth.css";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  LoginPost,
  Register,
  requesLoginGoogle,
} from "../../../services/client/auth.service";
import { notification } from "antd";
import { setCookie } from "../../../helpers/cookie";
import { setLoginUser } from "../../../action/login";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [messageNotifi, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const openNotification = (placement) => {
    messageNotifi.success({
      message: "Thành công",
      description:
        "Chúc mừng bạn đã đăng ký thành công",
      placement,
    });
  };

  const handleLoginGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      console.log(credential);
      const res = await requesLoginGoogle(credential);
      if (res.code === 200) {
        setCookie("tokenUser", res.user.token, 10);
        setCookie("userName", res.user.fullName, 10);
        dispatch(setLoginUser(true));
        navigate("/");
      }
    } catch (error) {
      console.log("lỗi login GG");
    }
  };

  const handelSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const option = {
        fullName: e.target.elements.fullName.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };
      const res = await Register(option);
      if (res.code === 200) {
        navigate('/dang-nhap')
        openNotification("top");
        setIsRegister(false);
      }
    } catch (error) {
      console.log("lỗi đăng ký");
    }
  };

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const option = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };
      const res = await LoginPost(option);
      if (res.code === 200) {
        setCookie("tokeUser", res.user.token, 10);
        setCookie("userName", res.user.fullName, 10);
        dispatch(setLoginUser(true));
      }
      console.log(e.target.elements.fullName.value);
    } catch (error) {}
  };

  return (
    <>
      {contextHolder}
      <div className="auth-page">
        <div className={`auth-container ${isRegister ? "active" : ""}`}>
          {/* Login */}
          <div className="form-box login">
            <form method="POST" onSubmit={handleSubmitLogin}>
              <h1>Đăng nhập</h1>

              <div className="input-box">
                <input type="text" name="email" placeholder="Email" required />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>

              <div className="forgot-link">
                <a href="/">Quên mật khâu?</a>
              </div>

              <button type="submit" className="btn">
                Đăng nhập
              </button>

              <p>Đăng nhập bằng nền tảng khác</p>

              <div className="social-icons">
                <GoogleLogin
                  onSuccess={handleLoginGoogleSuccess}
                  onError={() => {
                    console.log("Đăng nhập thất bại");
                  }}
                />
                {/* <a href="#">
                <i className="bx bxl-google"></i>
              </a>
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a> */}
              </div>
            </form>
          </div>

          {/* Register */}
          <div className="form-box register">
            <form method="post" onSubmit={handelSubmitRegister}>
              <h1>Đăng ký</h1>

              <div className="input-box">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Tên tài khoản"
                  required
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <input type="email" name="email" placeholder="Email" required />
                <i className="bx bxs-envelope"></i>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>

              <button type="submit" className="btn">
                Đăng ký
              </button>

              <p>Đăng ký bằng nền tảng khác</p>

              <div className="social-icons">
                <GoogleLogin
                  onSuccess={handleLoginGoogleSuccess}
                  onError={() => {
                    console.log("Đăng nhập thất bại");
                  }}
                />
              </div>
            </form>
          </div>

          {/* Toggle */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>CHÀO MỪNG BẠN</h1>
              <p>Bạn chưa có tài khoản</p>
              <button
                className="btn register-btn"
                type="button"
                onClick={() => setIsRegister(true)}
              >
                Đăng ký
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>MỪNG TRỞ LẠI</h1>
              <p>Bạn đã có tài khoản</p>
              <button
                className="btn login-btn"
                type="button"
                onClick={() => setIsRegister(false)}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
