/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Chip } from "@mui/material";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import officeApi from "../../../api/officeApi";
import registerApi from "../../../api/registerApi";
import userApi from "../../../api/UserApi";
const OfficeTable = () => {
  const [officeList, setOfficeList] = useState([]);
  const [officerList, setOfficerList] = useState([]);
  const [selectedOfficerList, setSelectedOfficerList] = useState([]);
  const [temp, setTemp] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [idcard, setIdcard] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedOffice, setSelectedOffice] = useState();
  const [deletedOffice, setDeletedOffice] = useState("");
  //
  const [officeName, setOfficeName] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [officeDistrict, setOfficeDistrict] = useState("");
  const [officeLatitude, setOfficeLatitude] = useState();
  const [officeLongitude, setOfficeLongitude] = useState();
  const loadOffices = async () => {
    try {
      const params = {};
      const response = await officeApi.getAll(params);
      setOfficeList(response.filter((e) => e.isDelete === false));
    } catch (err) {
      alert(err.message);
    }
  };
  const loadOfficers = async () => {
    try {
      const params = {};
      const response = await userApi.getAll(params);
      setOfficerList(response.filter((e) => e.role.roleId === 6));
    } catch (err) {
      alert(err.message);
    }
  };
  const handleClose2 = () => {
    setShow2(false);
    setSelectedUser();
    setPassword();
    setFullname();
    setAddress();
    setIdcard();
  };
  const handleClose3 = () => {
    setShow3(false);
    setEmail();
    setPassword();
    setPhone();
    setFullname();
    setAddress();
    setIdcard();
  };
  const handleClose4 = () => {
    setShow4(false);
    setOfficeDistrict();
    setOfficeName();
    setOfficePhone();
    setOfficeLongitude();
    setOfficeLatitude();
  };
  const handleClose = () => {
    setShow(false);
    setOfficeDistrict();
    setOfficeName();
    setOfficePhone();
    setOfficeLongitude();
    setOfficeLatitude();
  };
  const handleClose5 = () => {
    setShow5(false);
  };
  const handleShowModel5 = (data) => {
    setShow5(true);
    setDeletedOffice(data.officeId);
  };
  const handleShowModel = (data) => {
    setShow(true);
    setSelectedOffice(data);
    setOfficeName(data.officeName);
    setOfficePhone(data.phoneNumber);
    setOfficeDistrict(data.district);
    setOfficeLatitude(data.latitude);
    setOfficeLongitude(data.longitude);
    setSelectedOfficerList(
      officerList.filter((e) => e.officeId === data.officeId)
    );
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handlefullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleIdcardChange = (e) => {
    setIdcard(e.target.value);
  };
  const handleOfficeNameChange = (e) => {
    setOfficeName(e.target.value);
  };
  const handleOfficeDistrictChange = (e) => {
    setOfficeDistrict(e.target.value);
  };
  const handleOfficePhoneChange = (e) => {
    setOfficePhone(e.target.value);
  };
  const handleOfficeLatitudeChange = (e) => {
    if (e.target.value > 90) {
      setOfficeLatitude(90);
    } else if (e.target.value < -90) {
      setOfficeLatitude(-90);
    } else {
      setOfficeLatitude(e.target.value);
    }
  };
  const handleOfficeLongitudeChange = (e) => {
    if (e.target.value > 180) {
      setOfficeLongitude(180);
    } else if (e.target.value < -180) {
      setOfficeLongitude(-180);
    } else {
      setOfficeLongitude(e.target.value);
    }
  };
  const columns = [
    {
      title: "Thứ tự",
      field: "accountId",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.tableData.id + 1}</div>;
      },
    },
    {
      title: "Tên",
      field: "officeName",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.officeName}</div>;
      },
    },
    {
      title: "Khu vực",
      field: "district",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.district}</div>;
      },
    },
    {
      title: "Điện thoại",
      field: "phoneNumber",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.phoneNumber}</div>;
      },
    },
    {
      title: "Người hỗ trợ khả dụng",
      field: "activeOfficer",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.activeOfficer}</div>;
      },
    },
    {
      title: "Tình trạng",
      field: "activeOfficer",
      width: "1%",
      render: (rowData) => {
        return (
          <>
            {rowData.isActive ? (
              <Chip
                key={rowData.isActive}
                label="Đang hoạt động"
                color="success"
              />
            ) : (
              <Chip
                key={rowData.isActive}
                label="Không hoạt động"
                color="error"
              />
            )}
          </>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: "Thứ tự",
      field: "accountId",
      width: "1%",
      render: (rowData) => {
        return <div>{rowData.tableData.id + 1}</div>;
      },
    },
    { title: "Email", field: "email", width: "10%" },
    { title: "Số điện thoại", field: "phoneNumber", width: "10%" },
    {
      title: "Vai trò",
      field: "role",
      width: "10%",
      render: (item) => {
        switch (item.role.roleName) {
          case "User":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="người hỗ trợ"
                  color="primary"
                />
              </div>
            );
          case "Staff":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="Nhân viên"
                  color="secondary"
                />
              </div>
            );
          case "Editor":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="Biên tập viên"
                  color="error"
                />
              </div>
            );
          case "Editor Manager":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="Quản lý biên tập viên"
                  color="info"
                />
              </div>
            );
          case "Admin":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="Quản trị viên"
                  color="warning"
                />
              </div>
            );
          case "Officer Manager":
            return (
              <div>
                <Chip
                  key={item.role.roleId}
                  label="Quản lý sĩ quan"
                  color="success"
                />
              </div>
            );
          case "Officer":
            return (
              <div>
                <Chip key={item.role.roleId} label="Sĩ quan" color="warning" />
              </div>
            );
          default:
            return (
              <td className="py-2">
                <span className="badge badge-light">Not found</span>
              </td>
            );
        }
      },
    },
  ];
  const handleShowModel3 = () => {
    setShow3(true);
    setEmail();
    setPassword();
    setPhone();
    setFullname();
    setAddress();
    setIdcard();
    try {
      loadOfficers();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleShowModel2 = (user_data) => {
    setSelectedUser(user_data);
    setPassword(user_data.password);
    setFullname(user_data.accountInfo.fullname);
    setAddress(user_data.accountInfo.address);
    setIdcard(user_data.accountInfo.identityCard);
    setShow2(true);
    try {
      loadOfficers();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleShowModel4 = () => {
    setOfficeDistrict();
    setOfficeLatitude();
    setOfficeLongitude();
    setOfficeName();
    setOfficePhone();
    setShow4(true);
  };
  const handleUpdateOfficer = async () => {
    try {
      const params = {
        accountID: selectedUser.accountId,
        password: password,
        fullname: fullname,
        address: address,
        identityCard: idcard,
        officeId: selectedOffice.officeId,
      };
      const response = await userApi.update(params);
      if (!JSON.stringify(response).includes("error")) {
        setShow(false);
        setSelectedUser();
        setPassword();
        setFullname();
        setAddress();
        setIdcard();
        toast.success(response.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const create_user = async () => {
    try {
      const params = {
        email: email,
        password: password,
        roleId: 6,
        phoneNumber: phone,
        username: fullname,
        address: address === undefined ? "" : address,
        identityCard: idcard,
        officeId: selectedOffice.officeId,
      };
      const params2 = {
        email: email,
        password: password,
        roleId: 6,
        phoneNumber: phone,
        username: fullname,
        address: address === undefined ? "" : address,
        officeId: selectedOffice.officeId,
      };
      const response = await registerApi.createUser(
        idcard === undefined ? params2 : params
      );
      if (!JSON.stringify(response).includes("error")) {
        setShow3(false);
        setEmail();
        setPassword();
        setPhone();
        setFullname();
        setAddress();
        setIdcard();
        toast.success("Tạo thành công");
        loadOfficers();
        setSelectedOfficerList(
          officerList.filter((e) => e.officeId === selectedOffice.officeId)
        );
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const createOffice = async () => {
    try {
      const params = {
        officeName: officeName,
        district: officeDistrict,
        latitude: officeLatitude,
        longitude: officeLongitude,
        phoneNumber: officePhone,
      };
      const response = await officeApi.create(params);
      if (!JSON.stringify(response).includes("error")) {
        setShow(false);
        setOfficeDistrict();
        setOfficeName();
        setOfficePhone();
        setOfficeLongitude();
        setOfficeLatitude();
        toast.success(response.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const updateOffice = async () => {
    try {
      const params = {
        officeId: selectedOffice.officeId,
        officeName: officeName,
        district: officeDistrict,
        latitude: officeLatitude,
        longitude: officeLongitude,
        phoneNumber: officePhone,
      };
      const response = await officeApi.update(params);
      if (!JSON.stringify(response).includes("error")) {
        setShow(false);
        setOfficeDistrict();
        setOfficeName();
        setOfficePhone();
        setOfficeLongitude();
        setOfficeLatitude();
        toast.success(response.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  async function deleteOffice(id) {
    try {
      const params = { id: id };
      const response = await officeApi.delete(params);
      if (!JSON.stringify(response).includes("error")) {
        setDeletedOffice("");
        toast.success(response.message);
        setShow5(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 5000);
  }, []);
  useEffect(() => {
    loadOfficers();
    loadOffices();
  }, [temp]);
  return (
    <div style={{ maxWidth: "100%" }}>
      {/* Cập nhật người hỗ trợ */}
      <Modal
        scrollable={true}
        show={show2}
        onHide={handleClose2}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết người hỗ trợ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">
            <Container fluid>
              {selectedUser && (
                <>
                  <Row className="mb-3">
                    <Col md="12">
                      <b style={{ color: "black", fontSize: "20px" }}>
                        Thông tin chung
                      </b>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Email:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={selectedUser.email}
                        disabled
                      />
                    </Col>
                  </Row>
                  {/* <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Mật khẩu:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => handlePasswordChange(e)}
                      />
                    </Col>
                  </Row> */}
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Số điện thoại:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={
                          selectedUser.phoneNumber
                            ? selectedUser.phoneNumber
                            : ""
                        }
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Vai trò:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={selectedUser.role.roleName}
                        disabled
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="12">
                      <b style={{ color: "black", fontSize: "20px" }}>
                        Thông tin chi tiết
                      </b>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Tên người hỗ trợ:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => handlefullnameChange(e)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>Địa chỉ:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address ? address : ""}
                        onChange={(e) => handleAddressChange(e)}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>CCCD:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="CCCD"
                        value={idcard ? idcard : ""}
                        onChange={(e) => handleIdcardChange(e)}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleUpdateOfficer()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Tạo người hỗ trợ */}
      <Modal
        scrollable={true}
        show={show3}
        onHide={handleClose3}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo người hỗ trợ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">
            <Container fluid>
              <>
                <Row className="mb-3">
                  <Col md="12">
                    <b style={{ color: "black", fontSize: "20px" }}>
                      Thông tin chung
                    </b>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>Email:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => handleEmailChange(e)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>Mật khẩu:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => handlePasswordChange(e)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>Số điện thoại:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="12">
                    <b style={{ color: "black", fontSize: "20px" }}>
                      Thông tin chi tiết
                    </b>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>Tên người hỗ trợ:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="Tên người hỗ trợ"
                      value={fullname}
                      onChange={(e) => handlefullnameChange(e)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>Địa chỉ:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Địa chỉ"
                      value={address ? address : ""}
                      onChange={(e) => handleAddressChange(e)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>CCCD:</b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="CCCD"
                      placeholder="Số định danh"
                      value={idcard}
                      onChange={(e) => handleIdcardChange(e)}
                    />
                  </Col>
                </Row>
              </>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => create_user()}>
            Tạo người hỗ trợ
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Thông tin trụ sở*/}
      <Modal
        scrollable={true}
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết trụ sở</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">
            <Container fluid>
              <Row>
                <Col md="6">
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Tên trụ sở: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Tên trụ sở"
                        value={officeName !== null && officeName}
                        onChange={(e) => handleOfficeNameChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Khu vực: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Khu vực"
                        value={officeDistrict !== null && officeDistrict}
                        onChange={(e) => handleOfficeDistrictChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Số điện thoại: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Số điện thoại"
                        value={officePhone !== null && officePhone}
                        onChange={(e) => handleOfficePhoneChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Vị trí:</b>
                    </Col>
                    <Col md="4">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Vĩ độ"
                        value={officeLatitude !== null && officeLatitude}
                        onChange={(e) => handleOfficeLatitudeChange(e)}
                      ></Input>
                    </Col>
                    <Col md="4">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Kinh độ"
                        value={officeLongitude !== null && officeLongitude}
                        onChange={(e) => handleOfficeLongitudeChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <MaterialTable
                      columns={columns2}
                      data={selectedOfficerList}
                      title="Danh sách người hỗ trợ"
                      onRowClick={(event, rowData) => {
                        handleShowModel2(rowData);
                      }}
                      actions={[
                        {
                          icon: "add",
                          tooltip: "Thêm người hỗ trợ",
                          isFreeAction: true,
                          onClick: () => handleShowModel3(),
                        },
                        {
                          icon: "edit",
                          tooltip: "Sửa chi tiết người hỗ trợ",
                          onClick: (event, rowData) =>
                            handleShowModel2(rowData),
                        },
                      ]}
                      options={{
                        pageSize: 5,
                        actionsColumnIndex: -1,
                        exportButton: true,
                        headerStyle: {
                          backgroundColor: "#1669f0",
                          color: "#FFF",
                        },
                        rowStyle: (rowData) => ({
                          // Check if read or not
                          backgroundColor:
                            rowData.tableData.id % 2 !== 0
                              ? "lightgray"
                              : "white",
                        }),
                      }}
                    />
                  </Row>
                </Col>
                <Col md="6" className="pt-2">
                  <iframe
                    className="w-100"
                    title="map"
                    src={
                      selectedOffice &&
                      "https://www.google.com/maps/embed/v1/place?key=AIzaSyABFQGws_pU_C0wDKZmk-_W1ZxY1fDS13E&q=" +
                        selectedOffice.latitude +
                        "," +
                        selectedOffice.longitude +
                        "&zoom=18&maptype=satellite"
                    }
                    height="700"
                    allowFullScreen={true}
                  ></iframe>
                </Col>
              </Row>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => updateOffice()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Tạo trụ sở */}
      <Modal
        scrollable={true}
        show={show4}
        onHide={handleClose4}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo trụ sở</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">
            <Container fluid>
              <Row>
                <Col md="12">
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Tên trụ sở: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Tên trụ sở"
                        onChange={(e) => handleOfficeNameChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Khu vực: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Khu vực"
                        onChange={(e) => handleOfficeDistrictChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Số điện thoại: </b>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Số điện thoại"
                        onChange={(e) => handleOfficePhoneChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md="3">
                      <b>Vị trí:</b>
                    </Col>
                    <Col md="4">
                      <Input
                        type="number"
                        name="type"
                        id="type"
                        max={90}
                        min={-90}
                        placeholder="Vĩ độ"
                        value={officeLatitude}
                        onChange={(e) => handleOfficeLatitudeChange(e)}
                      ></Input>
                    </Col>
                    <Col md="4">
                      <Input
                        type="number"
                        name="type"
                        id="type"
                        max={180}
                        min={-180}
                        placeholder="Kinh độ"
                        value={officeLongitude}
                        onChange={(e) => handleOfficeLongitudeChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                </Col>
                {officeLatitude !== "" && officeLongitude !== "" && (
                  <Col md="12" className="pt-2">
                    <iframe
                      className="w-100"
                      title="map"
                      src={
                        "https://www.google.com/maps/embed/v1/place?key=AIzaSyABFQGws_pU_C0wDKZmk-_W1ZxY1fDS13E&q=" +
                        officeLatitude +
                        "," +
                        officeLongitude +
                        "&zoom=18&maptype=satellite"
                      }
                      height="400"
                      allowFullScreen={true}
                    ></iframe>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Đóng
          </Button>
          {console.log(officeName)}
          <Button
            variant="primary"
            disabled={
              !(
                officeName !== undefined &&
                officePhone !== undefined &&
                officeDistrict !== undefined &&
                officeLatitude !== undefined &&
                officeLongitude !== undefined
              )
            }
            onClick={() => createOffice()}
          >
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
      {/* xóa */}
      <Modal
        scrollable={true}
        show={show5}
        onHide={handleClose5}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa trụ sở</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">Bạn chắc chắn muốn xóa?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => deleteOffice(deletedOffice)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <MaterialTable
        columns={columns}
        data={officeList}
        count
        title="Danh sách trụ sở"
        onRowClick={(event, rowData) => {
          handleShowModel(rowData);
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Tạo trụ sở",
            isFreeAction: true,
            onClick: () => handleShowModel4(),
          },
          {
            icon: "edit",
            tooltip: "Sửa chi tiết trụ sở",
            onClick: (event, rowData) => handleShowModel(rowData),
          },
          {
            icon: "delete",
            tooltip: "Xóa",
            onClick: (event, rowData) => handleShowModel5(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          pageSize: 10,
          headerStyle: {
            backgroundColor: "#1669f0",
            color: "#FFF",
          },
          rowStyle: (rowData) => ({
            // Check if read or not
            backgroundColor:
              rowData.tableData.id % 2 !== 0 ? "lightgray" : "white",
          }),
        }}
      />
    </div>
  );
};

export default OfficeTable;
