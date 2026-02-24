import { Link, NavLink, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getSetting } from "../../../services/client/setting.service";
import ButtonModal from "./buttonmodal";
import { useDispatch } from "react-redux";
import { deleteAllCookie, getCookie } from "../../../helpers/cookie";
import { RiArrowDropDownLine } from "react-icons/ri";
import { setLoginUser } from "../../../action/login";
import { HiUser } from "react-icons/hi2";
import { FaSignOutAlt } from "react-icons/fa";
function Header() {
  const dispatch = useDispatch();
  const [setting, setSeting] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getSetting();
      if (res) {
        setSeting(res.setting);
      }
    };
    fetchApi();
  }, []);

  const userName = getCookie("userName");

  const handelLogout = () => {
    deleteAllCookie();
    dispatch(setLoginUser(false));
    navigate("/");
  };

  const handleMenu = () => {
    const menu = document.querySelector(".tagInfo__menu");

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
      menu.classList.add("tagInfo__menushow")
    }
  };

  return (
    <>
      <div className="layout__header">
        <Row
          gutter={[0, 10]}
          align="center"
          className="layout__header--container container"
        >
          <Col span={6}>
            <div className="layout__header--logo">
              <NavLink to="/">
                {setting ? <img src={setting.logo} alt=""/> : <></>}
              </NavLink>
              <span>{setting ? setting.name : ""}</span>
            </div>
          </Col>
          <Col span={8}>
            <ul className="layout__header--menu">
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
              </li>
              <li>
                <NavLink to="/lien-he">Liên hệ</NavLink>
              </li>
            </ul>
          </Col>
          <Col span={10} className="nav-button-datlich">
            <ButtonModal />
            {userName ? (
              <div className="tagInfo" onClick={handleMenu}>
                <HiUser className="tagInfo__iconUser"/>
                {userName}
                <RiArrowDropDownLine className="tagInfo__icondrop"/>
                <ul className="tagInfo__menu">
                  <li className="tagInfo__menu--logout" onClick={handelLogout}>
                    Đăng xuất <FaSignOutAlt />
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/dang-nhap" className="modalkb__button-modal">
                Đăng nhập
              </Link>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Header;
