/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Select from "react-select";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import officeApi from "../../../api/officeApi";
import registerApi from "../../../api/registerApi";
import userApi from "../../../api/UserApi";

const OfficerTable = () => {
  const [officerList, setOfficerList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [officeListOpt, setOfficeListOpt] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  //
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [idcard, setIdcard] = useState("");
  const [office, setOffice] = useState("");
  //
  const [selectedUser, setSelectedUser] = useState();
  const loadOfficers = async () => {
    try {
      const params = {};
      const response = await userApi.getAll(params);
      setOfficerList(response.filter((e) => e.role.roleId === 6));
    } catch (err) {
      alert(err.message);
    }
  };
  const loadOffices = async () => {
    try {
      const params = {};
      const response = await officeApi.getAll(params);
      setOfficeList(response.filter((e) => e.isDelete === false));
      response
        .filter((e) => e.isDelete === false)
        .map((item) =>
          officeListOpt.push({ value: item.officeId, label: item.officeName })
        );
    } catch (err) {
      alert(err.message);
    }
  };
  const handleShowModel = (user_data) => {
    setShow(true);
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
  const handleOfficeChange = (e) => {
    setOffice(e);
  };
  const handleClose = () => {
    setShow(false);
    setEmail();
    setPassword();
    setPhone();
    setFullname();
    setAddress();
    setIdcard();
  };
  const handleClose2 = () => {
    setShow2(false);
    setSelectedUser();
    setPassword();
    setFullname();
    setAddress();
    setIdcard();
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
        officeId: office.value,
      };
      const params2 = {
        email: email,
        password: password,
        roleId: 6,
        phoneNumber: phone,
        username: fullname,
        address: address === undefined ? "" : address,
        officeId: office.value,
      };
      const response = await registerApi.createUser(
        idcard === undefined ? params2 : params
      );
      if (!JSON.stringify(response).includes("error")) {
        setShow(false);
        setEmail();
        setPassword();
        setPhone();
        setFullname();
        setAddress();
        setIdcard();
        toast.success("Tạo thành công");
        loadOfficers();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleUpdateOfficer = async () => {
    try {
      const params = {
        accountID: selectedUser.accountId,
        password: password,
        fullname: fullname,
        address: address,
        identityCard: idcard,
        officeId: office.value,
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
  useEffect(() => {
    loadOfficers();
    loadOffices();
  }, []);
  const columns = [
    {
      title: "Thứ tự",
      field: "accountId",
      width: "1%",
      filtering: false,
      render: (rowData) => {
        return <div>{rowData.tableData.id + 1}</div>;
      },
    },
    { title: "Email", field: "email", width: "10%", filtering: false },
    {
      title: "Số điện thoại",
      field: "phoneNumber",
      width: "10%",
      filtering: false,
    },
    {
      title: "Đơn vị",
      field: "officeId",
      width: "10%",
      render: (rowData) => {
        return (
          <div>
            {officeList.find((e) => {
              return e.officeId === rowData.officeId;
            })
              ? officeList.find((e) => {
                  return e.officeId === rowData.officeId;
                }).officeName
              : "Không có cơ quan"}
            {/* {rowData.officeId} */}
          </div>
        );
      },
    },
  ];
  return (
    <>
      {/* Tạo sỹ quan */}
      <Modal
        scrollable={true}
        show={show}
        onHide={handleClose}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo sỹ quan</Modal.Title>
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
                    <b style={{ color: "black" }}>
                      Email:<span className="text-danger">*</span>
                    </b>
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
                    <b style={{ color: "black" }}>
                      Mật khẩu:<span className="text-danger">*</span>
                    </b>
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
                    <b style={{ color: "black" }}>
                      Số điện thoại:<span className="text-danger">*</span>
                    </b>
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
                    <b style={{ color: "black" }}>
                      Tên sỹ quan:<span className="text-danger">*</span>
                    </b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="Tên sỹ quan"
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
                <Row className="mb-3">
                  <Col md="3">
                    <b style={{ color: "black" }}>
                      Cơ quan<span className="text-danger">*</span>
                    </b>
                  </Col>
                  <Col md="9" className="ml-auto">
                    <Select
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      className="mw-100"
                      name="officeId"
                      // isDisabled={categoryList.length === 0}
                      options={officeListOpt}
                      placeholder="Chọn cơ quan"
                      value={office}
                      onChange={(option) => handleOfficeChange(option)}
                    />
                  </Col>
                </Row>
              </>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => create_user()}
            disabled={
              !(
                email !== undefined &&
                password !== undefined &&
                phone !== undefined &&
                fullname !== undefined &&
                office.value !== undefined
              )
            }
          >
            Tạo sỹ quan
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Cập nhật sỹ quan */}
      <Modal
        scrollable={true}
        show={show2}
        onHide={handleClose2}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sỹ quan</Modal.Title>
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
                      <b style={{ color: "black" }}>
                        Số điện thoại:<span className="text-danger">*</span>
                      </b>
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
                      <b style={{ color: "black" }}>
                        Vai trò:<span className="text-danger">*</span>
                      </b>
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
                      <b style={{ color: "black" }}>
                        Tên sỹ quan:<span className="text-danger">*</span>
                      </b>
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
                  <Row className="mb-3">
                    <Col md="3">
                      <b style={{ color: "black" }}>
                        Cơ quan<span className="text-danger">*</span>
                      </b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      <Select
                        styles={{
                          // Fixes the overlapping problem of the component
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                          }),
                        }}
                        className="mw-100"
                        name="categoryId"
                        // isDisabled={categoryList.length === 0}
                        options={officeListOpt}
                        placeholder="Chọn cơ quan"
                        isDisabled={true}
                        value={office}
                        defaultValue={{
                          label: selectedUser.officeId
                            ? officeListOpt.filter(
                                (e) => e.value === selectedUser.officeId
                              )[0].label
                            : "Không có",
                          value: selectedUser.officeId
                            ? selectedUser.officeId
                            : "",
                        }}
                        onChange={(option) => handleOfficeChange(option)}
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
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={officerList}
          title="Danh sách sỹ quan"
          onRowClick={(event, rowData) => {
            handleShowModel2(rowData);
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Thêm mới",
              isFreeAction: true,
              onClick: () => handleShowModel(),
            },
            {
              icon: "edit",
              tooltip: "Sửa chi tiết",
              onClick: (event, rowData) => handleShowModel2(rowData),
            },
          ]}
          options={{
            // filtering: true,
            // grouping: true,
            pageSize: 10,
            actionsColumnIndex: -1,
            exportButton: true,
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
    </>
  );
};

export default OfficerTable;
