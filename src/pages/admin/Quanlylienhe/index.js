import { Alert,  Card, Col, Row, Space, Table } from "antd";
import "./lienhe.scss"
import { useEffect, useState } from "react";
import SearchForm from "../../../helpers/search-form";
import { getListContact, patchStatus } from "../../../services/admin/contact.service";
import Detail from "./detail";
import XoaContact from "./delete";
import TraLoiLienHe from "./reply";


function QuanLyLienHe() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchAPI = async () => {
    const res = await getListContact();
    if (res) {
      setData(res.contact.reverse());
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleReload = () => {
    fetchAPI();
  };

  const handleChanStatus = async (id, status) => {
    const res = await patchStatus(id, status);
    if(res){
      fetchAPI();
      console.log(res);
    }
  } 


  const colums = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = "gold";
        if (record.status === true) {
          color = "lime";
        }
        return (
          <>
            <TraLoiLienHe record={record} color={color} handleChanStatus={handleChanStatus}/>
          </>
        )
      }
    },
    {
      title: "Hành động",
      key: "hanhdong",
      render: (_, record) => {
        return (
          <Space>
            <Detail record={record}/>
            <XoaContact record={record} onReload={handleReload} />

          </Space>
        )
      }
    }
  ];
  return (
    <>
      <Alert message="QUẢN LÝ LIÊN HỆ" type="info" className="contact__alert" />
      <Row>
        <Col span={24} className="contact__search">
          <SearchForm
            placeholder="Nhập mã bác sĩ..."
            url="lien-he"
            onSearchResult={(data) => { setData(data.contact) }}
          />
        </Col>
      </Row>
      <Card
        title="Danh sách liên hệ"
      >
        <Table
          rowKey="_id"
          columns={colums}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            total: data.length,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />

      </Card>
    </>
  )
}
export default QuanLyLienHe;