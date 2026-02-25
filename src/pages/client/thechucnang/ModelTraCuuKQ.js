import { Tag, Modal, Table } from "antd";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useEffect, useState, useCallback } from "react";
import { getCookie } from "../../../helpers/cookie";
import { Link } from "react-router-dom";
import { getLichKhamUse } from "../../../services/client/lichkham.service";
import ButtonModal from "../../../component/layout/layoutDefault/buttonmodal";
import { CheckCircleOutlined } from "@ant-design/icons";
import HuyLichKham from "./HuyLichKham";

function ModelTraCuuKQ(Props) {
  const { title, content } = Props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = getCookie("tokenUser");
  // API fetch dùng chung
  const fetchAPI = useCallback(async () => {
    if (!token) return;

    try {
      const res = await getLichKhamUse(token);

      if (res.code === 200) {
        setData([...res.lichkhamUser].reverse()); // tránh mutate array
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [token]);

  // gọi khi component mount hoặc token đổi
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  // reload dùng lại luôn
  const handleReload = fetchAPI;

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên người khám",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Bác sĩ",
      dataIndex: "bacsiName",
      key: "bacsiName",
      render: (_, record) => record.bacsiName || "(Tự sắp xếp)",
    },
    {
      title: "Ngày khám",
      dataIndex: "examination_date",
      key: "examination_date",
      render: (text) => {
        const d = new Date(text);
        return d.toLocaleString("vi-VN");
      },
    },
    {
      title: "Hành động",
      key: "hanhdong",
      render: (_, record) => {
        if (record.status) {
          return (
            <Tag key="success" color="success" icon={<CheckCircleOutlined />}>
              Đã xác nhận
            </Tag>
          );
        }
        return <HuyLichKham record={record} onReload={handleReload} />;
      },
    },
  ];

  return (
    <>
      <div className="main__box--item" onClick={showLoading}>
        <div className="item-icon">
          <RiCalendarScheduleFill />
        </div>
        <div className="item-content">
          <h4> {title} </h4>
          <p> {content}</p>
        </div>
      </div>

      <Modal
        className="modalkb"
        title={<h3 className="modalkb__title">Lịch sử lịch Khám</h3>}
        loading={loading}
        footer={null}
        open={open}
        width={800}
        onCancel={() => setOpen(false)}
      >
        {token ? (
          data.length > 0 ? (
            <Table rowKey="_id" columns={columns} dataSource={data} />
          ) : (
            <div>
              <p>Bạn chưa đặc lịch bên chúng tôi.</p>
              <ButtonModal />
            </div>
          )
        ) : (
          <div className="modalkb__outLogin">
            <p>Bạn chưa đăng nhập nên không thể xem lịch khám đã đặt</p>
            <Link to="/dang-nhap" className="modalkb__outLogin--button">
              Đăng nhập để xem
            </Link>
          </div>
        )}
      </Modal>
    </>
  );
}
export default ModelTraCuuKQ;
